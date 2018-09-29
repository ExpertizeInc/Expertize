const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers.js')

const typeDefs = `
  type User {
    id: Int!
    username: String
    email: String
    firebaseId: String
    linkedEmail: String
    linkedId: String
    tags: [UserTag]
  }

  type UserTag {
    id: Int!
    user: User
    tag: Tag
  }

  type Tag {
    id: Int
    name: String
  }

  type Query {
    user(id: Int!): User
    tags: [Tag]
  }
`
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema