const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const path = require('path');
const cors = require('cors');
const axios = require('axios');
// const OpenTok = require('opentok');
var https = require('https');
var querystring = require('querystring');
const OauthParams = require('./OauthParam.js');

var app = express();
app.use(express.static(path.join(__dirname + '/../client/dist')));
app.use(bodyParser.json());
app.use(cors());
// app.get('/auth/linkedIn', (req, res) => {
//   axios.get('https://www.linkedin.com/oauth/v2/authorization')
//     console.log('HEADERS', req.headers['set-cookie'])
//     console.log('BODY', req.body)
//     console.log('QUERY', req.query)
//     console.log('PARAMS', req.params)
//     console.log('AZAZ')
//   });
//   app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Content-Type', 'application/json');
//     next();
// });

app.get('/linkedin', (req, res) => {
  const { url } = req.query;
  console.log('8/8/88', url)
  axios.post(url)
    .then(d => console.log('PLEASE data'))
    .catch(e => console.error('JOKES err'))
})
// app.get('/linkedIn', (req, res) => {
//   axios.get('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77jrp4h9m6f6yf&redirect_uri=https%3A%2F%2Flocalhost:3001%2Fsignin&state=987654321')
//     .then((data) => {
//       res.send(data);
//       console.log('GOOD', data.rest.client)
//       // axios.post('https://www.linkedin.com/uas/oauth2/accessToken?response_type=code&client_id=77jrp4h9m6f6yf&redirect_uri=https%3A%2F%2Flocalhost:3001%2Fauth%2FlinkedIn&grant_type=authorization_code', { params: { 'access-token': data['set-cookie'] } })
//       // .then(d => console.log('P'))
//       // .catch(e => console.error('errr'))
//     // })
//     .catch((err) => console.error('err from linkedIn', err));
 
// });
// app.get('/home', (req, res) => {

// })


// app.get('/auth', function (req, res) {
//   const handshake = (code, ores) => {

//     //set all required post parameters
//     var data = querystring.stringify({
//         grant_type: "authorization_code",
//         code: code,
//         redirect_uri: OauthParams.redirect_uri,//should match as in Linkedin application setup
//         client_id: OauthParams.client_id,
//         client_secret: OauthParams.client_secret// the secret
//     });
  
//     var options = {
//         host: 'www.linkedin.com',
//         path: '/oauth/v2/accessToken',
//         protocol: 'https:',
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Content-Length': Buffer.byteLength(data)
//         }
//     };
//     // console.log(options);
//     var req = https.request(options, (res) => {
//          var data = '';
//         res.setEncoding('utf8');
//         res.on('data', (chunk) => {
//             data += chunk;
//         });
//         res.on('end', () => {
//           console.log('POPOPO', data)
//         });
//         req.on('error', (e) => {
//             console.log("problem with request: " + e.message);
//         });
        
//     });
//     console.log('LINKED IN INFO:','HEADERS', data)
//     req.write(data);
//     res.send(data);
//   }
  // This is the redirect URI which linkedin will call to and provide state and code to verify
  /**
   *
   * Attached to the redirect_uri will be two important URL arguments that you need to read from the request:
   code — The OAuth 2.0 authorization code.
   state — A value used to test for possible CSRF attacks.
   */
  // console.log("auth route - Request object received from Linkedin", req);

  // //TODO: validate state here
  // var error = req.query.error;
  // var error_description = req.query.error_description;
  // var state = req.query.state;
  // var code = req.query.code;
  // if (error) {
  //     next(new Error(error));
  // }
  // /**
  //  *
  //  * The code is a value that you will exchange with LinkedIn for an actual OAuth 2.0 access
  //  * token in the next step of the authentcation process.  For security reasons, the authorization code
  //  * has a very short lifespan and must be used within moments of receiving it - before it expires and
  //  * you need to repeat all of the previous steps to request another.
  //  */
  // //once the code is received handshake back with linkedin to send over the secret key
  // handshake(req.query.code, res);
// })


app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '/../client/dist/index.html')));


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

