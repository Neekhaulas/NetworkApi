import { IResolvers } from "graphql-tools";
import user from "./models/user";
import { UserWhereUniqueInput } from "./generated/prisma-client";
//import User from "./models/user";

const resolversMap : IResolvers = {
    Query: {
        async users(_: any, args: void, ctx: any) {
            return ctx.prisma.users();
        },
        async posts(_: any, args: any, ctx: any) {
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
        },
        async me(_: void, args: void, ctx: any) {
            if(ctx.req.session.user) {
                return ctx.prisma.user({ id: ctx.req.session.user});
            }
            return null;
        }
    },
    Mutation: {
        async login(_: any, args: any, ctx: any) {
            let user = await ctx.prisma.user({ username: args.username});
            if(user === null || user.password !== args.password) {
                return {
                    success: false
                };
            } else {
                ctx.req.session.user = user.id;
                return {
                    success: true
                };
            }
        }
    }
};

export default resolversMap;