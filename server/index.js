const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const path = require('path');
const cors = require('cors');
const axios = require('axios');
// const OpenTok = require('opentok');
const OauthParams = require('./OauthParams.js');
const cookieParser = require('cookie-parser');
const app = express();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   // res.header('Content-Type', 'application/json', 'application/x-www-form-urlencoded');
//   next();
// });
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const passport = require('passport');

passport.serializeUser((user, done) => {
  // console.log("serialize user: ", user);
  done(null, {id: 1})
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
  // db.collection('users').find(id, function(err, user) {
      done(null, id);
  // });
});
app.use(express.static(path.join(__dirname + '/../client/dist')));
// app.use(express.logger())
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LinkedInStrategy({
  clientID: OauthParams.client_id,
  clientSecret: OauthParams.client_secret,
  callbackURL: OauthParams.redirect_uri,
  scope: ['r_emailaddress', 'r_basicprofile'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  console.log('accessToken', accessToken)
 
  req.profile = profile;
  console.log('req callback:', req.profile);
  // console.log('refreshToken', refreshToken);
  // asynchronous verification, for effect...
  process.nextTick(() => {
    // console.log('PROFILE', profile)
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.
    return done(null, req.profile);
  });
}));

app.get('/auth/linkedin',
  passport.authenticate('linkedin'),
  (req, res) => {
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
    // res.send(req.profile)
    console.log('12323123123')
  });

  app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
    failureRedirect: '/login'
  }), (req, res) => {
    console.log('FUCK', req.user, req.profile)
    res.send('MESSAGE')
  });

// app.get('/auth/linkedin', (req, res) => {
  // let data = {  grant_type: "authorization_code", code: req.query.code,  client_id: "77jrp4h9m6f6yf", redirect_uri: "http%3A%2F%2Flocalhost%3A3001%2F", client_secret: "TQyMsJWbwxSuBpum" };
  // axios.post(url, {}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
  //   .then(data => console.log('DDRR', data))
  //   .catch(e => console.error('LOSER', e))
  // axios.post('https://www.linkedin.com/oauth/v2/accessToken', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': '*/*', 'bearer_auth': false}})
  //   .then(balls => console.log('BALLS', balls))
  //   .catch(err => console.error('FUCK', err))
    // const options = {
    //   method: 'POST',
    //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
    //   data,
    //   url: 'https://www.linkedin.com/oauth/v2/accessToken',
    // };
    // axios(options).then(d=>console.log('POP', d)).catch(e=>console.error('EEE', e))

  // axios.get('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77jrp4h9m6f6yf&redirect_uri=https%3A%2F%2Flocalhost:3001%2F&state=321&scope=r_basicprofile')
  // .then(balls => console.log('BALLS', balls))
  // .catch(err => console.error('FUCK', err))


// })




app.get('/*', (req, res) => res.redirect('/'));


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
