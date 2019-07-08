import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import { awsAccessKey, awsSecretAccessKey, bucket, awsEndpoint } from '../config';
import { PutObjectRequest } from 'aws-sdk/clients/s3';

const s3 = new AWS.S3({
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretAccessKey,
    endpoint: awsEndpoint
});

export function sendToS3(file: string, name: string) {
    const filestream = fs.createReadStream(file);
    const uploadParams: PutObjectRequest = {
        Bucket: bucket,
        Key: name,
        Body: filestream,
        ACL: 'public-read'
    };

    s3.upload(uploadParams, function (err: any, data: any) {
        if (err) {
            console.log("Error", err);
        } if (data) {
            console.log("Upload Success", data.Location);
        }
    });
}