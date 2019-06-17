import { IResolvers } from "graphql-tools";
import user from "./models/user";
//import User from "./models/user";

const resolversMap : IResolvers = {
    Query: {
        async users(_: void, args: void, ctx: any) {
            return ctx.prisma.users();
        },
        async posts(_: void, args: any, ctx: any) {
            args.first = Math.min(20, args.first?args.first:20);
            const fragment = `
            fragment PostWithUser on Post {
                id
                content
                createdAt
                updatedAt
                user {
                    id
                    username
                    avatar
                }
                media {
                    id
                    uri
                }
            }
            `;
            return ctx.prisma.posts(args).$fragment(fragment);
        },
        async user(_: void, args: any, ctx: any) {
            return ctx.prisma.user({ id: args.id});
        }
    }
};

export default resolversMap;