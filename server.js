// npm init
// npm i express dotenv morgan axios socket.io
// npm install sentiment
// npm install natural
// npm install keyword-extractor
// npm install redis response-time
// npm install aws-sdk

const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const http = require('http');

// specify config path
dotenv.config({ path: './config/config.env' });

// initiliase express app
const app = express();

// allow us to use the bodyParser middleware
app.use(express.json());

// logger for development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// mount the router
app.use('/api/v1/mashup', require('./routes/api'));

// <=====================>
// <===PRODUCTION ONLY===>
// <=====================>
if (process.env.NODE_ENV === 'production') {
  // when in production the client/build folder will be our static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Media Analysis Server listening on ${port}`));
