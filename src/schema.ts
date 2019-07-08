import { gql } from "apollo-server-express";

const schema = gql`
    type User {
        id: ID!
        name: String
        username: String!
        avatar: String
        followers: Int
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
        likes: Int
        like: Boolean
        comments: Int
    }
    
    type Comment {
        id: ID
        content: String
        post: Post
        author: User
        date: String
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
        me: User
        users(first: Int, skip: Int, after: String): [User]
        posts(user: ID, first: Int, skip: Int, after: String): [Post]
        post(id: ID): Post
        medias: [Media]
        comments(id: ID): [Comment]
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!): AuthPayload!
        login(username: String!, password: String!): AuthPayload!
        logout: Boolean!
        like(post: ID!): Boolean!
        uploadMedia(userId: ID!, uuid: String!, type: MediaType!): MediaMeta!
        post(content: String!, media: ID!): PostAnswer!
        setMediaUrl(mediaId: ID!, uri: String!): MediaMeta!
        follow(user: ID!): Boolean!
    }
`;

export default schema;