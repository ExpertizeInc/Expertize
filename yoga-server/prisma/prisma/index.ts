import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    profiles: <T = Profile[]>(args: { where?: ProfileWhereInput, orderBy?: ProfileOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    sessions: <T = Session[]>(args: { where?: SessionWhereInput, orderBy?: SessionOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    userTags: <T = UserTag[]>(args: { where?: UserTagWhereInput, orderBy?: UserTagOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    tags: <T = Tag[]>(args: { where?: TagWhereInput, orderBy?: TagOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    questions: <T = Question[]>(args: { where?: QuestionWhereInput, orderBy?: QuestionOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    users: <T = User[]>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    profile: <T = Profile | null>(args: { where: ProfileWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    session: <T = Session | null>(args: { where: SessionWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    userTag: <T = UserTag | null>(args: { where: UserTagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    tag: <T = Tag | null>(args: { where: TagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    question: <T = Question | null>(args: { where: QuestionWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    user: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    profilesConnection: <T = ProfileConnection>(args: { where?: ProfileWhereInput, orderBy?: ProfileOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    sessionsConnection: <T = SessionConnection>(args: { where?: SessionWhereInput, orderBy?: SessionOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    userTagsConnection: <T = UserTagConnection>(args: { where?: UserTagWhereInput, orderBy?: UserTagOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    tagsConnection: <T = TagConnection>(args: { where?: TagWhereInput, orderBy?: TagOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    questionsConnection: <T = QuestionConnection>(args: { where?: QuestionWhereInput, orderBy?: QuestionOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    usersConnection: <T = UserConnection>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {
    createProfile: <T = Profile>(args: { data: ProfileCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createSession: <T = Session>(args: { data: SessionCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createUserTag: <T = UserTag>(args: { data: UserTagCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createTag: <T = Tag>(args: { data: TagCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createQuestion: <T = Question>(args: { data: QuestionCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createUser: <T = User>(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateProfile: <T = Profile | null>(args: { data: ProfileUpdateInput, where: ProfileWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateSession: <T = Session | null>(args: { data: SessionUpdateInput, where: SessionWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateUserTag: <T = UserTag | null>(args: { data: UserTagUpdateInput, where: UserTagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateTag: <T = Tag | null>(args: { data: TagUpdateInput, where: TagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateQuestion: <T = Question | null>(args: { data: QuestionUpdateInput, where: QuestionWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateUser: <T = User | null>(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteProfile: <T = Profile | null>(args: { where: ProfileWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteSession: <T = Session | null>(args: { where: SessionWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteUserTag: <T = UserTag | null>(args: { where: UserTagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteTag: <T = Tag | null>(args: { where: TagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteQuestion: <T = Question | null>(args: { where: QuestionWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteUser: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertProfile: <T = Profile>(args: { where: ProfileWhereUniqueInput, create: ProfileCreateInput, update: ProfileUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertSession: <T = Session>(args: { where: SessionWhereUniqueInput, create: SessionCreateInput, update: SessionUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertUserTag: <T = UserTag>(args: { where: UserTagWhereUniqueInput, create: UserTagCreateInput, update: UserTagUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertTag: <T = Tag>(args: { where: TagWhereUniqueInput, create: TagCreateInput, update: TagUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertQuestion: <T = Question>(args: { where: QuestionWhereUniqueInput, create: QuestionCreateInput, update: QuestionUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertUser: <T = User>(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyProfiles: <T = BatchPayload>(args: { data: ProfileUpdateInput, where?: ProfileWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManySessions: <T = BatchPayload>(args: { data: SessionUpdateInput, where?: SessionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyUserTags: <T = BatchPayload>(args: { data: UserTagUpdateInput, where?: UserTagWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyTags: <T = BatchPayload>(args: { data: TagUpdateInput, where?: TagWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyQuestions: <T = BatchPayload>(args: { data: QuestionUpdateInput, where?: QuestionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyUsers: <T = BatchPayload>(args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyProfiles: <T = BatchPayload>(args: { where?: ProfileWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManySessions: <T = BatchPayload>(args: { where?: SessionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyUserTags: <T = BatchPayload>(args: { where?: UserTagWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyTags: <T = BatchPayload>(args: { where?: TagWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyQuestions: <T = BatchPayload>(args: { where?: QuestionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyUsers: <T = BatchPayload>(args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    executeRaw: <T = Json>(args: { database?: PrismaDatabase, query: String }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {
    profile: <T = ProfileSubscriptionPayload | null>(args: { where?: ProfileSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    session: <T = SessionSubscriptionPayload | null>(args: { where?: SessionSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    userTag: <T = UserTagSubscriptionPayload | null>(args: { where?: UserTagSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    tag: <T = TagSubscriptionPayload | null>(args: { where?: TagSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    question: <T = QuestionSubscriptionPayload | null>(args: { where?: QuestionSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    user: <T = UserSubscriptionPayload | null>(args: { where?: UserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  Profile: (where?: ProfileWhereInput) => Promise<boolean>
  Session: (where?: SessionWhereInput) => Promise<boolean>
  UserTag: (where?: UserTagWhereInput) => Promise<boolean>
  Tag: (where?: TagWhereInput) => Promise<boolean>
  Question: (where?: QuestionWhereInput) => Promise<boolean>
  User: (where?: UserWhereInput) => Promise<boolean>
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

const typeDefs = `type AggregateProfile {
  count: Int!
}

type AggregateQuestion {
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

scalar DateTime

"""Raw JSON value"""
scalar Json

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createProfile(data: ProfileCreateInput!): Profile!
  createSession(data: SessionCreateInput!): Session!
  createUserTag(data: UserTagCreateInput!): UserTag!
  createTag(data: TagCreateInput!): Tag!
  createQuestion(data: QuestionCreateInput!): Question!
  createUser(data: UserCreateInput!): User!
  updateProfile(data: ProfileUpdateInput!, where: ProfileWhereUniqueInput!): Profile
  updateSession(data: SessionUpdateInput!, where: SessionWhereUniqueInput!): Session
  updateUserTag(data: UserTagUpdateInput!, where: UserTagWhereUniqueInput!): UserTag
  updateTag(data: TagUpdateInput!, where: TagWhereUniqueInput!): Tag
  updateQuestion(data: QuestionUpdateInput!, where: QuestionWhereUniqueInput!): Question
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  deleteProfile(where: ProfileWhereUniqueInput!): Profile
  deleteSession(where: SessionWhereUniqueInput!): Session
  deleteUserTag(where: UserTagWhereUniqueInput!): UserTag
  deleteTag(where: TagWhereUniqueInput!): Tag
  deleteQuestion(where: QuestionWhereUniqueInput!): Question
  deleteUser(where: UserWhereUniqueInput!): User
  upsertProfile(where: ProfileWhereUniqueInput!, create: ProfileCreateInput!, update: ProfileUpdateInput!): Profile!
  upsertSession(where: SessionWhereUniqueInput!, create: SessionCreateInput!, update: SessionUpdateInput!): Session!
  upsertUserTag(where: UserTagWhereUniqueInput!, create: UserTagCreateInput!, update: UserTagUpdateInput!): UserTag!
  upsertTag(where: TagWhereUniqueInput!, create: TagCreateInput!, update: TagUpdateInput!): Tag!
  upsertQuestion(where: QuestionWhereUniqueInput!, create: QuestionCreateInput!, update: QuestionUpdateInput!): Question!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  updateManyProfiles(data: ProfileUpdateInput!, where: ProfileWhereInput): BatchPayload!
  updateManySessions(data: SessionUpdateInput!, where: SessionWhereInput): BatchPayload!
  updateManyUserTags(data: UserTagUpdateInput!, where: UserTagWhereInput): BatchPayload!
  updateManyTags(data: TagUpdateInput!, where: TagWhereInput): BatchPayload!
  updateManyQuestions(data: QuestionUpdateInput!, where: QuestionWhereInput): BatchPayload!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  deleteManyProfiles(where: ProfileWhereInput): BatchPayload!
  deleteManySessions(where: SessionWhereInput): BatchPayload!
  deleteManyUserTags(where: UserTagWhereInput): BatchPayload!
  deleteManyTags(where: TagWhereInput): BatchPayload!
  deleteManyQuestions(where: QuestionWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  executeRaw(database: PrismaDatabase, query: String!): Json!
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

enum PrismaDatabase {
  default
}

type Profile implements Node {
  id: ID!
  userId: Int!
  tags(where: UserTagWhereInput, orderBy: UserTagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserTag!]
  description: String
  coins: Int
  session(where: SessionWhereInput, orderBy: SessionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Session!]
  question(where: QuestionWhereInput, orderBy: QuestionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Question!]
}

"""A connection to a list of items."""
type ProfileConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ProfileEdge]!
  aggregate: AggregateProfile!
}

input ProfileCreateInput {
  userId: Int!
  description: String
  coins: Int
  tags: UserTagCreateManyInput
  session: SessionCreateManyInput
  question: QuestionCreateManyInput
}

"""An edge in a connection."""
type ProfileEdge {
  """The item at the end of the edge."""
  node: Profile!

  """A cursor for use in pagination."""
  cursor: String!
}

enum ProfileOrderByInput {
  id_ASC
  id_DESC
  userId_ASC
  userId_DESC
  description_ASC
  description_DESC
  coins_ASC
  coins_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ProfilePreviousValues {
  id: ID!
  userId: Int!
  description: String
  coins: Int
}

type ProfileSubscriptionPayload {
  mutation: MutationType!
  node: Profile
  updatedFields: [String!]
  previousValues: ProfilePreviousValues
}

input ProfileSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ProfileSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ProfileSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ProfileSubscriptionWhereInput!]

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
  node: ProfileWhereInput
}

input ProfileUpdateInput {
  userId: Int
  description: String
  coins: Int
  tags: UserTagUpdateManyInput
  session: SessionUpdateManyInput
  question: QuestionUpdateManyInput
}

input ProfileWhereInput {
  """Logical AND on all given filters."""
  AND: [ProfileWhereInput!]

  """Logical OR on all given filters."""
  OR: [ProfileWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ProfileWhereInput!]
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
  userId: Int

  """All values that are not equal to given value."""
  userId_not: Int

  """All values that are contained in given list."""
  userId_in: [Int!]

  """All values that are not contained in given list."""
  userId_not_in: [Int!]

  """All values less than the given value."""
  userId_lt: Int

  """All values less than or equal the given value."""
  userId_lte: Int

  """All values greater than the given value."""
  userId_gt: Int

  """All values greater than or equal the given value."""
  userId_gte: Int
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
  session_every: SessionWhereInput
  session_some: SessionWhereInput
  session_none: SessionWhereInput
  question_every: QuestionWhereInput
  question_some: QuestionWhereInput
  question_none: QuestionWhereInput
}

input ProfileWhereUniqueInput {
  id: ID
}

type Query {
  profiles(where: ProfileWhereInput, orderBy: ProfileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Profile]!
  sessions(where: SessionWhereInput, orderBy: SessionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Session]!
  userTags(where: UserTagWhereInput, orderBy: UserTagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserTag]!
  tags(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tag]!
  questions(where: QuestionWhereInput, orderBy: QuestionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Question]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  profile(where: ProfileWhereUniqueInput!): Profile
  session(where: SessionWhereUniqueInput!): Session
  userTag(where: UserTagWhereUniqueInput!): UserTag
  tag(where: TagWhereUniqueInput!): Tag
  question(where: QuestionWhereUniqueInput!): Question
  user(where: UserWhereUniqueInput!): User
  profilesConnection(where: ProfileWhereInput, orderBy: ProfileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProfileConnection!
  sessionsConnection(where: SessionWhereInput, orderBy: SessionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SessionConnection!
  userTagsConnection(where: UserTagWhereInput, orderBy: UserTagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserTagConnection!
  tagsConnection(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TagConnection!
  questionsConnection(where: QuestionWhereInput, orderBy: QuestionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): QuestionConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Question implements Node {
  id: ID!
  userId: String!
  tags(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tag!]
  coins: Int!
  active: Boolean
  chat: ChatType!
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
  coins: Int!
  active: Boolean
  chat: ChatType!
  tags: TagCreateManyInput
}

input QuestionCreateManyInput {
  create: [QuestionCreateInput!]
  connect: [QuestionWhereUniqueInput!]
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
  coins_ASC
  coins_DESC
  active_ASC
  active_DESC
  chat_ASC
  chat_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type QuestionPreviousValues {
  id: ID!
  userId: String!
  coins: Int!
  active: Boolean
  chat: ChatType!
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

input QuestionUpdateDataInput {
  userId: String
  coins: Int
  active: Boolean
  chat: ChatType
  tags: TagUpdateManyInput
}

input QuestionUpdateInput {
  userId: String
  coins: Int
  active: Boolean
  chat: ChatType
  tags: TagUpdateManyInput
}

input QuestionUpdateManyInput {
  create: [QuestionCreateInput!]
  connect: [QuestionWhereUniqueInput!]
  disconnect: [QuestionWhereUniqueInput!]
  delete: [QuestionWhereUniqueInput!]
  update: [QuestionUpdateWithWhereUniqueNestedInput!]
  upsert: [QuestionUpsertWithWhereUniqueNestedInput!]
}

input QuestionUpdateWithWhereUniqueNestedInput {
  where: QuestionWhereUniqueInput!
  data: QuestionUpdateDataInput!
}

input QuestionUpsertWithWhereUniqueNestedInput {
  where: QuestionWhereUniqueInput!
  update: QuestionUpdateDataInput!
  create: QuestionCreateInput!
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
  tags_every: TagWhereInput
  tags_some: TagWhereInput
  tags_none: TagWhereInput
}

input QuestionWhereUniqueInput {
  id: ID
}

type Session implements Node {
  id: ID!
  type: String!
  createdAt: DateTime!
}

"""A connection to a list of items."""
type SessionConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
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

"""An edge in a connection."""
type SessionEdge {
  """The item at the end of the edge."""
  node: Session!

  """A cursor for use in pagination."""
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
  createdAt: DateTime!
}

type SessionSubscriptionPayload {
  mutation: MutationType!
  node: Session
  updatedFields: [String!]
  previousValues: SessionPreviousValues
}

input SessionSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [SessionSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [SessionSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [SessionSubscriptionWhereInput!]

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
  node: SessionWhereInput
}

input SessionUpdateDataInput {
  type: String
}

input SessionUpdateInput {
  type: String
}

input SessionUpdateManyInput {
  create: [SessionCreateInput!]
  connect: [SessionWhereUniqueInput!]
  disconnect: [SessionWhereUniqueInput!]
  delete: [SessionWhereUniqueInput!]
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
  """Logical AND on all given filters."""
  AND: [SessionWhereInput!]

  """Logical OR on all given filters."""
  OR: [SessionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [SessionWhereInput!]
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
  type: String

  """All values that are not equal to given value."""
  type_not: String

  """All values that are contained in given list."""
  type_in: [String!]

  """All values that are not contained in given list."""
  type_not_in: [String!]

  """All values less than the given value."""
  type_lt: String

  """All values less than or equal the given value."""
  type_lte: String

  """All values greater than the given value."""
  type_gt: String

  """All values greater than or equal the given value."""
  type_gte: String

  """All values containing the given string."""
  type_contains: String

  """All values not containing the given string."""
  type_not_contains: String

  """All values starting with the given string."""
  type_starts_with: String

  """All values not starting with the given string."""
  type_not_starts_with: String

  """All values ending with the given string."""
  type_ends_with: String

  """All values not ending with the given string."""
  type_not_ends_with: String
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
}

input SessionWhereUniqueInput {
  id: ID
}

type Subscription {
  profile(where: ProfileSubscriptionWhereInput): ProfileSubscriptionPayload
  session(where: SessionSubscriptionWhereInput): SessionSubscriptionPayload
  userTag(where: UserTagSubscriptionWhereInput): UserTagSubscriptionPayload
  tag(where: TagSubscriptionWhereInput): TagSubscriptionPayload
  question(where: QuestionSubscriptionWhereInput): QuestionSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type Tag implements Node {
  id: ID!
  name: String!
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

input TagCreateManyInput {
  create: [TagCreateInput!]
  connect: [TagWhereUniqueInput!]
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
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
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

input TagUpdateManyInput {
  create: [TagCreateInput!]
  connect: [TagWhereUniqueInput!]
  disconnect: [TagWhereUniqueInput!]
  delete: [TagWhereUniqueInput!]
  update: [TagUpdateWithWhereUniqueNestedInput!]
  upsert: [TagUpsertWithWhereUniqueNestedInput!]
}

input TagUpdateOneInput {
  create: TagCreateInput
  connect: TagWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: TagUpdateDataInput
  upsert: TagUpsertNestedInput
}

input TagUpdateOneRequiredInput {
  create: TagCreateInput
  connect: TagWhereUniqueInput
  update: TagUpdateDataInput
  upsert: TagUpsertNestedInput
}

input TagUpdateWithWhereUniqueNestedInput {
  where: TagWhereUniqueInput!
  data: TagUpdateDataInput!
}

input TagUpsertNestedInput {
  update: TagUpdateDataInput!
  create: TagCreateInput!
}

input TagUpsertWithWhereUniqueNestedInput {
  where: TagWhereUniqueInput!
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
  tags(where: TagWhereInput): Tag
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
  tags: TagCreateOneInput
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
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
  user(where: UserWhereInput): User!
  tag(where: TagWhereInput): Tag!
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
  user: UserCreateOneInput!
  tag: TagCreateOneInput!
}

input UserTagCreateManyInput {
  create: [UserTagCreateInput!]
  connect: [UserTagWhereUniqueInput!]
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

input UserTagUpdateDataInput {
  user: UserUpdateOneRequiredInput
  tag: TagUpdateOneRequiredInput
}

input UserTagUpdateInput {
  user: UserUpdateOneRequiredInput
  tag: TagUpdateOneRequiredInput
}

input UserTagUpdateManyInput {
  create: [UserTagCreateInput!]
  connect: [UserTagWhereUniqueInput!]
  disconnect: [UserTagWhereUniqueInput!]
  delete: [UserTagWhereUniqueInput!]
  update: [UserTagUpdateWithWhereUniqueNestedInput!]
  upsert: [UserTagUpsertWithWhereUniqueNestedInput!]
}

input UserTagUpdateWithWhereUniqueNestedInput {
  where: UserTagWhereUniqueInput!
  data: UserTagUpdateDataInput!
}

input UserTagUpsertWithWhereUniqueNestedInput {
  where: UserTagWhereUniqueInput!
  update: UserTagUpdateDataInput!
  create: UserTagCreateInput!
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

input UserUpdateDataInput {
  username: String
  email: String
  uid: String
  tags: TagUpdateOneInput
}

input UserUpdateInput {
  username: String
  email: String
  uid: String
  tags: TagUpdateOneInput
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
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
  tags: TagWhereInput
}

input UserWhereUniqueInput {
  id: ID
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs})

/**
 * Types
*/

export type ChatType =   'AUDIO' |
  'VIDEO' |
  'TEXT'

export type ProfileOrderByInput =   'id_ASC' |
  'id_DESC' |
  'userId_ASC' |
  'userId_DESC' |
  'description_ASC' |
  'description_DESC' |
  'coins_ASC' |
  'coins_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type UserTagOrderByInput =   'id_ASC' |
  'id_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type SessionOrderByInput =   'id_ASC' |
  'id_DESC' |
  'type_ASC' |
  'type_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type QuestionOrderByInput =   'id_ASC' |
  'id_DESC' |
  'userId_ASC' |
  'userId_DESC' |
  'coins_ASC' |
  'coins_DESC' |
  'active_ASC' |
  'active_DESC' |
  'chat_ASC' |
  'chat_DESC' |
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

export type UserOrderByInput =   'id_ASC' |
  'id_DESC' |
  'username_ASC' |
  'username_DESC' |
  'email_ASC' |
  'email_DESC' |
  'uid_ASC' |
  'uid_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type PrismaDatabase =   'default'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export interface TagCreateInput {
  name: String
}

export interface ProfileWhereInput {
  AND?: ProfileWhereInput[] | ProfileWhereInput
  OR?: ProfileWhereInput[] | ProfileWhereInput
  NOT?: ProfileWhereInput[] | ProfileWhereInput
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
  userId?: Int
  userId_not?: Int
  userId_in?: Int[] | Int
  userId_not_in?: Int[] | Int
  userId_lt?: Int
  userId_lte?: Int
  userId_gt?: Int
  userId_gte?: Int
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
  session_every?: SessionWhereInput
  session_some?: SessionWhereInput
  session_none?: SessionWhereInput
  question_every?: QuestionWhereInput
  question_some?: QuestionWhereInput
  question_none?: QuestionWhereInput
}

export interface QuestionUpdateWithWhereUniqueNestedInput {
  where: QuestionWhereUniqueInput
  data: QuestionUpdateDataInput
}

export interface TagUpdateOneInput {
  create?: TagCreateInput
  connect?: TagWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: TagUpdateDataInput
  upsert?: TagUpsertNestedInput
}

export interface QuestionUpdateManyInput {
  create?: QuestionCreateInput[] | QuestionCreateInput
  connect?: QuestionWhereUniqueInput[] | QuestionWhereUniqueInput
  disconnect?: QuestionWhereUniqueInput[] | QuestionWhereUniqueInput
  delete?: QuestionWhereUniqueInput[] | QuestionWhereUniqueInput
  update?: QuestionUpdateWithWhereUniqueNestedInput[] | QuestionUpdateWithWhereUniqueNestedInput
  upsert?: QuestionUpsertWithWhereUniqueNestedInput[] | QuestionUpsertWithWhereUniqueNestedInput
}

export interface ProfileUpdateInput {
  userId?: Int
  description?: String
  coins?: Int
  tags?: UserTagUpdateManyInput
  session?: SessionUpdateManyInput
  question?: QuestionUpdateManyInput
}

export interface SessionUpsertWithWhereUniqueNestedInput {
  where: SessionWhereUniqueInput
  update: SessionUpdateDataInput
  create: SessionCreateInput
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

export interface SessionUpdateDataInput {
  type?: String
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

export interface SessionUpdateWithWhereUniqueNestedInput {
  where: SessionWhereUniqueInput
  data: SessionUpdateDataInput
}

export interface ProfileSubscriptionWhereInput {
  AND?: ProfileSubscriptionWhereInput[] | ProfileSubscriptionWhereInput
  OR?: ProfileSubscriptionWhereInput[] | ProfileSubscriptionWhereInput
  NOT?: ProfileSubscriptionWhereInput[] | ProfileSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ProfileWhereInput
}

export interface SessionUpdateManyInput {
  create?: SessionCreateInput[] | SessionCreateInput
  connect?: SessionWhereUniqueInput[] | SessionWhereUniqueInput
  disconnect?: SessionWhereUniqueInput[] | SessionWhereUniqueInput
  delete?: SessionWhereUniqueInput[] | SessionWhereUniqueInput
  update?: SessionUpdateWithWhereUniqueNestedInput[] | SessionUpdateWithWhereUniqueNestedInput
  upsert?: SessionUpsertWithWhereUniqueNestedInput[] | SessionUpsertWithWhereUniqueNestedInput
}

export interface UserUpdateInput {
  username?: String
  email?: String
  uid?: String
  tags?: TagUpdateOneInput
}

export interface UserTagUpsertWithWhereUniqueNestedInput {
  where: UserTagWhereUniqueInput
  update: UserTagUpdateDataInput
  create: UserTagCreateInput
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

export interface TagUpdateOneRequiredInput {
  create?: TagCreateInput
  connect?: TagWhereUniqueInput
  update?: TagUpdateDataInput
  upsert?: TagUpsertNestedInput
}

export interface SessionWhereUniqueInput {
  id?: ID_Input
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput
  create: UserCreateInput
}

export interface TagWhereUniqueInput {
  id?: ID_Input
  name?: String
}

export interface TagUpsertNestedInput {
  update: TagUpdateDataInput
  create: TagCreateInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
}

export interface ProfileCreateInput {
  userId: Int
  description?: String
  coins?: Int
  tags?: UserTagCreateManyInput
  session?: SessionCreateManyInput
  question?: QuestionCreateManyInput
}

export interface TagUpdateInput {
  name?: String
}

export interface UserTagCreateManyInput {
  create?: UserTagCreateInput[] | UserTagCreateInput
  connect?: UserTagWhereUniqueInput[] | UserTagWhereUniqueInput
}

export interface SessionUpdateInput {
  type?: String
}

export interface UserTagCreateInput {
  user: UserCreateOneInput
  tag: TagCreateOneInput
}

export interface TagUpsertWithWhereUniqueNestedInput {
  where: TagWhereUniqueInput
  update: TagUpdateDataInput
  create: TagCreateInput
}

export interface UserCreateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
}

export interface TagUpdateManyInput {
  create?: TagCreateInput[] | TagCreateInput
  connect?: TagWhereUniqueInput[] | TagWhereUniqueInput
  disconnect?: TagWhereUniqueInput[] | TagWhereUniqueInput
  delete?: TagWhereUniqueInput[] | TagWhereUniqueInput
  update?: TagUpdateWithWhereUniqueNestedInput[] | TagUpdateWithWhereUniqueNestedInput
  upsert?: TagUpsertWithWhereUniqueNestedInput[] | TagUpsertWithWhereUniqueNestedInput
}

export interface UserCreateInput {
  username: String
  email: String
  uid?: String
  tags?: TagCreateOneInput
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

export interface TagCreateOneInput {
  create?: TagCreateInput
  connect?: TagWhereUniqueInput
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

export interface TagUpdateDataInput {
  name?: String
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

export interface SessionCreateManyInput {
  create?: SessionCreateInput[] | SessionCreateInput
  connect?: SessionWhereUniqueInput[] | SessionWhereUniqueInput
}

export interface ProfileWhereUniqueInput {
  id?: ID_Input
}

export interface SessionCreateInput {
  type: String
}

export interface QuestionWhereUniqueInput {
  id?: ID_Input
}

export interface QuestionCreateManyInput {
  create?: QuestionCreateInput[] | QuestionCreateInput
  connect?: QuestionWhereUniqueInput[] | QuestionWhereUniqueInput
}

export interface UserTagUpdateInput {
  user?: UserUpdateOneRequiredInput
  tag?: TagUpdateOneRequiredInput
}

export interface QuestionCreateInput {
  userId: String
  coins: Int
  active?: Boolean
  chat: ChatType
  tags?: TagCreateManyInput
}

export interface TagUpdateWithWhereUniqueNestedInput {
  where: TagWhereUniqueInput
  data: TagUpdateDataInput
}

export interface TagCreateManyInput {
  create?: TagCreateInput[] | TagCreateInput
  connect?: TagWhereUniqueInput[] | TagWhereUniqueInput
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
  tags_every?: TagWhereInput
  tags_some?: TagWhereInput
  tags_none?: TagWhereInput
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
  tags?: TagWhereInput
}

export interface UserTagUpdateManyInput {
  create?: UserTagCreateInput[] | UserTagCreateInput
  connect?: UserTagWhereUniqueInput[] | UserTagWhereUniqueInput
  disconnect?: UserTagWhereUniqueInput[] | UserTagWhereUniqueInput
  delete?: UserTagWhereUniqueInput[] | UserTagWhereUniqueInput
  update?: UserTagUpdateWithWhereUniqueNestedInput[] | UserTagUpdateWithWhereUniqueNestedInput
  upsert?: UserTagUpsertWithWhereUniqueNestedInput[] | UserTagUpsertWithWhereUniqueNestedInput
}

export interface QuestionUpdateInput {
  userId?: String
  coins?: Int
  active?: Boolean
  chat?: ChatType
  tags?: TagUpdateManyInput
}

export interface UserUpdateDataInput {
  username?: String
  email?: String
  uid?: String
  tags?: TagUpdateOneInput
}

export interface UserUpdateOneRequiredInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateDataInput
  upsert?: UserUpsertNestedInput
}

export interface UserTagUpdateDataInput {
  user?: UserUpdateOneRequiredInput
  tag?: TagUpdateOneRequiredInput
}

export interface UserTagUpdateWithWhereUniqueNestedInput {
  where: UserTagWhereUniqueInput
  data: UserTagUpdateDataInput
}

export interface QuestionUpsertWithWhereUniqueNestedInput {
  where: QuestionWhereUniqueInput
  update: QuestionUpdateDataInput
  create: QuestionCreateInput
}

export interface UserTagWhereUniqueInput {
  id?: ID_Input
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
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
}

export interface QuestionUpdateDataInput {
  userId?: String
  coins?: Int
  active?: Boolean
  chat?: ChatType
  tags?: TagUpdateManyInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface UserPreviousValues {
  id: ID_Output
  username: String
  email: String
  uid?: String
}

export interface Question extends Node {
  id: ID_Output
  userId: String
  tags?: Tag[]
  coins: Int
  active?: Boolean
  chat: ChatType
}

export interface QuestionSubscriptionPayload {
  mutation: MutationType
  node?: Question
  updatedFields?: String[]
  previousValues?: QuestionPreviousValues
}

export interface BatchPayload {
  count: Long
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

export interface AggregateUser {
  count: Int
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

export interface AggregateTag {
  count: Int
}

export interface Profile extends Node {
  id: ID_Output
  userId: Int
  tags?: UserTag[]
  description?: String
  coins?: Int
  session?: Session[]
  question?: Question[]
}

/*
 * A connection to a list of items.

 */
export interface TagConnection {
  pageInfo: PageInfo
  edges: TagEdge[]
  aggregate: AggregateTag
}

export interface Session extends Node {
  id: ID_Output
  type: String
  createdAt: DateTime
}

/*
 * An edge in a connection.

 */
export interface UserTagEdge {
  node: UserTag
  cursor: String
}

export interface QuestionPreviousValues {
  id: ID_Output
  userId: String
  coins: Int
  active?: Boolean
  chat: ChatType
}

export interface AggregateSession {
  count: Int
}

export interface ProfileSubscriptionPayload {
  mutation: MutationType
  node?: Profile
  updatedFields?: String[]
  previousValues?: ProfilePreviousValues
}

/*
 * A connection to a list of items.

 */
export interface SessionConnection {
  pageInfo: PageInfo
  edges: SessionEdge[]
  aggregate: AggregateSession
}

export interface ProfilePreviousValues {
  id: ID_Output
  userId: Int
  description?: String
  coins?: Int
}

/*
 * An edge in a connection.

 */
export interface ProfileEdge {
  node: Profile
  cursor: String
}

export interface Tag extends Node {
  id: ID_Output
  name: String
}

/*
 * A connection to a list of items.

 */
export interface ProfileConnection {
  pageInfo: PageInfo
  edges: ProfileEdge[]
  aggregate: AggregateProfile
}

export interface SessionSubscriptionPayload {
  mutation: MutationType
  node?: Session
  updatedFields?: String[]
  previousValues?: SessionPreviousValues
}

export interface AggregateQuestion {
  count: Int
}

export interface SessionPreviousValues {
  id: ID_Output
  type: String
  createdAt: DateTime
}

/*
 * An edge in a connection.

 */
export interface TagEdge {
  node: Tag
  cursor: String
}

export interface User extends Node {
  id: ID_Output
  username: String
  email: String
  uid?: String
  tags?: Tag
}

/*
 * A connection to a list of items.

 */
export interface UserTagConnection {
  pageInfo: PageInfo
  edges: UserTagEdge[]
  aggregate: AggregateUserTag
}

export interface UserTagSubscriptionPayload {
  mutation: MutationType
  node?: UserTag
  updatedFields?: String[]
  previousValues?: UserTagPreviousValues
}

export interface AggregateProfile {
  count: Int
}

export interface TagPreviousValues {
  id: ID_Output
  name: String
}

export interface TagSubscriptionPayload {
  mutation: MutationType
  node?: Tag
  updatedFields?: String[]
  previousValues?: TagPreviousValues
}

export interface UserTag extends Node {
  id: ID_Output
  user: User
  tag: Tag
}

export interface UserTagPreviousValues {
  id: ID_Output
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

/*
 * An edge in a connection.

 */
export interface SessionEdge {
  node: Session
  cursor: String
}

export interface AggregateUserTag {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface QuestionConnection {
  pageInfo: PageInfo
  edges: QuestionEdge[]
  aggregate: AggregateQuestion
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

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
Raw JSON value
*/
export type Json = any

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

export type DateTime = Date | string