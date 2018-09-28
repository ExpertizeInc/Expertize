const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config()
const path = require('path');
const cors = require('cors')
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world~~!' };

var app = express();

app.use(express.static(path.join(__dirname + '/../client/dist')));
// app.use(express.static(path.join(__dirname, '/../../node_modules')));
app.use(bodyParser.json())
app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

var port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));