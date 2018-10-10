const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const path = require('path');
const cors = require('cors');
const axios = require('axios');
// const OpenTok = require('opentok');

var app = express();
app.use(express.static(path.join(__dirname + '/../client/dist')));
app.use(bodyParser.json());
app.use(cors());
app.get('/auth/linkedIn', (req, res) => {
  // axios.get('https://www.linkedin.com/oauth/v2/authorization')
    // console.log('HEADERS', req.headers['set-cookie'])
    // console.log('BODY', req.body)
    // console.log('QUERY', req.query)
    // console.log('PARAMS', req.params)
    console.log('AZAZ')
  });
app.get('/linkedIn', (req, res) => {
  axios.get('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77jrp4h9m6f6yf&redirect_uri=https%3A%2F%2Flocalhost:3001%2Fauth%2FlinkedIn&state=987654321')
    .then((data) => {
      console.log('00', data)
      axios.post('https://www.linkedin.com/uas/oauth2/accessToken?response_type=code&client_id=77jrp4h9m6f6yf&redirect_uri=https%3A%2F%2Flocalhost:3001%2Fauth%2FlinkedIn&grant_type=authorization_code', { params: { 'access-token': data['set-cookie'] } })
      .then(d => console.log('P'))
      .catch(e => console.error('errr'))
    })
    .catch((err) => console.error('err from linkedIn', err));
})
// app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '/../client/dist/index.html')));


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

