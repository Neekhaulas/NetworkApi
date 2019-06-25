// Code generated by Prisma (prisma@1.34.0). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `type AggregateLike {
  count: Int!
}

type AggregateMedia {
  count: Int!
}

type AggregateMediaMeta {
  count: Int!
}

type AggregatePost {
  count: Int!
}

type AggregatePostAnswer {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

type Like {
  id: ID!
  post: Post!
  user: User!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type LikeConnection {
  pageInfo: PageInfo!
  edges: [LikeEdge]!
  aggregate: AggregateLike!
}

input LikeCreateInput {
  id: ID
  post: PostCreateOneInput!
  user: UserCreateOneInput!
}

type LikeEdge {
  node: Like!
  cursor: String!
}

enum LikeOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type LikePreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type LikeSubscriptionPayload {
  mutation: MutationType!
  node: Like
  updatedFields: [String!]
  previousValues: LikePreviousValues
}

input LikeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: LikeWhereInput
  AND: [LikeSubscriptionWhereInput!]
  OR: [LikeSubscriptionWhereInput!]
  NOT: [LikeSubscriptionWhereInput!]
}

input LikeUpdateInput {
  post: PostUpdateOneRequiredInput
  user: UserUpdateOneRequiredInput
}

input LikeWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  post: PostWhereInput
  user: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [LikeWhereInput!]
  OR: [LikeWhereInput!]
  NOT: [LikeWhereInput!]
}

input LikeWhereUniqueInput {
  id: ID
}

scalar Long

type Media {
  id: ID!
  uri: String
  owner: User!
  type: MediaType
}

type MediaConnection {
  pageInfo: PageInfo!
  edges: [MediaEdge]!
  aggregate: AggregateMedia!
}

input MediaCreateInput {
  id: ID
  uri: String
  owner: UserCreateOneInput!
  type: MediaType
}

input MediaCreateOneInput {
  create: MediaCreateInput
  connect: MediaWhereUniqueInput
}

type MediaEdge {
  node: Media!
  cursor: String!
}

type MediaMeta {
  id: ID!
}

type MediaMetaConnection {
  pageInfo: PageInfo!
  edges: [MediaMetaEdge]!
  aggregate: AggregateMediaMeta!
}

input MediaMetaCreateInput {
  id: ID
}

type MediaMetaEdge {
  node: MediaMeta!
  cursor: String!
}

enum MediaMetaOrderByInput {
  id_ASC
  id_DESC
}

type MediaMetaPreviousValues {
  id: ID!
}

type MediaMetaSubscriptionPayload {
  mutation: MutationType!
  node: MediaMeta
  updatedFields: [String!]
  previousValues: MediaMetaPreviousValues
}

input MediaMetaSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: MediaMetaWhereInput
  AND: [MediaMetaSubscriptionWhereInput!]
  OR: [MediaMetaSubscriptionWhereInput!]
  NOT: [MediaMetaSubscriptionWhereInput!]
}

input MediaMetaWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  AND: [MediaMetaWhereInput!]
  OR: [MediaMetaWhereInput!]
  NOT: [MediaMetaWhereInput!]
}

input MediaMetaWhereUniqueInput {
  id: ID
}

enum MediaOrderByInput {
  id_ASC
  id_DESC
  uri_ASC
  uri_DESC
  type_ASC
  type_DESC
}

type MediaPreviousValues {
  id: ID!
  uri: String
  type: MediaType
}

type MediaSubscriptionPayload {
  mutation: MutationType!
  node: Media
  updatedFields: [String!]
  previousValues: MediaPreviousValues
}

input MediaSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: MediaWhereInput
  AND: [MediaSubscriptionWhereInput!]
  OR: [MediaSubscriptionWhereInput!]
  NOT: [MediaSubscriptionWhereInput!]
}

enum MediaType {
  Image
  Video
  Music
}

input MediaUpdateDataInput {
  uri: String
  owner: UserUpdateOneRequiredInput
  type: MediaType
}

input MediaUpdateInput {
  uri: String
  owner: UserUpdateOneRequiredInput
  type: MediaType
}

input MediaUpdateManyMutationInput {
  uri: String
  type: MediaType
}

input MediaUpdateOneRequiredInput {
  create: MediaCreateInput
  update: MediaUpdateDataInput
  upsert: MediaUpsertNestedInput
  connect: MediaWhereUniqueInput
}

input MediaUpsertNestedInput {
  update: MediaUpdateDataInput!
  create: MediaCreateInput!
}

input MediaWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  uri: String
  uri_not: String
  uri_in: [String!]
  uri_not_in: [String!]
  uri_lt: String
  uri_lte: String
  uri_gt: String
  uri_gte: String
  uri_contains: String
  uri_not_contains: String
  uri_starts_with: String
  uri_not_starts_with: String
  uri_ends_with: String
  uri_not_ends_with: String
  owner: UserWhereInput
  type: MediaType
  type_not: MediaType
  type_in: [MediaType!]
  type_not_in: [MediaType!]
  AND: [MediaWhereInput!]
  OR: [MediaWhereInput!]
  NOT: [MediaWhereInput!]
}

input MediaWhereUniqueInput {
  id: ID
}

type Mutation {
  createLike(data: LikeCreateInput!): Like!
  updateLike(data: LikeUpdateInput!, where: LikeWhereUniqueInput!): Like
  upsertLike(where: LikeWhereUniqueInput!, create: LikeCreateInput!, update: LikeUpdateInput!): Like!
  deleteLike(where: LikeWhereUniqueInput!): Like
  deleteManyLikes(where: LikeWhereInput): BatchPayload!
  createMedia(data: MediaCreateInput!): Media!
  updateMedia(data: MediaUpdateInput!, where: MediaWhereUniqueInput!): Media
  updateManyMedias(data: MediaUpdateManyMutationInput!, where: MediaWhereInput): BatchPayload!
  upsertMedia(where: MediaWhereUniqueInput!, create: MediaCreateInput!, update: MediaUpdateInput!): Media!
  deleteMedia(where: MediaWhereUniqueInput!): Media
  deleteManyMedias(where: MediaWhereInput): BatchPayload!
  createMediaMeta(data: MediaMetaCreateInput!): MediaMeta!
  deleteMediaMeta(where: MediaMetaWhereUniqueInput!): MediaMeta
  deleteManyMediaMetas(where: MediaMetaWhereInput): BatchPayload!
  createPost(data: PostCreateInput!): Post!
  updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
  updateManyPosts(data: PostUpdateManyMutationInput!, where: PostWhereInput): BatchPayload!
  upsertPost(where: PostWhereUniqueInput!, create: PostCreateInput!, update: PostUpdateInput!): Post!
  deletePost(where: PostWhereUniqueInput!): Post
  deleteManyPosts(where: PostWhereInput): BatchPayload!
  createPostAnswer(data: PostAnswerCreateInput!): PostAnswer!
  updatePostAnswer(data: PostAnswerUpdateInput!, where: PostAnswerWhereUniqueInput!): PostAnswer
  upsertPostAnswer(where: PostAnswerWhereUniqueInput!, create: PostAnswerCreateInput!, update: PostAnswerUpdateInput!): PostAnswer!
  deletePostAnswer(where: PostAnswerWhereUniqueInput!): PostAnswer
  deleteManyPostAnswers(where: PostAnswerWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Post {
  id: ID!
  content: String
  createdAt: DateTime!
  updatedAt: DateTime!
  user: User!
  media: Media!
}

type PostAnswer {
  id: ID!
  post: Post
}

type PostAnswerConnection {
  pageInfo: PageInfo!
  edges: [PostAnswerEdge]!
  aggregate: AggregatePostAnswer!
}

input PostAnswerCreateInput {
  id: ID
  post: PostCreateOneInput
}

type PostAnswerEdge {
  node: PostAnswer!
  cursor: String!
}

enum PostAnswerOrderByInput {
  id_ASC
  id_DESC
}

type PostAnswerPreviousValues {
  id: ID!
}

type PostAnswerSubscriptionPayload {
  mutation: MutationType!
  node: PostAnswer
  updatedFields: [String!]
  previousValues: PostAnswerPreviousValues
}

input PostAnswerSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PostAnswerWhereInput
  AND: [PostAnswerSubscriptionWhereInput!]
  OR: [PostAnswerSubscriptionWhereInput!]
  NOT: [PostAnswerSubscriptionWhereInput!]
}

input PostAnswerUpdateInput {
  post: PostUpdateOneInput
}

input PostAnswerWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  post: PostWhereInput
  AND: [PostAnswerWhereInput!]
  OR: [PostAnswerWhereInput!]
  NOT: [PostAnswerWhereInput!]
}

input PostAnswerWhereUniqueInput {
  id: ID
}

type PostConnection {
  pageInfo: PageInfo!
  edges: [PostEdge]!
  aggregate: AggregatePost!
}

input PostCreateInput {
  id: ID
  content: String
  user: UserCreateOneInput!
  media: MediaCreateOneInput!
}

input PostCreateOneInput {
  create: PostCreateInput
  connect: PostWhereUniqueInput
}

type PostEdge {
  node: Post!
  cursor: String!
}

enum PostOrderByInput {
  id_ASC
  id_DESC
  content_ASC
  content_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PostPreviousValues {
  id: ID!
  content: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
  updatedFields: [String!]
  previousValues: PostPreviousValues
}

input PostSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PostWhereInput
  AND: [PostSubscriptionWhereInput!]
  OR: [PostSubscriptionWhereInput!]
  NOT: [PostSubscriptionWhereInput!]
}

input PostUpdateDataInput {
  content: String
  user: UserUpdateOneRequiredInput
  media: MediaUpdateOneRequiredInput
}

input PostUpdateInput {
  content: String
  user: UserUpdateOneRequiredInput
  media: MediaUpdateOneRequiredInput
}

input PostUpdateManyMutationInput {
  content: String
}

input PostUpdateOneInput {
  create: PostCreateInput
  update: PostUpdateDataInput
  upsert: PostUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: PostWhereUniqueInput
}

input PostUpdateOneRequiredInput {
  create: PostCreateInput
  update: PostUpdateDataInput
  upsert: PostUpsertNestedInput
  connect: PostWhereUniqueInput
}

input PostUpsertNestedInput {
  update: PostUpdateDataInput!
  create: PostCreateInput!
}

input PostWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  user: UserWhereInput
  media: MediaWhereInput
  AND: [PostWhereInput!]
  OR: [PostWhereInput!]
  NOT: [PostWhereInput!]
}

input PostWhereUniqueInput {
  id: ID
}

type Query {
  like(where: LikeWhereUniqueInput!): Like
  likes(where: LikeWhereInput, orderBy: LikeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Like]!
  likesConnection(where: LikeWhereInput, orderBy: LikeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): LikeConnection!
  media(where: MediaWhereUniqueInput!): Media
  medias(where: MediaWhereInput, orderBy: MediaOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Media]!
  mediasConnection(where: MediaWhereInput, orderBy: MediaOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MediaConnection!
  mediaMeta(where: MediaMetaWhereUniqueInput!): MediaMeta
  mediaMetas(where: MediaMetaWhereInput, orderBy: MediaMetaOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [MediaMeta]!
  mediaMetasConnection(where: MediaMetaWhereInput, orderBy: MediaMetaOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MediaMetaConnection!
  post(where: PostWhereUniqueInput!): Post
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post]!
  postsConnection(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostConnection!
  postAnswer(where: PostAnswerWhereUniqueInput!): PostAnswer
  postAnswers(where: PostAnswerWhereInput, orderBy: PostAnswerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PostAnswer]!
  postAnswersConnection(where: PostAnswerWhereInput, orderBy: PostAnswerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostAnswerConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  like(where: LikeSubscriptionWhereInput): LikeSubscriptionPayload
  media(where: MediaSubscriptionWhereInput): MediaSubscriptionPayload
  mediaMeta(where: MediaMetaSubscriptionWhereInput): MediaMetaSubscriptionPayload
  post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
  postAnswer(where: PostAnswerSubscriptionWhereInput): PostAnswerSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  email: String
  name: String
  username: String!
  avatar: String
  password: String!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  email: String
  name: String
  username: String!
  avatar: String
  password: String!
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  name_ASC
  name_DESC
  username_ASC
  username_DESC
  avatar_ASC
  avatar_DESC
  password_ASC
  password_DESC
}

type UserPreviousValues {
  id: ID!
  email: String
  name: String
  username: String!
  avatar: String
  password: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  email: String
  name: String
  username: String
  avatar: String
  password: String
}

input UserUpdateInput {
  email: String
  name: String
  username: String
  avatar: String
  password: String
}

input UserUpdateManyMutationInput {
  email: String
  name: String
  username: String
  avatar: String
  password: String
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  avatar: String
  avatar_not: String
  avatar_in: [String!]
  avatar_not_in: [String!]
  avatar_lt: String
  avatar_lte: String
  avatar_gt: String
  avatar_gte: String
  avatar_contains: String
  avatar_not_contains: String
  avatar_starts_with: String
  avatar_not_starts_with: String
  avatar_ends_with: String
  avatar_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  username: String
}
`