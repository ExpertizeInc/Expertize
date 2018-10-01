import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';
// import { User } from '../generated';
// import { prisma } from './generated/prisma';
import { permissions } from './permissions'; 
import { createTextChangeRange } from 'typescript';

const resolvers = {
  Query: {
    user: (_, {id}, ctx: {prisma: Prisma}) => {
      // const { prisma } = context;
      console.log('1')
      // console.log('2',   prisma)
      return ctx.prisma.query.user({ where: {id} });
    },
    users: (_, __, ctx: {prisma: Prisma}, ____) => {
      return ctx.prisma.query.users();
    }
  },
  User: {
    tags: async (user, args, ctx: { prisma: Prisma}) => {
      const userWithTags = await ctx.prisma.query.user({
        where: {
          id: user.id
        }
      })
      return userWithTags.tags.map(tag => tag.name);
    }
  },
  Mutation: {
      createUser(parent, {username, email, uid}, ctx, info) {
        console.log(parent, 'SADSASDAS')
        return ctx.prisma.mutation.createUser({"data": { username, email, uid}})
      },
    // signup: (_, args, context, info) => {
      
    // }
  }
}

const server = new GraphQLServer({
  typeDefs: 'yoga-server/src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: 'yoga-server/src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466',
    })
  })
})
server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))