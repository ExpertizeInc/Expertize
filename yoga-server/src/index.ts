import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from '../prisma/generated';
// import { User } from '../prisma/prisma';
import { permissions } from './permissions'; 
import { createTextChangeRange } from 'typescript';
import { getUserIdFromRequest, getAuthToken } from './permissions/my-utils';
const dotenv = require('dotenv').config();

const resolvers = {
  Query: {
    user: (_, {uid}, ctx: {prisma: Prisma}) => {
      // const { prisma } = context;
      return ctx.prisma.query.user({ where: {uid} });
    },
    users: (_, __, ctx: {prisma: Prisma}, ____) => {
      return ctx.prisma.query.users({})
    },
    questions: (_, __, ctx, ____) => {
      return ctx.prisma.query.questions({});
    },
    questionsByUser: (_, {userId}, ctx: {prisma: Prisma}) => {
      return ctx.prisma.query.questions({ where: {userId} });
    },
    tags: (_, __, ctx: { prisma: Prisma }, ____) => {
      return ctx.prisma.query.tags({});
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
    createUser: (parent, { username, email, uid }, ctx: { prisma: Prisma }, info) => {
      console.log(username, 'args inside createUser mutation')
      return ctx.prisma.mutation.createUser({ data: { username, email, uid } });
    },
    createQuestion: async (parent, { userId, username, tag, description, coins, title, text, audio, video, duration }, ctx, info) => {
      // const userId = await ctx.prisma.query.user({where: { uid: args.id}});
      return ctx.prisma.mutation.createQuestion({
        data: { userId, username, tag, description, coins, title, text, audio, video, duration }
      })
    },
    updateUser(parent, { email, uid, description, coins, id }, ctx: { prisma: Prisma }, info) {
      return ctx.prisma.mutation.updateUser({
        data: { email, uid, description, coins },
        where: { id } 
      })
    },


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

const server = new GraphQLServer({
  typeDefs: 'yoga-server/src/schema.graphql',
  resolvers,
  context: async req => {
    const userId = getUserIdFromRequest(req);
    let user;
    const prisma = new Prisma({
     endpoint: process.env.PRISMA_ENDPOINT,
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