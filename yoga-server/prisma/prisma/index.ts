import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    userTags: <T = UserTag[]>(args: { where?: UserTagWhereInput, orderBy?: UserTagOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    users: <T = User[]>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    tags: <T = Tag[]>(args: { where?: TagWhereInput, orderBy?: TagOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    userTag: <T = UserTag | null>(args: { where: UserTagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    user: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    tag: <T = Tag | null>(args: { where: TagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    userTagsConnection: <T = UserTagConnection>(args: { where?: UserTagWhereInput, orderBy?: UserTagOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    usersConnection: <T = UserConnection>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    tagsConnection: <T = TagConnection>(args: { where?: TagWhereInput, orderBy?: TagOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {
    createUserTag: <T = UserTag>(args: { data: UserTagCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createUser: <T = User>(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createTag: <T = Tag>(args: { data: TagCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateUserTag: <T = UserTag | null>(args: { data: UserTagUpdateInput, where: UserTagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateUser: <T = User | null>(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateTag: <T = Tag | null>(args: { data: TagUpdateInput, where: TagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteUserTag: <T = UserTag | null>(args: { where: UserTagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteUser: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteTag: <T = Tag | null>(args: { where: TagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertUserTag: <T = UserTag>(args: { where: UserTagWhereUniqueInput, create: UserTagCreateInput, update: UserTagUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertUser: <T = User>(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertTag: <T = Tag>(args: { where: TagWhereUniqueInput, create: TagCreateInput, update: TagUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyUserTags: <T = BatchPayload>(args: { data: UserTagUpdateInput, where?: UserTagWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyUsers: <T = BatchPayload>(args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyTags: <T = BatchPayload>(args: { data: TagUpdateInput, where?: TagWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyUserTags: <T = BatchPayload>(args: { where?: UserTagWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyUsers: <T = BatchPayload>(args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyTags: <T = BatchPayload>(args: { where?: TagWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    executeRaw: <T = Json>(args: { database?: PrismaDatabase, query: String }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {
    userTag: <T = UserTagSubscriptionPayload | null>(args: { where?: UserTagSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    user: <T = UserSubscriptionPayload | null>(args: { where?: UserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    tag: <T = TagSubscriptionPayload | null>(args: { where?: TagSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  UserTag: (where?: UserTagWhereInput) => Promise<boolean>
  User: (where?: UserWhereInput) => Promise<boolean>
  Tag: (where?: TagWhereInput) => Promise<boolean>
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

const typeDefs = `type AggregateTag {
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

"""Raw JSON value"""
scalar Json

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createUserTag(data: UserTagCreateInput!): UserTag!
  createUser(data: UserCreateInput!): User!
  createTag(data: TagCreateInput!): Tag!
  updateUserTag(data: UserTagUpdateInput!, where: UserTagWhereUniqueInput!): UserTag
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateTag(data: TagUpdateInput!, where: TagWhereUniqueInput!): Tag
  deleteUserTag(where: UserTagWhereUniqueInput!): UserTag
  deleteUser(where: UserWhereUniqueInput!): User
  deleteTag(where: TagWhereUniqueInput!): Tag
  upsertUserTag(where: UserTagWhereUniqueInput!, create: UserTagCreateInput!, update: UserTagUpdateInput!): UserTag!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertTag(where: TagWhereUniqueInput!, create: TagCreateInput!, update: TagUpdateInput!): Tag!
  updateManyUserTags(data: UserTagUpdateInput!, where: UserTagWhereInput): BatchPayload!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyTags(data: TagUpdateInput!, where: TagWhereInput): BatchPayload!
  deleteManyUserTags(where: UserTagWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyTags(where: TagWhereInput): BatchPayload!
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

type Query {
  userTags(where: UserTagWhereInput, orderBy: UserTagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserTag]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  tags(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tag]!
  userTag(where: UserTagWhereUniqueInput!): UserTag
  user(where: UserWhereUniqueInput!): User
  tag(where: TagWhereUniqueInput!): Tag
  userTagsConnection(where: UserTagWhereInput, orderBy: UserTagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserTagConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  tagsConnection(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TagConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Subscription {
  userTag(where: UserTagSubscriptionWhereInput): UserTagSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  tag(where: TagSubscriptionWhereInput): TagSubscriptionPayload
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
  user: UserUpdateOneRequiredInput
  tag: TagUpdateOneRequiredInput
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

export type UserTagOrderByInput =   'id_ASC' |
  'id_DESC' |
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

export type PrismaDatabase =   'default'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export interface UserCreateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
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

export interface TagCreateOneInput {
  create?: TagCreateInput
  connect?: TagWhereUniqueInput
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput
  create: UserCreateInput
}

export interface TagCreateInput {
  name: String
}

export interface TagUpsertNestedInput {
  update: TagUpdateDataInput
  create: TagCreateInput
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

export interface TagUpdateOneInput {
  create?: TagCreateInput
  connect?: TagWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: TagUpdateDataInput
  upsert?: TagUpsertNestedInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
}

export interface UserUpdateDataInput {
  username?: String
  email?: String
  uid?: String
  tags?: TagUpdateOneInput
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

export interface UserUpdateOneRequiredInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateDataInput
  upsert?: UserUpsertNestedInput
}

export interface UserUpdateInput {
  username?: String
  email?: String
  uid?: String
  tags?: TagUpdateOneInput
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

export interface UserCreateInput {
  username: String
  email: String
  uid?: String
  tags?: TagCreateOneInput
}

export interface UserTagCreateInput {
  user: UserCreateOneInput
  tag: TagCreateOneInput
}

export interface UserTagUpdateInput {
  user?: UserUpdateOneRequiredInput
  tag?: TagUpdateOneRequiredInput
}

export interface UserTagWhereUniqueInput {
  id?: ID_Input
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

export interface TagUpdateInput {
  name?: String
}

export interface TagWhereUniqueInput {
  id?: ID_Input
  name?: String
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface TagPreviousValues {
  id: ID_Output
  name: String
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

export interface Tag extends Node {
  id: ID_Output
  name: String
}

export interface BatchPayload {
  count: Long
}

export interface UserTag extends Node {
  id: ID_Output
  user: User
  tag: Tag
}

export interface AggregateTag {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface TagConnection {
  pageInfo: PageInfo
  edges: TagEdge[]
  aggregate: AggregateTag
}

export interface User extends Node {
  id: ID_Output
  username: String
  email: String
  uid?: String
  tags?: Tag
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

export interface UserPreviousValues {
  id: ID_Output
  username: String
  email: String
  uid?: String
}

export interface AggregateUserTag {
  count: Int
}

export interface TagSubscriptionPayload {
  mutation: MutationType
  node?: Tag
  updatedFields?: String[]
  previousValues?: TagPreviousValues
}

export interface UserTagPreviousValues {
  id: ID_Output
}

export interface UserTagSubscriptionPayload {
  mutation: MutationType
  node?: UserTag
  updatedFields?: String[]
  previousValues?: UserTagPreviousValues
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface UserTagConnection {
  pageInfo: PageInfo
  edges: UserTagEdge[]
  aggregate: AggregateUserTag
}

/*
 * An edge in a connection.

 */
export interface TagEdge {
  node: Tag
  cursor: String
}

/*
 * An edge in a connection.

 */
export interface UserTagEdge {
  node: UserTag
  cursor: String
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
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

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