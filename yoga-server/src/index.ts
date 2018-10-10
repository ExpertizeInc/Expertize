import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from '../prisma/generated';
import { permissions } from './permissions'; 
import { createTextChangeRange } from 'typescript';
import { getUserIdFromRequest, getAuthToken } from './permissions/my-utils';
import { node } from 'prop-types';
const dotenv = require('dotenv').config();
// const express = require('express');
// const path = require('path');

const resolvers = {
  Query: {
    user: (_, {uid}, ctx: {prisma: Prisma}) => {
      return ctx.prisma.query.user({ where: {uid} });
    },
    users: (_, __, ctx: {prisma: Prisma}, ____) => {
      return ctx.prisma.query.users({});
    },
    questions: (_, __, ctx, ____) => {
      return ctx.prisma.query.questions({});
    },
    questionsByUser: (_, {userId}, ctx: {prisma: Prisma}) => {
      return ctx.prisma.query.questions({ where: {userId} });
    },
    tags: (_, __, ctx: { prisma: Prisma }, ____) => {
      return ctx.prisma.query.tags({});
    },
    sessions: (_,__,ctx, ____) => {
      return ctx.prisma.query.sessions({});
    },
  },
  Mutation: {
    createUser: (_, { username, email, uid }, ctx: { prisma: Prisma }, info) => {
      return ctx.prisma.mutation.createUser({ data: { username, email, uid } });
    },
    createQuestion: (_, { userId, username, tags, description, coins, title, text, audio, video, duration }, ctx, info) => {
      return ctx.prisma.mutation.createQuestion({
        data: { userId, username, tags: { set: tags }, description, coins, title, text, audio, video, duration }
      });
    },
    updateUser: (_, { email, uid, description, coins, id, tags }, ctx: { prisma: Prisma }, info) => {
      return ctx.prisma.mutation.updateUser({
        data: { email, uid, description, coins, tags: { set: tags } },
        where: { id } 
      });
    },
    createSession: (_, { type, expert, pupil, accepted, duration, completed, startedAt, endedAt}, ctx, info) => {
      return ctx.prisma.mutation.createSession({
        data: { type, expert, pupil, duration, accepted, completed, startedAt, endedAt }
      });
    },
    updateSession: (_, { id, accepted, completed, startedAt, endedAt}, ctx, info) => {
      return ctx.prisma.mutation.updateSession({
        data: { accepted, completed, startedAt, endedAt },
        where: { id }
      });
    }
  },
  Subscription: {
    subscribeToSessionAsExpert: (_, { username }, ctx, info) => {
      return ctx.prisma.subscription.session({ 
        where: { 
          mutation_in: ['UPDATED'],
          node : {
            expert: {username: username},
            accepted: false
          }
        } 
      }  
      )
    }
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
     secret: process.env.PRISMA_SECRET,
     debug: true
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
});

// const io = require('socket.io')(server)
// io.on('connect', (socket) => {
//   console.log('a user connected, id is:', socket.id);
//   socket.on('message', (msg) => {
//     console.log('received message:', msg);
//     io.sockets.emit('outbound', msg);
//   });
//   socket.on('disconnect', () => console.log('user disconnected'));
// });


// server.express.use(express.static(path.join(__dirname + '/../../client/dist')));
server.start(() => console.log(`GraphQL server is running on http://localhost:4000`));