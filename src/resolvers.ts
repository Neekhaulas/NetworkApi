import { IResolvers } from "graphql-tools";
import { Prisma, Maybe } from "./generated/prisma-client";

const resolversMap: IResolvers = {
    Query: {
        async users(_: any, args: void, ctx: any) {
            return ctx.prisma.users();
        },
        async posts(_: any, args: any, ctx: { prisma: Prisma, req: any }) {
            let userArgs: {
                first: number,
                orderBy: any,
                where?: Maybe<any>
            } = {
                first: Math.min(20, args.first ? args.first : 20),
                orderBy: 'createdAt_DESC',
            }
            if (args.user) userArgs.where = {
                user: {
                    id: args.user
                }
            };
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
            return ctx.prisma.posts(userArgs).$fragment(fragment);
        },
        async post(_: any, args: any, ctx: { prisma: Prisma, req: any }) {
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
            return ctx.prisma.post({
                id: args.id
            }).$fragment(fragment);
        },
        async user(_: void, args: any, ctx: any) {
            return ctx.prisma.user({ id: args.id });
        },
        async me(_: void, args: void, ctx: any) {
            if (ctx.req.session.user) {
                return ctx.prisma.user({ id: ctx.req.session.user });
            }
            return null;
        },
        async comments(_: void, args: any, ctx: { prisma: Prisma, req: any }) {
            let userArgs: {
                first: number,
                orderBy: any,
                where: Maybe<any>
            } = {
                first: Math.min(20, args.first ? args.first : 20),
                orderBy: 'createdAt_DESC',
                where: {
                    post: {
                        id: args.id
                    }
                }
            }
            const fragment = `
            fragment CommentWithUser on Comment {
                id
                content
                createdAt
                user {
                    id
                    username
                    avatar
                }
            }
            `;

            return ctx.prisma.comments(userArgs).$fragment(fragment);
        }
    },
    Mutation: {
        async login(_: any, args: any, ctx: any) {
            let user = await ctx.prisma.user({ username: args.username });
            if (user === null || user.password !== args.password) {
                return {
                    success: false
                };
            } else {
                ctx.req.session.user = user.id;
                return {
                    success: true
                };
            }
        },
        async logout(_: any, args: any, ctx: any) {
            delete ctx.req.session.user;
            return true;
        },
        async like(_: any, args: any, ctx: any) {
            if (!ctx.req.session.user) {
                throw new Error('Not authorized');
            }
            const exists: boolean = await ctx.prisma.$exists.like({
                post: {
                    id: args.post
                },
                user: {
                    id: ctx.req.session.user
                }
            });
            if (exists) return false;
            await ctx.prisma.createLike({
                post: {
                    connect: { id: args.post }
                },
                user: {
                    connect: { id: ctx.req.session.user }
                }
            });
            return true;
        },
        async follow(_: any, args: any, ctx: any) {
            if (!ctx.req.session.user) {
                throw new Error('Not authorized');
            }
            const exists: boolean = await ctx.prisma.$exists.follow({
                followed: {
                    id: args.user
                },
                follower: {
                    id: ctx.req.session.user
                }
            });
            if (exists) return false;
            await ctx.prisma.createFollow({
                followed: {
                    connect: { id: args.user }
                },
                follower: {
                    connect: { id: ctx.req.session.user }
                }
            });
            return true;
        },
        async signup(_: any, args: any, ctx: any) {
            let user = await ctx.prisma.createUser({
                email: args.email,
                username: args.username,
                password: args.password
            });
            ctx.req.session.user = user.id;
            return {
                success: true
            };
        },
        async post(_: any, args: any, ctx: { prisma: Prisma, req: any }) {
            if (!ctx.req.session.user) {
                throw new Error('Not authorized');
            }
            let post = await ctx.prisma.createPost({
                content: args.content,
                user: { connect: { id: ctx.req.session.user } },
                media: { connect: { id: args.media } }
            });
            return {
                post: post
            };
        },
        async addComment(_: any, args: any, ctx: { prisma: Prisma, req: any }) {
            if (!ctx.req.session.user) {
                throw new Error('Not authorized');
            }
            const fragment = `
            fragment CommentWithUser on Comment {
                id
                content
                createdAt
                user {
                    id
                    username
                    avatar
                }
            }
            `;
            let result = await ctx.prisma.createComment({
                content: args.content,
                user: { connect: { id: ctx.req.session.user } },
                post: { connect: { id: args.post } }
            }).$fragment(fragment);
            return result;
        }
    },
    Post: {
        async likes(parent: any, args: any, ctx: any) {
            const count: number = await ctx.prisma.likesConnection({
                where: {
                    post: { id: parent.id }
                }
            }).aggregate().count();
            return count;
        },
        async like(parent: any, args: any, ctx: any) {
            if (!ctx.req.session.user) {
                return false;
            }
            const exists: boolean = await ctx.prisma.$exists.like({
                post: {
                    id: parent.id
                },
                user: {
                    id: ctx.req.session.user
                }
            });
            return exists;
        },
        async comments(parent: any, args: any, ctx: any) {
            const count: number = await ctx.prisma.commentsConnection({
                where: {
                    post: { id: parent.id }
                }
            }).aggregate().count();
            return count;
        }
    },
    User: {
        async followers(parent: any, args: any, ctx: { prisma: Prisma, req: any }) {
            const count: number = await ctx.prisma.followsConnection({
                where: {
                    followed: { id: parent.id }
                }
            }).aggregate().count();
            return count;
        }
    }
};

export default resolversMap;