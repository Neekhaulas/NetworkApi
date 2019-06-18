import { gql } from "apollo-server-express";

const schema = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        avatar: String
    }

    type AuthPayload {
        success: Boolean!
    }

    type Post {
        id: ID
        content: String
        date: String
        user: User
        media: Media
        createdAt: String
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
        user(id: ID): User
        users(first: Int, skip: Int, after: String): [User]
        posts(first: Int, skip: Int, after: String): [Post]
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

export default schema;