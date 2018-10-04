import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    users: <T = User[]>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    userTags: <T = UserTag[]>(args: { where?: UserTagWhereInput, orderBy?: UserTagOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    questions: <T = Question[]>(args: { where?: QuestionWhereInput, orderBy?: QuestionOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    tags: <T = Tag[]>(args: { where?: TagWhereInput, orderBy?: TagOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    sessions: <T = Session[]>(args: { where?: SessionWhereInput, orderBy?: SessionOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    user: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    userTag: <T = UserTag | null>(args: { where: UserTagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    question: <T = Question | null>(args: { where: QuestionWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    tag: <T = Tag | null>(args: { where: TagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    session: <T = Session | null>(args: { where: SessionWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    usersConnection: <T = UserConnection>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    userTagsConnection: <T = UserTagConnection>(args: { where?: UserTagWhereInput, orderBy?: UserTagOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    questionsConnection: <T = QuestionConnection>(args: { where?: QuestionWhereInput, orderBy?: QuestionOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    tagsConnection: <T = TagConnection>(args: { where?: TagWhereInput, orderBy?: TagOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    sessionsConnection: <T = SessionConnection>(args: { where?: SessionWhereInput, orderBy?: SessionOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {
    createUser: <T = User>(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createUserTag: <T = UserTag>(args: { data: UserTagCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createQuestion: <T = Question>(args: { data: QuestionCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createTag: <T = Tag>(args: { data: TagCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createSession: <T = Session>(args: { data: SessionCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateUser: <T = User | null>(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateUserTag: <T = UserTag | null>(args: { data: UserTagUpdateInput, where: UserTagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateQuestion: <T = Question | null>(args: { data: QuestionUpdateInput, where: QuestionWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateTag: <T = Tag | null>(args: { data: TagUpdateInput, where: TagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateSession: <T = Session | null>(args: { data: SessionUpdateInput, where: SessionWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteUser: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteUserTag: <T = UserTag | null>(args: { where: UserTagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteQuestion: <T = Question | null>(args: { where: QuestionWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteTag: <T = Tag | null>(args: { where: TagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteSession: <T = Session | null>(args: { where: SessionWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertUser: <T = User>(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertUserTag: <T = UserTag>(args: { where: UserTagWhereUniqueInput, create: UserTagCreateInput, update: UserTagUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertQuestion: <T = Question>(args: { where: QuestionWhereUniqueInput, create: QuestionCreateInput, update: QuestionUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertTag: <T = Tag>(args: { where: TagWhereUniqueInput, create: TagCreateInput, update: TagUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertSession: <T = Session>(args: { where: SessionWhereUniqueInput, create: SessionCreateInput, update: SessionUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyUsers: <T = BatchPayload>(args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyUserTags: <T = BatchPayload>(args: { data: UserTagUpdateInput, where?: UserTagWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyQuestions: <T = BatchPayload>(args: { data: QuestionUpdateInput, where?: QuestionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyTags: <T = BatchPayload>(args: { data: TagUpdateInput, where?: TagWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManySessions: <T = BatchPayload>(args: { data: SessionUpdateInput, where?: SessionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyUsers: <T = BatchPayload>(args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyUserTags: <T = BatchPayload>(args: { where?: UserTagWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyQuestions: <T = BatchPayload>(args: { where?: QuestionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyTags: <T = BatchPayload>(args: { where?: TagWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManySessions: <T = BatchPayload>(args: { where?: SessionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {
    user: <T = UserSubscriptionPayload | null>(args: { where?: UserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    userTag: <T = UserTagSubscriptionPayload | null>(args: { where?: UserTagSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    question: <T = QuestionSubscriptionPayload | null>(args: { where?: QuestionSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    tag: <T = TagSubscriptionPayload | null>(args: { where?: TagSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    session: <T = SessionSubscriptionPayload | null>(args: { where?: SessionSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  User: (where?: UserWhereInput) => Promise<boolean>
  UserTag: (where?: UserTagWhereInput) => Promise<boolean>
  Question: (where?: QuestionWhereInput) => Promise<boolean>
  Tag: (where?: TagWhereInput) => Promise<boolean>
  Session: (where?: SessionWhereInput) => Promise<boolean>
}

export interface Prisma {
  query: Query
  mutation: Mutation
  subscription: Subscription
  exists: Exists
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
delegateSubscription(fieldName: string, args?: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(options: BasePrismaOptions): T
}
/**
 * Type Defs
*/

const typeDefs = `type AggregateQuestion {
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
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

enum ChatType {
  AUDIO
  VIDEO
  TEXT
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createUser(data: UserCreateInput!): User!
  createUserTag(data: UserTagCreateInput!): UserTag!
  createQuestion(data: QuestionCreateInput!): Question!
  createTag(data: TagCreateInput!): Tag!
  createSession(data: SessionCreateInput!): Session!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateUserTag(data: UserTagUpdateInput!, where: UserTagWhereUniqueInput!): UserTag
  updateQuestion(data: QuestionUpdateInput!, where: QuestionWhereUniqueInput!): Question
  updateTag(data: TagUpdateInput!, where: TagWhereUniqueInput!): Tag
  updateSession(data: SessionUpdateInput!, where: SessionWhereUniqueInput!): Session
  deleteUser(where: UserWhereUniqueInput!): User
  deleteUserTag(where: UserTagWhereUniqueInput!): UserTag
  deleteQuestion(where: QuestionWhereUniqueInput!): Question
  deleteTag(where: TagWhereUniqueInput!): Tag
  deleteSession(where: SessionWhereUniqueInput!): Session
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertUserTag(where: UserTagWhereUniqueInput!, create: UserTagCreateInput!, update: UserTagUpdateInput!): UserTag!
  upsertQuestion(where: QuestionWhereUniqueInput!, create: QuestionCreateInput!, update: QuestionUpdateInput!): Question!
  upsertTag(where: TagWhereUniqueInput!, create: TagCreateInput!, update: TagUpdateInput!): Tag!
  upsertSession(where: SessionWhereUniqueInput!, create: SessionCreateInput!, update: SessionUpdateInput!): Session!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyUserTags(data: UserTagUpdateInput!, where: UserTagWhereInput): BatchPayload!
  updateManyQuestions(data: QuestionUpdateInput!, where: QuestionWhereInput): BatchPayload!
  updateManyTags(data: TagUpdateInput!, where: TagWhereInput): BatchPayload!
  updateManySessions(data: SessionUpdateInput!, where: SessionWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyUserTags(where: UserTagWhereInput): BatchPayload!
  deleteManyQuestions(where: QuestionWhereInput): BatchPayload!
  deleteManyTags(where: TagWhereInput): BatchPayload!
  deleteManySessions(where: SessionWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Query {
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  userTags(where: UserTagWhereInput, orderBy: UserTagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserTag]!
  questions(where: QuestionWhereInput, orderBy: QuestionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Question]!
  tags(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tag]!
  sessions(where: SessionWhereInput, orderBy: SessionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Session]!
  user(where: UserWhereUniqueInput!): User
  userTag(where: UserTagWhereUniqueInput!): UserTag
  question(where: QuestionWhereUniqueInput!): Question
  tag(where: TagWhereUniqueInput!): Tag
  session(where: SessionWhereUniqueInput!): Session
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  userTagsConnection(where: UserTagWhereInput, orderBy: UserTagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserTagConnection!
  questionsConnection(where: QuestionWhereInput, orderBy: QuestionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): QuestionConnection!
  tagsConnection(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TagConnection!
  sessionsConnection(where: SessionWhereInput, orderBy: SessionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SessionConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Question implements Node {
  id: ID!
  userId: String!
  tag: String!
  description: String!
  coins: Int
  active: Boolean
  chat: ChatType!
  title: String!
}

"""A connection to a list of items."""
type QuestionConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
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

"""An edge in a connection."""
type QuestionEdge {
  """The item at the end of the edge."""
  node: Question!

  """A cursor for use in pagination."""
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
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
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
  """Logical AND on all given filters."""
  AND: [QuestionSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [QuestionSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [QuestionSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: QuestionWhereInput
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
  """Logical AND on all given filters."""
  AND: [QuestionWhereInput!]

  """Logical OR on all given filters."""
  OR: [QuestionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [QuestionWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  userId: String

  """All values that are not equal to given value."""
  userId_not: String

  """All values that are contained in given list."""
  userId_in: [String!]

  """All values that are not contained in given list."""
  userId_not_in: [String!]

  """All values less than the given value."""
  userId_lt: String

  """All values less than or equal the given value."""
  userId_lte: String

  """All values greater than the given value."""
  userId_gt: String

  """All values greater than or equal the given value."""
  userId_gte: String

  """All values containing the given string."""
  userId_contains: String

  """All values not containing the given string."""
  userId_not_contains: String

  """All values starting with the given string."""
  userId_starts_with: String

  """All values not starting with the given string."""
  userId_not_starts_with: String

  """All values ending with the given string."""
  userId_ends_with: String

  """All values not ending with the given string."""
  userId_not_ends_with: String
  tag: String

  """All values that are not equal to given value."""
  tag_not: String

  """All values that are contained in given list."""
  tag_in: [String!]

  """All values that are not contained in given list."""
  tag_not_in: [String!]

  """All values less than the given value."""
  tag_lt: String

  """All values less than or equal the given value."""
  tag_lte: String

  """All values greater than the given value."""
  tag_gt: String

  """All values greater than or equal the given value."""
  tag_gte: String

  """All values containing the given string."""
  tag_contains: String

  """All values not containing the given string."""
  tag_not_contains: String

  """All values starting with the given string."""
  tag_starts_with: String

  """All values not starting with the given string."""
  tag_not_starts_with: String

  """All values ending with the given string."""
  tag_ends_with: String

  """All values not ending with the given string."""
  tag_not_ends_with: String
  description: String

  """All values that are not equal to given value."""
  tags_not: String

  """All values that are contained in given list."""
  tags_in: [String!]

  """All values that are not contained in given list."""
  tags_not_in: [String!]

  """All values less than the given value."""
  tags_lt: String

  """All values less than or equal the given value."""
  tags_lte: String

  """All values greater than the given value."""
  tags_gt: String

  """All values greater than or equal the given value."""
  tags_gte: String

  """All values containing the given string."""
  tags_contains: String

  """All values not containing the given string."""
  tags_not_contains: String

  """All values starting with the given string."""
  tags_starts_with: String

  """All values not starting with the given string."""
  tags_not_starts_with: String

  """All values ending with the given string."""
  tags_ends_with: String

  """All values not ending with the given string."""
  tags_not_ends_with: String
  coins: Int

  """All values that are not equal to given value."""
  coins_not: Int

  """All values that are contained in given list."""
  coins_in: [Int!]

  """All values that are not contained in given list."""
  coins_not_in: [Int!]

  """All values less than the given value."""
  coins_lt: Int

  """All values less than or equal the given value."""
  coins_lte: Int

  """All values greater than the given value."""
  coins_gt: Int

  """All values greater than or equal the given value."""
  coins_gte: Int
  active: Boolean

  """All values that are not equal to given value."""
  active_not: Boolean
  chat: ChatType

  """All values that are not equal to given value."""
  chat_not: ChatType

  """All values that are contained in given list."""
  chat_in: [ChatType!]

  """All values that are not contained in given list."""
  chat_not_in: [ChatType!]
  title: String

  """All values that are not equal to given value."""
  title_not: String

  """All values that are contained in given list."""
  title_in: [String!]

  """All values that are not contained in given list."""
  title_not_in: [String!]

  """All values less than the given value."""
  title_lt: String

  """All values less than or equal the given value."""
  title_lte: String

  """All values greater than the given value."""
  title_gt: String

  """All values greater than or equal the given value."""
  title_gte: String

  """All values containing the given string."""
  title_contains: String

  """All values not containing the given string."""
  title_not_contains: String

  """All values starting with the given string."""
  title_starts_with: String

  """All values not starting with the given string."""
  title_not_starts_with: String

  """All values ending with the given string."""
  title_ends_with: String

  """All values not ending with the given string."""
  title_not_ends_with: String
}

input SessionWhereUniqueInput {
  id: ID
}

type Subscription {
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  userTag(where: UserTagSubscriptionWhereInput): UserTagSubscriptionPayload
  question(where: QuestionSubscriptionWhereInput): QuestionSubscriptionPayload
  tag(where: TagSubscriptionWhereInput): TagSubscriptionPayload
  session(where: SessionSubscriptionWhereInput): SessionSubscriptionPayload
}

type Tag implements Node {
  id: ID!
  type: String!
}

"""A connection to a list of items."""
type TagConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
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

"""An edge in a connection."""
type TagEdge {
  """The item at the end of the edge."""
  node: Tag!

  """A cursor for use in pagination."""
  cursor: String!
}

enum TagOrderByInput {
  id_ASC
  id_DESC
  type_ASC
  type_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type TagPreviousValues {
  id: ID!
  type: String!
}

type TagSubscriptionPayload {
  mutation: MutationType!
  node: Tag
  updatedFields: [String!]
  previousValues: TagPreviousValues
}

input TagSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [TagSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TagSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TagSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TagWhereInput
}

input TagUpdateDataInput {
  name: String
}

input TagUpdateInput {
  name: String
}

input TagUpdateOneRequiredInput {
  create: TagCreateInput
  connect: TagWhereUniqueInput
  update: TagUpdateDataInput
  upsert: TagUpsertNestedInput
}

input TagUpsertNestedInput {
  update: TagUpdateDataInput!
  create: TagCreateInput!
}

input TagWhereInput {
  """Logical AND on all given filters."""
  AND: [TagWhereInput!]

  """Logical OR on all given filters."""
  OR: [TagWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TagWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  type_not_ends_with: String
}

"""An edge in a connection."""
type UserEdge {
  """The item at the end of the edge."""
  node: User!

  """A cursor for use in pagination."""
  cursor: String!
}

type Subscription {
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  userTag(where: UserTagSubscriptionWhereInput): UserTagSubscriptionPayload
  question(where: QuestionSubscriptionWhereInput): QuestionSubscriptionPayload
  tag(where: TagSubscriptionWhereInput): TagSubscriptionPayload
  session(where: SessionSubscriptionWhereInput): SessionSubscriptionPayload
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
  """Logical AND on all given filters."""
  AND: [UserSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

type UserTag implements Node {
  id: ID!
  user: User!
  tag: Tag!
}

"""A connection to a list of items."""
type UserTagConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [UserTagEdge]!
  aggregate: AggregateUserTag!
}

input UserTagCreateInput {
  user: UserCreateOneWithoutTagsInput!
  tag: TagCreateOneInput!
}

input TagCreateOneInput {
  create: TagCreateInput
  connect: TagWhereUniqueInput
}

"""An edge in a connection."""
type UserTagEdge {
  """The item at the end of the edge."""
  node: UserTag!

  """A cursor for use in pagination."""
  cursor: String!
}

enum UserTagOrderByInput {
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
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
  """Logical AND on all given filters."""
  AND: [UserTagSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserTagSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserTagSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TagWhereInput
}

input TagUpdateDataInput {
  name: String
}

input TagUpdateInput {
  name: String
}

input TagUpdateOneRequiredInput {
  create: TagCreateInput
  connect: TagWhereUniqueInput
  update: TagUpdateDataInput
  upsert: TagUpsertNestedInput
}

input TagUpsertNestedInput {
  update: TagUpdateDataInput!
  create: TagCreateInput!
}

input TagWhereInput {
  """Logical AND on all given filters."""
  AND: [UserTagWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserTagWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserTagWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  user: UserWhereInput
  tag: TagWhereInput
}

input UserTagWhereUniqueInput {
  id: ID
}

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
}

input TagWhereUniqueInput {
  id: ID
  name: String
}

type User implements Node {
  id: ID!
  username: String!
  email: String!
  uid: String
  tags(where: UserTagWhereInput, orderBy: UserTagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserTag!]
  description: String
  coins: Int
  sessions(where: SessionWhereInput, orderBy: SessionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Session!]
}

"""A connection to a list of items."""
type UserConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  username: String!
  email: String!
  uid: String
  description: String
  coins: Int
  tags: UserTagCreateManyWithoutUserInput
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

"""An edge in a connection."""
type UserEdge {
  """The item at the end of the edge."""
  node: User!

  """A cursor for use in pagination."""
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
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
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
  """Logical AND on all given filters."""
  AND: [UserSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

type UserTag implements Node {
  id: ID!
  user: User!
  tag: Tag!
}

"""A connection to a list of items."""
type UserTagConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
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

"""An edge in a connection."""
type UserTagEdge {
  """The item at the end of the edge."""
  node: UserTag!

  """A cursor for use in pagination."""
  cursor: String!
}

enum UserTagOrderByInput {
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
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
  """Logical AND on all given filters."""
  AND: [UserTagSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserTagSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserTagSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserTagWhereInput
}

input UserTagUpdateInput {
  user: UserUpdateOneRequiredWithoutTagsInput
  tag: TagUpdateOneRequiredInput
}

input UserTagUpdateManyWithoutUserInput {
  create: [UserTagCreateWithoutUserInput!]
  connect: [UserTagWhereUniqueInput!]
  disconnect: [UserTagWhereUniqueInput!]
  delete: [UserTagWhereUniqueInput!]
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
  """Logical AND on all given filters."""
  AND: [UserTagWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserTagWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserTagWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  user: UserWhereInput
  tag: TagWhereInput
}

input UserTagWhereUniqueInput {
  id: ID
}

input UserUpdateInput {
  username: String
  email: String
  uid: String
  description: String
  coins: Int
  tags: UserTagUpdateManyWithoutUserInput
  sessions: SessionUpdateManyInput
}

input UserUpdateOneRequiredWithoutTagsInput {
  create: UserCreateWithoutTagsInput
  connect: UserWhereUniqueInput
  update: UserUpdateWithoutTagsDataInput
  upsert: UserUpsertWithoutTagsInput
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
  """Logical AND on all given filters."""
  AND: [UserWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  username: String

  """All values that are not equal to given value."""
  username_not: String

  """All values that are contained in given list."""
  username_in: [String!]

  """All values that are not contained in given list."""
  username_not_in: [String!]

  """All values less than the given value."""
  username_lt: String

  """All values less than or equal the given value."""
  username_lte: String

  """All values greater than the given value."""
  username_gt: String

  """All values greater than or equal the given value."""
  username_gte: String

  """All values containing the given string."""
  username_contains: String

  """All values not containing the given string."""
  username_not_contains: String

  """All values starting with the given string."""
  username_starts_with: String

  """All values not starting with the given string."""
  username_not_starts_with: String

  """All values ending with the given string."""
  username_ends_with: String

  """All values not ending with the given string."""
  username_not_ends_with: String
  email: String

  """All values that are not equal to given value."""
  email_not: String

  """All values that are contained in given list."""
  email_in: [String!]

  """All values that are not contained in given list."""
  email_not_in: [String!]

  """All values less than the given value."""
  email_lt: String

  """All values less than or equal the given value."""
  email_lte: String

  """All values greater than the given value."""
  email_gt: String

  """All values greater than or equal the given value."""
  email_gte: String

  """All values containing the given string."""
  email_contains: String

  """All values not containing the given string."""
  email_not_contains: String

  """All values starting with the given string."""
  email_starts_with: String

  """All values not starting with the given string."""
  email_not_starts_with: String

  """All values ending with the given string."""
  email_ends_with: String

  """All values not ending with the given string."""
  email_not_ends_with: String
  uid: String

  """All values that are not equal to given value."""
  uid_not: String

  """All values that are contained in given list."""
  uid_in: [String!]

  """All values that are not contained in given list."""
  uid_not_in: [String!]

  """All values less than the given value."""
  uid_lt: String

  """All values less than or equal the given value."""
  uid_lte: String

  """All values greater than the given value."""
  uid_gt: String

  """All values greater than or equal the given value."""
  uid_gte: String

  """All values containing the given string."""
  uid_contains: String

  """All values not containing the given string."""
  uid_not_contains: String

  """All values starting with the given string."""
  uid_starts_with: String

  """All values not starting with the given string."""
  uid_not_starts_with: String

  """All values ending with the given string."""
  uid_ends_with: String

  """All values not ending with the given string."""
  uid_not_ends_with: String
  description: String

  """All values that are not equal to given value."""
  description_not: String

  """All values that are contained in given list."""
  description_in: [String!]

  """All values that are not contained in given list."""
  description_not_in: [String!]

  """All values less than the given value."""
  description_lt: String

  """All values less than or equal the given value."""
  description_lte: String

  """All values greater than the given value."""
  description_gt: String

  """All values greater than or equal the given value."""
  description_gte: String

  """All values containing the given string."""
  description_contains: String

  """All values not containing the given string."""
  description_not_contains: String

  """All values starting with the given string."""
  description_starts_with: String

  """All values not starting with the given string."""
  description_not_starts_with: String

  """All values ending with the given string."""
  description_ends_with: String

  """All values not ending with the given string."""
  description_not_ends_with: String
  coins: Int

  """All values that are not equal to given value."""
  coins_not: Int

  """All values that are contained in given list."""
  coins_in: [Int!]

  """All values that are not contained in given list."""
  coins_not_in: [Int!]

  """All values less than the given value."""
  coins_lt: Int

  """All values less than or equal the given value."""
  coins_lte: Int

  """All values greater than the given value."""
  coins_gt: Int

  """All values greater than or equal the given value."""
  coins_gte: Int
  tags_every: UserTagWhereInput
  tags_some: UserTagWhereInput
  tags_none: UserTagWhereInput
  sessions_every: SessionWhereInput
  sessions_some: SessionWhereInput
  sessions_none: SessionWhereInput
}

input UserWhereUniqueInput {
  id: ID
  username: String
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs})

/**
 * Types
*/

export type UserTagOrderByInput =   'id_ASC' |
  'id_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type UserOrderByInput =   'id_ASC' |
  'id_DESC' |
  'username_ASC' |
  'username_DESC' |
  'email_ASC' |
  'email_DESC' |
  'uid_ASC' |
  'uid_DESC' |
  'description_ASC' |
  'description_DESC' |
  'coins_ASC' |
  'coins_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type SessionOrderByInput =   'id_ASC' |
  'id_DESC' |
  'type_ASC' |
  'type_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type ChatType =   'AUDIO' |
  'VIDEO' |
  'TEXT'

export type QuestionOrderByInput =   'id_ASC' |
  'id_DESC' |
  'userId_ASC' |
  'userId_DESC' |
  'tag_ASC' |
  'tag_DESC' |
  'description_ASC' |
  'description_DESC' |
  'coins_ASC' |
  'coins_DESC' |
  'active_ASC' |
  'active_DESC' |
  'chat_ASC' |
  'chat_DESC' |
  'title_ASC' |
  'title_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type TagOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export interface TagCreateOneInput {
  create?: TagCreateInput
  connect?: TagWhereUniqueInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  NOT?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  username?: String
  username_not?: String
  username_in?: String[] | String
  username_not_in?: String[] | String
  username_lt?: String
  username_lte?: String
  username_gt?: String
  username_gte?: String
  username_contains?: String
  username_not_contains?: String
  username_starts_with?: String
  username_not_starts_with?: String
  username_ends_with?: String
  username_not_ends_with?: String
  email?: String
  email_not?: String
  email_in?: String[] | String
  email_not_in?: String[] | String
  email_lt?: String
  email_lte?: String
  email_gt?: String
  email_gte?: String
  email_contains?: String
  email_not_contains?: String
  email_starts_with?: String
  email_not_starts_with?: String
  email_ends_with?: String
  email_not_ends_with?: String
  uid?: String
  uid_not?: String
  uid_in?: String[] | String
  uid_not_in?: String[] | String
  uid_lt?: String
  uid_lte?: String
  uid_gt?: String
  uid_gte?: String
  uid_contains?: String
  uid_not_contains?: String
  uid_starts_with?: String
  uid_not_starts_with?: String
  uid_ends_with?: String
  uid_not_ends_with?: String
  description?: String
  description_not?: String
  description_in?: String[] | String
  description_not_in?: String[] | String
  description_lt?: String
  description_lte?: String
  description_gt?: String
  description_gte?: String
  description_contains?: String
  description_not_contains?: String
  description_starts_with?: String
  description_not_starts_with?: String
  description_ends_with?: String
  description_not_ends_with?: String
  coins?: Int
  coins_not?: Int
  coins_in?: Int[] | Int
  coins_not_in?: Int[] | Int
  coins_lt?: Int
  coins_lte?: Int
  coins_gt?: Int
  coins_gte?: Int
  tags_every?: UserTagWhereInput
  tags_some?: UserTagWhereInput
  tags_none?: UserTagWhereInput
  sessions_every?: SessionWhereInput
  sessions_some?: SessionWhereInput
  sessions_none?: SessionWhereInput
}

export interface UserTagUpdateInput {
  user?: UserUpdateOneRequiredWithoutTagsInput
  tag?: TagUpdateOneRequiredInput
}

export interface QuestionCreateInput {
  userId: String
  tag: String
  description: String
  coins?: Int
  active?: Boolean
  chat: ChatType
  title: String
}

export interface SessionUpsertWithWhereUniqueNestedInput {
  where: SessionWhereUniqueInput
  update: SessionUpdateDataInput
  create: SessionCreateInput
}

export interface UserTagCreateInput {
  user: UserCreateOneWithoutTagsInput
  tag: TagCreateOneInput
}

export interface SessionUpdateDataInput {
  type?: String
}

export interface TagSubscriptionWhereInput {
  AND?: TagSubscriptionWhereInput[] | TagSubscriptionWhereInput
  OR?: TagSubscriptionWhereInput[] | TagSubscriptionWhereInput
  NOT?: TagSubscriptionWhereInput[] | TagSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: TagWhereInput
}

export interface SessionUpdateWithWhereUniqueNestedInput {
  where: SessionWhereUniqueInput
  data: SessionUpdateDataInput
}

export interface QuestionSubscriptionWhereInput {
  AND?: QuestionSubscriptionWhereInput[] | QuestionSubscriptionWhereInput
  OR?: QuestionSubscriptionWhereInput[] | QuestionSubscriptionWhereInput
  NOT?: QuestionSubscriptionWhereInput[] | QuestionSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: QuestionWhereInput
}

export interface SessionUpdateManyInput {
  create?: SessionCreateInput[] | SessionCreateInput
  connect?: SessionWhereUniqueInput[] | SessionWhereUniqueInput
  disconnect?: SessionWhereUniqueInput[] | SessionWhereUniqueInput
  delete?: SessionWhereUniqueInput[] | SessionWhereUniqueInput
  update?: SessionUpdateWithWhereUniqueNestedInput[] | SessionUpdateWithWhereUniqueNestedInput
  upsert?: SessionUpsertWithWhereUniqueNestedInput[] | SessionUpsertWithWhereUniqueNestedInput
}

export interface UserTagSubscriptionWhereInput {
  AND?: UserTagSubscriptionWhereInput[] | UserTagSubscriptionWhereInput
  OR?: UserTagSubscriptionWhereInput[] | UserTagSubscriptionWhereInput
  NOT?: UserTagSubscriptionWhereInput[] | UserTagSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserTagWhereInput
}

export interface UserTagUpsertWithWhereUniqueWithoutUserInput {
  where: UserTagWhereUniqueInput
  update: UserTagUpdateWithoutUserDataInput
  create: UserTagCreateWithoutUserInput
}

export interface UserTagWhereInput {
  AND?: UserTagWhereInput[] | UserTagWhereInput
  OR?: UserTagWhereInput[] | UserTagWhereInput
  NOT?: UserTagWhereInput[] | UserTagWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  user?: UserWhereInput
  tag?: TagWhereInput
}

export interface TagUpsertNestedInput {
  update: TagUpdateDataInput
  create: TagCreateInput
}

export interface SessionUpdateInput {
  type?: String
}

export interface TagUpdateDataInput {
  name?: String
}

export interface UserTagWhereUniqueInput {
  id?: ID_Input
}

export interface TagUpdateOneRequiredInput {
  create?: TagCreateInput
  connect?: TagWhereUniqueInput
  update?: TagUpdateDataInput
  upsert?: TagUpsertNestedInput
}

export interface TagWhereUniqueInput {
  id?: ID_Input
  name?: String
}

export interface UserTagUpdateWithoutUserDataInput {
  tag?: TagUpdateOneRequiredInput
}

export interface UserTagWhereUniqueInput {
  id?: ID_Input
}

export interface UserTagUpdateWithWhereUniqueWithoutUserInput {
  where: UserTagWhereUniqueInput
  data: UserTagUpdateWithoutUserDataInput
}

export interface UserUpsertWithoutTagsInput {
  update: UserUpdateWithoutTagsDataInput
  create: UserCreateWithoutTagsInput
}

export interface UserCreateInput {
  username: String
  email: String
  uid?: String
  description?: String
  coins?: Int
  tags?: UserTagCreateManyWithoutUserInput
  sessions?: SessionCreateManyInput
}

export interface UserUpdateOneRequiredWithoutTagsInput {
  create?: UserCreateWithoutTagsInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutTagsDataInput
  upsert?: UserUpsertWithoutTagsInput
}

export interface UserTagCreateManyWithoutUserInput {
  create?: UserTagCreateWithoutUserInput[] | UserTagCreateWithoutUserInput
  connect?: UserTagWhereUniqueInput[] | UserTagWhereUniqueInput
}

export interface SessionWhereInput {
  AND?: SessionWhereInput[] | SessionWhereInput
  OR?: SessionWhereInput[] | SessionWhereInput
  NOT?: SessionWhereInput[] | SessionWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  type?: String
  type_not?: String
  type_in?: String[] | String
  type_not_in?: String[] | String
  type_lt?: String
  type_lte?: String
  type_gt?: String
  type_gte?: String
  type_contains?: String
  type_not_contains?: String
  type_starts_with?: String
  type_not_starts_with?: String
  type_ends_with?: String
  type_not_ends_with?: String
}

export interface UserTagCreateWithoutUserInput {
  tag: TagCreateOneInput
}

export interface TagWhereInput {
  AND?: TagWhereInput[] | TagWhereInput
  OR?: TagWhereInput[] | TagWhereInput
  NOT?: TagWhereInput[] | TagWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
}

export interface UserTagUpdateManyWithoutUserInput {
  create?: UserTagCreateWithoutUserInput[] | UserTagCreateWithoutUserInput
  connect?: UserTagWhereUniqueInput[] | UserTagWhereUniqueInput
  disconnect?: UserTagWhereUniqueInput[] | UserTagWhereUniqueInput
  delete?: UserTagWhereUniqueInput[] | UserTagWhereUniqueInput
  update?: UserTagUpdateWithWhereUniqueWithoutUserInput[] | UserTagUpdateWithWhereUniqueWithoutUserInput
  upsert?: UserTagUpsertWithWhereUniqueWithoutUserInput[] | UserTagUpsertWithWhereUniqueWithoutUserInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  username?: String
}

export interface TagCreateInput {
  name: String
}

export interface SessionWhereUniqueInput {
  id?: ID_Input
}

export interface SessionCreateManyInput {
  create?: SessionCreateInput[] | SessionCreateInput
  connect?: SessionWhereUniqueInput[] | SessionWhereUniqueInput
}

export interface UserUpdateWithoutTagsDataInput {
  username?: String
  email?: String
  uid?: String
  description?: String
  coins?: Int
  sessions?: SessionUpdateManyInput
}

export interface QuestionWhereInput {
  AND?: QuestionWhereInput[] | QuestionWhereInput
  OR?: QuestionWhereInput[] | QuestionWhereInput
  NOT?: QuestionWhereInput[] | QuestionWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  userId?: String
  userId_not?: String
  userId_in?: String[] | String
  userId_not_in?: String[] | String
  userId_lt?: String
  userId_lte?: String
  userId_gt?: String
  userId_gte?: String
  userId_contains?: String
  userId_not_contains?: String
  userId_starts_with?: String
  userId_not_starts_with?: String
  userId_ends_with?: String
  userId_not_ends_with?: String
  tag?: String
  tag_not?: String
  tag_in?: String[] | String
  tag_not_in?: String[] | String
  tag_lt?: String
  tag_lte?: String
  tag_gt?: String
  tag_gte?: String
  tag_contains?: String
  tag_not_contains?: String
  tag_starts_with?: String
  tag_not_starts_with?: String
  tag_ends_with?: String
  tag_not_ends_with?: String
  description?: String
  description_not?: String
  description_in?: String[] | String
  description_not_in?: String[] | String
  description_lt?: String
  description_lte?: String
  description_gt?: String
  description_gte?: String
  description_contains?: String
  description_not_contains?: String
  description_starts_with?: String
  description_not_starts_with?: String
  description_ends_with?: String
  description_not_ends_with?: String
  coins?: Int
  coins_not?: Int
  coins_in?: Int[] | Int
  coins_not_in?: Int[] | Int
  coins_lt?: Int
  coins_lte?: Int
  coins_gt?: Int
  coins_gte?: Int
  active?: Boolean
  active_not?: Boolean
  chat?: ChatType
  chat_not?: ChatType
  chat_in?: ChatType[] | ChatType
  chat_not_in?: ChatType[] | ChatType
  title?: String
  title_not?: String
  title_in?: String[] | String
  title_not_in?: String[] | String
  title_lt?: String
  title_lte?: String
  title_gt?: String
  title_gte?: String
  title_contains?: String
  title_not_contains?: String
  title_starts_with?: String
  title_not_starts_with?: String
  title_ends_with?: String
  title_not_ends_with?: String
}

export interface UserCreateWithoutTagsInput {
  username: String
  email: String
  uid?: String
  description?: String
  coins?: Int
  sessions?: SessionCreateManyInput
}

export interface UserCreateOneWithoutTagsInput {
  create?: UserCreateWithoutTagsInput
  connect?: UserWhereUniqueInput
}

export interface UserUpdateInput {
  username?: String
  email?: String
  uid?: String
  description?: String
  coins?: Int
  tags?: UserTagUpdateManyWithoutUserInput
  sessions?: SessionUpdateManyInput
}

export interface SessionCreateInput {
  type: String
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface SessionSubscriptionWhereInput {
  AND?: SessionSubscriptionWhereInput[] | SessionSubscriptionWhereInput
  OR?: SessionSubscriptionWhereInput[] | SessionSubscriptionWhereInput
  NOT?: SessionSubscriptionWhereInput[] | SessionSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: SessionWhereInput
}

export interface QuestionUpdateInput {
  userId?: String
  tag?: String
  description?: String
  coins?: Int
  active?: Boolean
  chat?: ChatType
  title?: String
}

export interface QuestionWhereUniqueInput {
  id?: ID_Input
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface SessionPreviousValues {
  id: ID_Output
  type: String
}

export interface User extends Node {
  id: ID_Output
  username: String
  email: String
  uid?: String
  tags?: UserTag[]
  description?: String
  coins?: Int
  sessions?: Session[]
}

export interface BatchPayload {
  count: Long
}

export interface AggregateSession {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface SessionEdge {
  node: Session
  cursor: String
}

export interface TagSubscriptionPayload {
  mutation: MutationType
  node?: Tag
  updatedFields?: String[]
  previousValues?: TagPreviousValues
}

export interface AggregateTag {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface SessionConnection {
  pageInfo: PageInfo
  edges: SessionEdge[]
  aggregate: AggregateSession
}

export interface Question extends Node {
  id: ID_Output
  userId: String
  tag: String
  description: String
  coins?: Int
  active?: Boolean
  chat: ChatType
  title: String
}

/*
 * A connection to a list of items.

 */
export interface TagConnection {
  pageInfo: PageInfo
  edges: TagEdge[]
  aggregate: AggregateTag
}

export interface UserTag extends Node {
  id: ID_Output
  user: User
  tag: Tag
}

/*
 * An edge in a connection.

 */
export interface QuestionEdge {
  node: Question
  cursor: String
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

export interface AggregateUserTag {
  count: Int
}

export interface UserPreviousValues {
  id: ID_Output
  username: String
  email: String
  uid?: String
  description?: String
  coins?: Int
}

/*
 * A connection to a list of items.

 */
export interface UserTagConnection {
  pageInfo: PageInfo
  edges: UserTagEdge[]
  aggregate: AggregateUserTag
}

export interface TagPreviousValues {
  id: ID_Output
  name: String
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

export interface UserTagSubscriptionPayload {
  mutation: MutationType
  node?: UserTag
  updatedFields?: String[]
  previousValues?: UserTagPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

export interface UserTagPreviousValues {
  id: ID_Output
}

/*
 * An edge in a connection.

 */
export interface TagEdge {
  node: Tag
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface QuestionConnection {
  pageInfo: PageInfo
  edges: QuestionEdge[]
  aggregate: AggregateQuestion
}

export interface Tag extends Node {
  id: ID_Output
  name: String
}

export interface QuestionPreviousValues {
  id: ID_Output
  userId: String
  tag: String
  description: String
  coins?: Int
  active?: Boolean
  chat: ChatType
  title: String
}

export interface QuestionSubscriptionPayload {
  mutation: MutationType
  node?: Question
  updatedFields?: String[]
  previousValues?: QuestionPreviousValues
}

export interface Session extends Node {
  id: ID_Output
  type: String
}

/*
 * An edge in a connection.

 */
export interface UserTagEdge {
  node: UserTag
  cursor: String
}

export interface AggregateQuestion {
  count: Int
}

export interface SessionSubscriptionPayload {
  mutation: MutationType
  node?: Session
  updatedFields?: String[]
  previousValues?: SessionPreviousValues
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface AggregateUser {
  count: Int
}

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean