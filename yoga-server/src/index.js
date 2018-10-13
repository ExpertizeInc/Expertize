const { GraphQLServer } = require('graphql-yoga');
const { Prisma } =  require('../db/generated');
// import { permissions } from './permissions'; 
// import { getUserIdFromRequest, getAuthToken } from './permissions/my-utils';
require('dotenv/config')
// const express = require('express');
// const path = require('path');

const resolvers = {
  Query: {
    user: (parent, {uid}, ctx, info) => {
      console.log('NOOOO', uid)
      return ctx.prisma.query.getUserIdFromRequest({ where: {uid} }, info);
    },
    users: (_, __, ctx, info) => {
      return ctx.prisma.query.users({}, info);
    },
    questions: (_, __, ctx, info) => {
      return ctx.prisma.query.questions({}, info);
    },
    questionsByUser: (_, { username }, ctx, info) => {
      return ctx.prisma.query.questions({ where: { user: { username }} }, info);
    },
    tags: (_, __, ctx, info) => {
      return ctx.prisma.query.tags({}); 
    },
    sessions: (_, __, ctx, info) => {
      return ctx.prisma.query.sessions({});
    },
    sessionsWhereUnacceptedPupil: (_, { username }, ctx, info) => {
      return ctx.prisma.query.sessions({ where: { accepted: null, completed: null, pupil: { username } }}, info);
    },
    // sessionsWhereAcceptedExpert: (_, { username }, ctx, info) => {
    //   return ctx.prisma.query.sessions({ where: { accepted: true, completed: null, expert: { username } }}, info);
    // },
    // sessionsWhereRejectedExpert: (_, { username }, ctx, info) => {
    //   return ctx.prisma.query.sessions({ where: { accepted: false, completed: null, expert: { username } }}, info);
    // },
    sessionsForExpert: (_, { username }, ctx, info) => {
      return ctx.prisma.query.sessions({ where: { accepted: !null , completed: null, expert: { username } }}, info);
    }
  },
  Mutation: {
    createUser: (_, { username, email, uid }, ctx, info) => {
      console.log('WHYYY', username)
      return ctx.prisma.mutation.createUser({ data: { username, email, uid } }, info);
    },
    createQuestion: (_, { user, tags, description, coins, title, text, audio, video, duration }, ctx, info) => {
      return ctx.prisma.mutation.createQuestion({
        data: { user, tags: { set: tags }, description, coins, title, text, audio, video, duration }
      }, info);
    },
    updateUser: (_, { email, uid, description, coins, inSession, dailyClaimed, debt, online, id, tags, username, image }, ctx, info) => {
      return ctx.prisma.mutation.updateUser({
        data: { email, uid, description, coins, inSession, dailyClaimed, debt, online, tags: { set: tags }, username, image },
        where: { id } 
      }, info);
    },
    updateManyUsers: (_, __, ctx, info) => {
      return ctx.prisma.mutation.updateManyUsers({ data: { dailyClaimed: false }})
    },
    createSession: (_, { type, question, expert, pupil, accepted, duration, completed, startedAt, endedAt}, ctx, info) => {
      return ctx.prisma.mutation.createSession({
        data: { type, question, expert, pupil, duration, accepted, completed, startedAt, endedAt }
      });
    },
    updateSession: (_, { id, accepted, completed, startedAt, endedAt}, ctx, info) => {
      return ctx.prisma.mutation.updateSession({
        data: { accepted, completed, startedAt, endedAt },
        where: { id }
      });
    }
  }
}


const server = new GraphQLServer({
  typeDefs: 'schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
    typeDefs: 'src/schema.graphql',
     endpoint: process.env.PRISMA_ENDPOINT,
     secret: process.env.PRISMA_SECRET,
     debug: true
    })
  })
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