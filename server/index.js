const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const path = require('path');
const cors = require('cors');
// const OpenTok = require('opentok');

var app = express();

app.use(express.static(path.join(__dirname + '/../client/dist')));
app.use(bodyParser.json())
app.use(cors())

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});
var port = process.env.PORT || 3001;

var server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const io = require('socket.io')(server)
io.on('connect', (socket) => {
  console.log('a user connected, id is:',socket.id)
  // socket.on('connectToUser', )s
  socket.on('message', (msg) => {
    console.log('received message:', msg)
    io.sockets.emit('outbound', msg)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// const opentok = new OpenTok('46197542', 'b7f3e5f595b2f2e85047e370632074938501d031')

