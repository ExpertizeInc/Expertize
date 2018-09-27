import { makeExecutableSchema } from 'graphql-tools';

const typedefs = `
  type User {
    id: Int!
    username: String
    email: String
    firebaseUid: String
    linkedEmail: String
    linkedId: String
  }
`

const resolvers = {

}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});