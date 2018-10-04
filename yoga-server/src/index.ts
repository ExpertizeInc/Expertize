import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from '../prisma/generated/prisma';
// import { User } from '../prisma/prisma';
import { permissions } from './permissions'; 
import { createTextChangeRange } from 'typescript';
import { getUserIdFromRequest, getAuthToken } from './permissions/my-utils';
const dotenv = require('dotenv').config();

const resolvers = {
  Query: {
    user: (_, {id}, ctx: {prisma: Prisma}) => {
      // const { prisma } = context;
      return ctx.prisma.query.user({ where: {id} });
    },
    users: (_, __, ctx: {prisma: Prisma}, ____) => {
      return ctx.prisma.query.users({})
    },
    questions: (_, __, ctx, ____) => {
      return ctx.prisma.query.questions({});
    }
  },
  // User: {
  //   tags: async (user: User, args, ctx: { prisma: Prisma}) => {
  //     const userWithTags = await ctx.prisma.query.user({
  //       where: {
  //         id: user.id
  //       }
  //     })
  //     return userWithTags
  //   }
  // },
  Mutation: {
      createUser: (parent, args, ctx: { prisma: Prisma }, info) => {
        console.log(args, 'args inside createUser mutation')
        return ctx.prisma.mutation.createUser({data: { username: args.username, email: args.email, uid: args.uid }});
      },
<<<<<<< HEAD
      createQuestion: async (parent, args, ctx, info) => {
        console.log(args);
        // const userId = await ctx.prisma.query.user({where: { uid: args.id}});
        return ctx.prisma.mutation.createQuestion({data: { userId: args.userId, tag: args.tag, description: args.description, chat: args.chat, coins: args.coins, title: args.title }})
      }
=======
      updateUser(parent, args, ctx: { prisma: Prisma }, info) {
        return ctx.prisma.mutation.updateUser({data: { email: args.email, uid: args.uid, description: args.description, coins:args.coins }, where: { id: args.id}})
      },

>>>>>>> dev

      // login: async (_, args: { email, password }, ctx: { prisma: Prisma}) => {
      //   const { uid } = getUidForValidCredentials({ email, password });
      //   // need to call firebase and grab private identifier 
      //   if (uid) {
      //     const user = await ctx.prisma.query.user({where: { uid }});
      //     return {
      //       error: null,
      //       token: getAuthToken(user)
      //     }
      //   }
      // }
    // signup: (_, args, context, info) => {
      
    // },

  }
}
console.log(process.env.PRISMA_SECRET)


const server = new GraphQLServer({
  typeDefs: 'yoga-server/src/schema.graphql',
  resolvers,
  context: async req => {
    const userId = getUserIdFromRequest(req);
    let user;
    const prisma = new Prisma({
     endpoint: process.env.PRISMA_ENDPOINT,
    //  endpoint: 'http://localhost:4467',
     secret: process.env.PRISMA_SECRET
    })
    if (userId) {
      user = await prisma.query.user({ where: { id: userId }});
    }
    return {
      user,
      ...req,
      prisma
  };
  }
})
server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))