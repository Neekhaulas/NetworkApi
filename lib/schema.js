"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const schema = apollo_server_express_1.gql `
    type User {
        id: ID!
        name: String!
        username: String!
        avatar: String
    }

    type AuthPayload {
        token: String
        user: User
    }

    type Post {
        id: ID
        content: String
        date: String
        user: User
        media: [Media]
    }

    type Media {
        id: ID
        uri: String
        type: MediaType
    }

    type MediaMeta {
        id: ID
    }

    type PostAnswer {
        post: Post 
    }

    enum MediaType {
        image
        video
        music
    }
    
    type Query {
        users: [User]
        posts: [Post]
        medias: [Media]
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!): AuthPayload!
        login(username: String!, password: String!): AuthPayload!
        uploadMedia(userId: ID!, uuid: String!, type: MediaType!): MediaMeta!
        post(content: String!, media: [ID]!): PostAnswer!
        setMediaUrl(mediaId: ID!, uri: String!): MediaMeta!
    }
`;
exports.default = schema;
//# sourceMappingURL=schema.js.map