const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const path = require('path');
const cors = require('cors')
const schema = require('../database/schema.js')
const root = require('../database/resolvers.js')
const graphqlHTTP = require('express-graphql');

var app = express();

app.use(express.static(path.join(__dirname + '/../client/dist')));
app.use(bodyParser.json())
app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});
var port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));