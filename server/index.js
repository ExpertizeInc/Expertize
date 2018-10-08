const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const path = require('path');
const cors = require('cors');
// const OpenTok = require('opentok');

var app = express();
app.use(express.static(path.join(__dirname + '/../client/dist')));
app.use(bodyParser.json());
app.use(cors());

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '/../client/dist/index.html')));
// app.use(express.static(path.join(__dirname + '/../client/dist')));

const port = process.env.PORT || 3001;

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const io = require('socket.io')(server)
io.on('connect', (socket) => {
  console.log('a user connected, id is:', socket.id);
  socket.on('message', (msg) => {
    console.log('received message:', msg);
    io.sockets.emit('outbound', msg);
  });
  socket.on('disconnect', () => console.log('user disconnected'));
});

// const opentok = new OpenTok('46197542', 'b7f3e5f595b2f2e85047e370632074938501d031')




// // 1. The typeDefs defines your GraphQL schema
// // the ! means that field can never be null!

// `
// 2. The resolvers object is the actual implementation of the GraphQL schema
// notice how its structure is identical to the structure of hte type definition inside
// typeDefs : Query.info

// 3. Finally, schema and resolvers are bundled and passed to the GraphQLServer
// which is imported in from graphql-yoga. This tells server what API operations 
// are accepted and how they should be resolved.
// const server = new GraphQLServer
//   typeDefs: '../yoga-server/',
//   resolvers,
//   context:
  
// 

// server.setMaxListeners(() => console.log(`Server is running on http://localhost:4000`))