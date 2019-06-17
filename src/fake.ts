import * as faker from "faker";
import { times, random } from "lodash";
import { prisma } from "./generated/prisma-client";

times(100, async (num: number) => {
    await prisma.createUser({
        name: faker.name.firstName(),
        password: faker.internet.password(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar()
    }).then((user) => {
        times(1, async (num: number) => {
            await prisma.createMedia({
                type: "Video",
                uri: "http://192.168.1.35:3000/ric.webm"
            }).then(async (media) => {
                await prisma.createPost({
                    content: faker.lorem.words(random(1, 5)),
                    media: {
                        connect: {
                            id: media.id
                        }
                    },
                    user: {
                        connect: {
                            id: user.id
                        }
                    }
                });
            });
        });
    });
})

/*times(100, async (num: number) => {
    await prisma.createPost({
        content: faker.lorem.words(random(1,5)),
        media: {
            connect: {
                id: media.id
            }
        },
        user: {
            connect: {
                id: users[random(0, users.length-1)].id
            }
        }
    })
});*/