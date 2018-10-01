import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';
// import { User } from './generated';
// import { prisma } from './generated/prisma';

const resolvers = {
  Query: {
    user: (_, {id}, ctx: {prisma: Prisma}) => {
      // const { prisma } = context;
      console.log('1')
      // console.log('2',   prisma)
      return ctx.prisma.query.user({ where: {id} });
    }
  },
  User: {
    tags: async (user, args, ctx: { prisma: Prisma}) => {
      const userWithTags = await ctx.prisma.query.user({
        where: {
          id: user.id
        }
      }, 
      // check prisma-binding docs for correct syntax
      // `{ 
      //   tags { 
      //     tag {
      //       name
      //     }
      //   }
      // }`);
      )
      return userWithTags.tags.map(tag => tag.name);
    }
  }
  // Mutation: {
  //   createDraft: (_, args, context, info) => {
  //     // ...
  //   },
  //   publish: (_, args, context, info) => {
  //     // ...
  //   },
  //   deletePost: (_, args, context, info) => {
  //     // ...
  //   },
  //   signup: (_, args, context, info) => {
  //     // ...
  //   }
  // }
}

const server = new GraphQLServer({
  typeDefs: 'yoga-server/src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: 'yoga-server/src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466',
    }),
  }),
})
server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))