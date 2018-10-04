export const typeDefs = /* GraphQL */ `type AggregateQuestion {
  count: Int!
}

type AggregateSession {
  count: Int!
}

type AggregateTag {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateUserTag {
  count: Int!
}

type BatchPayload {
  count: Long!
}

enum ChatType {
  AUDIO
  VIDEO
  TEXT
}

scalar Long

type Mutation {
  createQuestion(data: QuestionCreateInput!): Question!
  updateQuestion(data: QuestionUpdateInput!, where: QuestionWhereUniqueInput!): Question
  updateManyQuestions(data: QuestionUpdateInput!, where: QuestionWhereInput): BatchPayload!
  upsertQuestion(where: QuestionWhereUniqueInput!, create: QuestionCreateInput!, update: QuestionUpdateInput!): Question!
  deleteQuestion(where: QuestionWhereUniqueInput!): Question
  deleteManyQuestions(where: QuestionWhereInput): BatchPayload!
  createSession(data: SessionCreateInput!): Session!
  updateSession(data: SessionUpdateInput!, where: SessionWhereUniqueInput!): Session
  updateManySessions(data: SessionUpdateInput!, where: SessionWhereInput): BatchPayload!
  upsertSession(where: SessionWhereUniqueInput!, create: SessionCreateInput!, update: SessionUpdateInput!): Session!
  deleteSession(where: SessionWhereUniqueInput!): Session
  deleteManySessions(where: SessionWhereInput): BatchPayload!
  createTag(data: TagCreateInput!): Tag!
  updateTag(data: TagUpdateInput!, where: TagWhereUniqueInput!): Tag
  updateManyTags(data: TagUpdateInput!, where: TagWhereInput): BatchPayload!
  upsertTag(where: TagWhereUniqueInput!, create: TagCreateInput!, update: TagUpdateInput!): Tag!
  deleteTag(where: TagWhereUniqueInput!): Tag
  deleteManyTags(where: TagWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createUserTag(data: UserTagCreateInput!): UserTag!
  updateUserTag(data: UserTagUpdateInput!, where: UserTagWhereUniqueInput!): UserTag
  updateManyUserTags(data: UserTagUpdateInput!, where: UserTagWhereInput): BatchPayload!
  upsertUserTag(where: UserTagWhereUniqueInput!, create: UserTagCreateInput!, update: UserTagUpdateInput!): UserTag!
  deleteUserTag(where: UserTagWhereUniqueInput!): UserTag
  deleteManyUserTags(where: UserTagWhereInput): BatchPayload!
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

type Query {
  question(where: QuestionWhereUniqueInput!): Question
  questions(where: QuestionWhereInput, orderBy: QuestionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Question]!
  questionsConnection(where: QuestionWhereInput, orderBy: QuestionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): QuestionConnection!
  session(where: SessionWhereUniqueInput!): Session
  sessions(where: SessionWhereInput, orderBy: SessionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Session]!
  sessionsConnection(where: SessionWhereInput, orderBy: SessionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SessionConnection!
  tag(where: TagWhereUniqueInput!): Tag
  tags(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tag]!
  tagsConnection(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TagConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  userTag(where: UserTagWhereUniqueInput!): UserTag
  userTags(where: UserTagWhereInput, orderBy: UserTagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserTag]!
  userTagsConnection(where: UserTagWhereInput, orderBy: UserTagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserTagConnection!
  node(id: ID!): Node
}

type Question {
  id: ID!
  userId: String!
  tag: String!
  description: String!
  coins: Int
  active: Boolean
  chat: ChatType!
  title: String!
}

type QuestionConnection {
  pageInfo: PageInfo!
  edges: [QuestionEdge]!
  aggregate: AggregateQuestion!
}

input QuestionCreateInput {
  userId: String!
  tag: String!
  description: String!
  coins: Int
  active: Boolean
  chat: ChatType!
  title: String!
}

type QuestionEdge {
  node: Question!
  cursor: String!
}

enum QuestionOrderByInput {
  id_ASC
  id_DESC
  userId_ASC
  userId_DESC
  tag_ASC
  tag_DESC
  description_ASC
  description_DESC
  coins_ASC
  coins_DESC
  active_ASC
  active_DESC
  chat_ASC
  chat_DESC
  title_ASC
  title_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type QuestionPreviousValues {
  id: ID!
  userId: String!
  tag: String!
  description: String!
  coins: Int
  active: Boolean
  chat: ChatType!
  title: String!
}

type QuestionSubscriptionPayload {
  mutation: MutationType!
  node: Question
  updatedFields: [String!]
  previousValues: QuestionPreviousValues
}

input QuestionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: QuestionWhereInput
  AND: [QuestionSubscriptionWhereInput!]
  OR: [QuestionSubscriptionWhereInput!]
  NOT: [QuestionSubscriptionWhereInput!]
}

input QuestionUpdateInput {
  userId: String
  tag: String
  description: String
  coins: Int
  active: Boolean
  chat: ChatType
  title: String
}

input QuestionWhereInput {
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
  userId: String
  userId_not: String
  userId_in: [String!]
  userId_not_in: [String!]
  userId_lt: String
  userId_lte: String
  userId_gt: String
  userId_gte: String
  userId_contains: String
  userId_not_contains: String
  userId_starts_with: String
  userId_not_starts_with: String
  userId_ends_with: String
  userId_not_ends_with: String
  tag: String
  tag_not: String
  tag_in: [String!]
  tag_not_in: [String!]
  tag_lt: String
  tag_lte: String
  tag_gt: String
  tag_gte: String
  tag_contains: String
  tag_not_contains: String
  tag_starts_with: String
  tag_not_starts_with: String
  tag_ends_with: String
  tag_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  coins: Int
  coins_not: Int
  coins_in: [Int!]
  coins_not_in: [Int!]
  coins_lt: Int
  coins_lte: Int
  coins_gt: Int
  coins_gte: Int
  active: Boolean
  active_not: Boolean
  chat: ChatType
  chat_not: ChatType
  chat_in: [ChatType!]
  chat_not_in: [ChatType!]
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  AND: [QuestionWhereInput!]
  OR: [QuestionWhereInput!]
  NOT: [QuestionWhereInput!]
}

input QuestionWhereUniqueInput {
  id: ID
}

type Session {
  id: ID!
  type: String!
}

type SessionConnection {
  pageInfo: PageInfo!
  edges: [SessionEdge]!
  aggregate: AggregateSession!
}

input SessionCreateInput {
  type: String!
}

input SessionCreateManyInput {
  create: [SessionCreateInput!]
  connect: [SessionWhereUniqueInput!]
}

type SessionEdge {
  node: Session!
  cursor: String!
}

enum SessionOrderByInput {
  id_ASC
  id_DESC
  type_ASC
  type_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SessionPreviousValues {
  id: ID!
  type: String!
}

type SessionSubscriptionPayload {
  mutation: MutationType!
  node: Session
  updatedFields: [String!]
  previousValues: SessionPreviousValues
}

input SessionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SessionWhereInput
  AND: [SessionSubscriptionWhereInput!]
  OR: [SessionSubscriptionWhereInput!]
  NOT: [SessionSubscriptionWhereInput!]
}

input SessionUpdateDataInput {
  type: String
}

input SessionUpdateInput {
  type: String
}

input SessionUpdateManyInput {
  create: [SessionCreateInput!]
  delete: [SessionWhereUniqueInput!]
  connect: [SessionWhereUniqueInput!]
  disconnect: [SessionWhereUniqueInput!]
  update: [SessionUpdateWithWhereUniqueNestedInput!]
  upsert: [SessionUpsertWithWhereUniqueNestedInput!]
}

input SessionUpdateWithWhereUniqueNestedInput {
  where: SessionWhereUniqueInput!
  data: SessionUpdateDataInput!
}

input SessionUpsertWithWhereUniqueNestedInput {
  where: SessionWhereUniqueInput!
  update: SessionUpdateDataInput!
  create: SessionCreateInput!
}

input SessionWhereInput {
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
  type: String
  type_not: String
  type_in: [String!]
  type_not_in: [String!]
  type_lt: String
  type_lte: String
  type_gt: String
  type_gte: String
  type_contains: String
  type_not_contains: String
  type_starts_with: String
  type_not_starts_with: String
  type_ends_with: String
  type_not_ends_with: String
  AND: [SessionWhereInput!]
  OR: [SessionWhereInput!]
  NOT: [SessionWhereInput!]
}

input SessionWhereUniqueInput {
  id: ID
}

type Subscription {
  question(where: QuestionSubscriptionWhereInput): QuestionSubscriptionPayload
  session(where: SessionSubscriptionWhereInput): SessionSubscriptionPayload
  tag(where: TagSubscriptionWhereInput): TagSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  userTag(where: UserTagSubscriptionWhereInput): UserTagSubscriptionPayload
}

type Tag {
  id: ID!
  name: String!
}

type TagConnection {
  pageInfo: PageInfo!
  edges: [TagEdge]!
  aggregate: AggregateTag!
}

input TagCreateInput {
  name: String!
}

input TagCreateOneInput {
  create: TagCreateInput
  connect: TagWhereUniqueInput
}

type TagEdge {
  node: Tag!
  cursor: String!
}

enum TagOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TagPreviousValues {
  id: ID!
  name: String!
}

type TagSubscriptionPayload {
  mutation: MutationType!
  node: Tag
  updatedFields: [String!]
  previousValues: TagPreviousValues
}

input TagSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TagWhereInput
  AND: [TagSubscriptionWhereInput!]
  OR: [TagSubscriptionWhereInput!]
  NOT: [TagSubscriptionWhereInput!]
}

input TagUpdateDataInput {
  name: String
}

input TagUpdateInput {
  name: String
}

input TagUpdateOneRequiredInput {
  create: TagCreateInput
  update: TagUpdateDataInput
  upsert: TagUpsertNestedInput
  connect: TagWhereUniqueInput
}

input TagUpsertNestedInput {
  update: TagUpdateDataInput!
  create: TagCreateInput!
}

input TagWhereInput {
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
  AND: [TagWhereInput!]
  OR: [TagWhereInput!]
  NOT: [TagWhereInput!]
}

input TagWhereUniqueInput {
  id: ID
  name: String
}

type User {
  id: ID!
  username: String!
  email: String!
  uid: String
  tags(where: UserTagWhereInput, orderBy: UserTagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserTag!]
  description: String
  coins: Int
  sessions(where: SessionWhereInput, orderBy: SessionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Session!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  username: String!
  email: String!
  uid: String
  tags: UserTagCreateManyWithoutUserInput
  description: String
  coins: Int
  sessions: SessionCreateManyInput
}

input UserCreateOneWithoutTagsInput {
  create: UserCreateWithoutTagsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutTagsInput {
  username: String!
  email: String!
  uid: String
  description: String
  coins: Int
  sessions: SessionCreateManyInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  username_ASC
  username_DESC
  email_ASC
  email_DESC
  uid_ASC
  uid_DESC
  description_ASC
  description_DESC
  coins_ASC
  coins_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  username: String!
  email: String!
  uid: String
  description: String
  coins: Int
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

type UserTag {
  id: ID!
  user: User!
  tag: Tag!
}

type UserTagConnection {
  pageInfo: PageInfo!
  edges: [UserTagEdge]!
  aggregate: AggregateUserTag!
}

input UserTagCreateInput {
  user: UserCreateOneWithoutTagsInput!
  tag: TagCreateOneInput!
}

input UserTagCreateManyWithoutUserInput {
  create: [UserTagCreateWithoutUserInput!]
  connect: [UserTagWhereUniqueInput!]
}

input UserTagCreateWithoutUserInput {
  tag: TagCreateOneInput!
}

type UserTagEdge {
  node: UserTag!
  cursor: String!
}

enum UserTagOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserTagPreviousValues {
  id: ID!
}

type UserTagSubscriptionPayload {
  mutation: MutationType!
  node: UserTag
  updatedFields: [String!]
  previousValues: UserTagPreviousValues
}

input UserTagSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserTagWhereInput
  AND: [UserTagSubscriptionWhereInput!]
  OR: [UserTagSubscriptionWhereInput!]
  NOT: [UserTagSubscriptionWhereInput!]
}

input UserTagUpdateInput {
  user: UserUpdateOneRequiredWithoutTagsInput
  tag: TagUpdateOneRequiredInput
}

input UserTagUpdateManyWithoutUserInput {
  create: [UserTagCreateWithoutUserInput!]
  delete: [UserTagWhereUniqueInput!]
  connect: [UserTagWhereUniqueInput!]
  disconnect: [UserTagWhereUniqueInput!]
  update: [UserTagUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [UserTagUpsertWithWhereUniqueWithoutUserInput!]
}

input UserTagUpdateWithoutUserDataInput {
  tag: TagUpdateOneRequiredInput
}

input UserTagUpdateWithWhereUniqueWithoutUserInput {
  where: UserTagWhereUniqueInput!
  data: UserTagUpdateWithoutUserDataInput!
}

input UserTagUpsertWithWhereUniqueWithoutUserInput {
  where: UserTagWhereUniqueInput!
  update: UserTagUpdateWithoutUserDataInput!
  create: UserTagCreateWithoutUserInput!
}

input UserTagWhereInput {
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
  user: UserWhereInput
  tag: TagWhereInput
  AND: [UserTagWhereInput!]
  OR: [UserTagWhereInput!]
  NOT: [UserTagWhereInput!]
}

input UserTagWhereUniqueInput {
  id: ID
}

input UserUpdateInput {
  username: String
  email: String
  uid: String
  tags: UserTagUpdateManyWithoutUserInput
  description: String
  coins: Int
  sessions: SessionUpdateManyInput
}

input UserUpdateOneRequiredWithoutTagsInput {
  create: UserCreateWithoutTagsInput
  update: UserUpdateWithoutTagsDataInput
  upsert: UserUpsertWithoutTagsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutTagsDataInput {
  username: String
  email: String
  uid: String
  description: String
  coins: Int
  sessions: SessionUpdateManyInput
}

input UserUpsertWithoutTagsInput {
  update: UserUpdateWithoutTagsDataInput!
  create: UserCreateWithoutTagsInput!
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
  uid: String
  uid_not: String
  uid_in: [String!]
  uid_not_in: [String!]
  uid_lt: String
  uid_lte: String
  uid_gt: String
  uid_gte: String
  uid_contains: String
  uid_not_contains: String
  uid_starts_with: String
  uid_not_starts_with: String
  uid_ends_with: String
  uid_not_ends_with: String
  tags_every: UserTagWhereInput
  tags_some: UserTagWhereInput
  tags_none: UserTagWhereInput
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  coins: Int
  coins_not: Int
  coins_in: [Int!]
  coins_not_in: [Int!]
  coins_lt: Int
  coins_lte: Int
  coins_gt: Int
  coins_gte: Int
  sessions_every: SessionWhereInput
  sessions_some: SessionWhereInput
  sessions_none: SessionWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  username: String
}
`