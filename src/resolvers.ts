import { IResolvers } from "graphql-tools";

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
        },
        async logout(_: any, args: any, ctx: any) {
            delete ctx.req.session.user;
            return true;
        },
        async like(_: any, args: any, ctx: any) {
            if(!ctx.req.session.user) {
                throw new Error('Not authorized');
            }
            const exists : boolean = await ctx.prisma.$exists.like({
                post: {
                    id: args.post
                },
                user: {
                    id: ctx.req.session.user
                }
            });
            if(exists) return false; 
            await ctx.prisma.createLike({
                post: {
                    connect: { id: args.post }
                },
                user: {
                    connect: { id: ctx.req.session.user}
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
        }
    },
    Post: {
        async likes(parent: any, args: any, ctx: any) {
            const count : number = await ctx.prisma.likesConnection({
                where: {
                    post: { id: parent.id }
                }
            }).aggregate().count();
            return count;
        },
        async like(parent: any, args: any, ctx: any) {
            if(!ctx.req.session.user) {
                return false;
            }
            const exists : boolean = await ctx.prisma.$exists.like({
                post: {
                    id: parent.id
                },
                user: {
                    id: ctx.req.session.user
                }
            });
            console.log(exists);
            return exists;
        }
    }
};

export default resolversMap;