const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const path = require('path');
const cors = require('cors');
const axios = require('axios');
// const OpenTok = require('opentok');
const OauthParams = require('./OauthParam.js');
const request = require('request');
var app = express();
app.use(express.static(path.join(__dirname + '/../client/dist')));
app.use(bodyParser.json());
app.use(cors());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Content-Type', 'application/json', 'application/x-www-form-urlencoded');
    next();
  });

app.get('/linkedin', (req, res) => {
  let { url } = req.query;
  console.log('8/8/88', url)
  let data = {  grant_type: "authorization_code", code: req.query.code,  "client_id": "77jrp4h9m6f6yf", redirect_uri: "http%3A%2F%2Flocalhost%3A3001%2F", client_secret: "TQyMsJWbwxSuBpum" };
  // axios.post(url, {}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
  //   .then(data => console.log('DDRR', data))
  //   .catch(e => console.error('LOSER', e))
  axios.post('https://www.linkedin.com/oauth/v2/accessToken', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': '*/*'}})
    .then(balls => console.log('BALLS', balls))
    .catch(err => console.error('FUCK', err))

  // axios.post('https://www.linkedin.com/oauth/v2/accessToken/', {data: {client_id: "77jrp4h9m6f6yf"}})
  // .then(balls => console.log('BALLS', balls))
  // .catch(err => console.error('FUCK', err))
})




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
    console.log('this is sock nickname', data)
    console.log('this is the sock-id', socket.id, data)
    console.log('user', data)
    // console.log('this is the users object', users)
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
