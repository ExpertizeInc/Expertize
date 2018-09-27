const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config()
const path = require('path');
const cors = require('cors')


var app = express();

app.use(express.static(path.join(__dirname + '/../../client/dist')));
app.use(express.static(path.join(__dirname, '/../../node_modules')));
app.use(bodyParser.json())
app.use(cors())

var port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));