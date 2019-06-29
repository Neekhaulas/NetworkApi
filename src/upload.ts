import { Form } from "multiparty";
import { v1 } from "uuid";
import { request } from "graphql-request";
import * as ffmpeg from "fluent-ffmpeg";
import * as mkdirp from "mkdirp";
import * as fs from "fs";
import * as rimraf from "rimraf";
import { prisma, MediaCreateInput } from "./generated/prisma-client";
import { sendToS3 } from "./sendS3";

const endpoint = 'http://localhost:9090/';
const query = `
mutation Upload($userId: ID!, $uuid: String!, $type: MediaType!) {
  uploadMedia(userId: $userId, uuid: $uuid, type: $type) {
    id
  }
}`;

const endUpload = `
mutation FinishedUpload($mediaId: ID!, $uri: String!) {
  setMediaUrl(mediaId: $mediaId, uri: $uri) {
    id
  }
}
`;
const fileInputName = process.env.FILE_INPUT_NAME || "qqfile";
const maxFileSize = process.env.MAX_FILE_SIZE || 0; // in bytes, 0 for unlimited
const uploadedFilesPath = './upload';
const chunkDirName = "chunks";
const publicDir = './public';

export default function onUpload(req: any, res: any) {
    var form = new Form();

    form.parse(req, async function (err, fields, files) {
        switch (fields.method[0]) {
            case 'INIT':
                var uuid = v1();
                let newMedia = await prisma.createMedia({
                    owner: {
                        connect: { id: req.session.user }
                    },
                });
                res.set("Content-Type", "application/json");
                res.send({
                    "uuid": uuid,
                    "id": newMedia
                });
                break;
            case 'SEND':
                // text/plain is required to ensure support for IE9 and older
                res.set("Content-Type", "text/plain");
                onChunkedUpload(fields, files[fileInputName][0], res);
                break;
        }
    });
}

function onChunkedUpload(fields: any, file: any, res: any) {
    var size = parseInt(fields.qqtotalfilesize),
        uuid = fields.qquuid,
        index = fields.qqpartindex,
        totalParts = parseInt(fields.qqtotalparts),
        responseData = {
            error: '',
            success: false,
            mediaId: fields.mediaId
        };

    file.name = fields.qqfilename;

    if (isValid(size)) {
        storeChunk(file, uuid, index, totalParts, function () {
            if (index < totalParts - 1) {
                responseData.success = true;
                res.send(responseData);
            }
            else {
                combineChunks(file, uuid, async function (fileDestination: any, fileName: any) {
                    responseData.success = true;
                    res.send(responseData);
                    await prisma.updateMedia({
                        data: {
                            uri: uuid[0]
                        },
                        where: {
                            id: fields.mediaId[0]
                        }
                    });
                    var duration = new Date().getTime();
                    ffmpeg.ffprobe(fileDestination, function (err, metadata) {
                        var width = metadata.streams[0].width?metadata.streams[0].width:metadata.streams[1].width;
                        var height = metadata.streams[0].height?metadata.streams[0].height:metadata.streams[1].height;
                        ffmpeg(fileDestination)
                            .size('?x480')
                            .videoCodec('libx264')
                            .audioCodec('aac')
                            .videoBitrate('1000k')
                            .audioBitrate(128)
                            .fps(29.7)
                            .aspect(width / height)
                            .duration(30)
                            .output(fileDestination + '480p.mp4')
                            .on('end', (res) => {
                                console.log((new Date().getTime() - duration) / 1000);
                                sendToS3(fileDestination + '480p.mp4', fileName + '480p.mp4');
                            })
                            .run();
                    });
                },
                    function () {
                        responseData.error = "Problem conbining the chunks!";
                        res.send(responseData);
                    });
            }
        },
            function (reset: any) {
                responseData.error = "Problem storing the chunk!";
                res.send(responseData);
            });
    }
    else {
        failWithTooBigFile(responseData, res);
    }
}

function failWithTooBigFile(responseData: any, res: any) {
    responseData.error = "Too big!";
    responseData.preventRetry = true;
    res.send(responseData);
}

function isValid(size: any) {
    return maxFileSize === 0 || size < maxFileSize;
}

function moveFile(destinationDir: any, sourceFile: any, destinationFile: any, success: any, failure: any) {
    mkdirp(destinationDir, function (error: any) {
        let sourceStream: any;
        let destStream: any;

        if (error) {
            console.error("Problem creating directory " + destinationDir + ": " + error);
            failure();
        }
        else {
            sourceStream = fs.createReadStream(sourceFile);
            destStream = fs.createWriteStream(destinationFile);

            sourceStream
                .on("error", function (error: any) {
                    console.error("Problem copying file: " + error.stack);
                    destStream.end();
                    failure();
                })
                .on("end", function () {
                    destStream.end();
                    success();
                })
                .pipe(destStream);
        }
    });
}

function moveUploadedFile(file: any, uuid: any, success: any, failure: any) {
    var destinationDir = uploadedFilesPath + uuid + "/",
        fileDestination = destinationDir + file.name;

    moveFile(destinationDir, file.path, fileDestination, success, failure);
}

function storeChunk(file: any, uuid: any, index: any, numChunks: any, success: any, failure: any) {
    var destinationDir = uploadedFilesPath + uuid + "/" + chunkDirName + "/",
        chunkFilename = getChunkFilename(index, numChunks),
        fileDestination = destinationDir + chunkFilename;

    moveFile(destinationDir, file.path, fileDestination, success, failure);
}

function combineChunks(file: any, uuid: any, success: any, failure: any) {
    var chunksDir = uploadedFilesPath + uuid + "/" + chunkDirName + "/",
        destinationDir = uploadedFilesPath + uuid + "/",
        fileDestination = publicDir + "/" + uuid;


    fs.readdir(chunksDir, function (err, fileNames) {
        var destFileStream;

        if (err) {
            console.error("Problem listing chunks! " + err);
            failure();
        }
        else {
            fileNames.sort();
            destFileStream = fs.createWriteStream(fileDestination, { flags: "a" });

            appendToStream(destFileStream, chunksDir, fileNames, 0, function () {
                rimraf(destinationDir, function (rimrafError) {
                    if (rimrafError) {
                        console.log("Problem deleting chunks dir! " + rimrafError);
                    }
                });
                success(fileDestination, uuid);
            },
                failure);
        }
    });
}

function appendToStream(destStream: any, srcDir: any, srcFilesnames: any, index: any, success: any, failure: any) {
    if (index < srcFilesnames.length) {
        fs.createReadStream(srcDir + srcFilesnames[index])
            .on("end", function () {
                appendToStream(destStream, srcDir, srcFilesnames, index + 1, success, failure);
            })
            .on("error", function (error) {
                console.error("Problem appending chunk! " + error);
                destStream.end();
                failure();
            })
            .pipe(destStream, { end: false });
    }
    else {
        destStream.end();
        success();
    }
}

function getChunkFilename(index: any, count: any) {
    var digits = new String(count).length,
        zeros = new Array(digits + 1).join("0");

    return (zeros + index).slice(-digits);
}