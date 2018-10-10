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

var users = {};

io.on('connect', (socket) => {
  socket.on("new user", function(data) {
    console.log('name of new user',data)
    socket.nickname = data;
    users[socket.nickname] = socket;
    console.log('this is the sock-id', socket.id, data)
    updateNicknames(); 
  });
  console.log('a user connected, id is:',socket.id)
  socket.on('message', (data) => {
    console.log('received message:', data.text, 'target:',data.target, 'to:', socket.nickname)
    var nickname = socket.nickname
    var targetSock = users[data.target]
    targetSock.emit('outbound', {msg:data.text, from:nickname})
  })
  
  socket.on("disconnect", function(data) {
    console.log('user disconnected');
    delete users[socket.nickname];
    updateNicknames();
  });

  socket.on('get username', () => {
    updateNicknames()
  })

  function updateNicknames() {
    io.sockets.emit('usernames', Object.keys(users))
  }
});

// const opentok = new OpenTok('46197542', 'b7f3e5f595b2f2e85047e370632074938501d031')
