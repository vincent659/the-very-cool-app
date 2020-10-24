// npm init
// npm i express dotenv morgan axios socket.io
// npm install sentiment
// npm install natural
// npm install keyword-extractor
// npm install redis response-time
// npm install aws-sdk
// npm install query-string

const dotenv = require('dotenv');
const express = require('express');
const responseTime = require('response-time');
const path = require('path');
const morgan = require('morgan');
const http = require('http');

const socketio = require('socket.io');

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

// use response-time as a middleware
app.use(responseTime());

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

/* TODO: Socket.IO CHANGES */
// http has it under the hood of express, but we need to access it directly due to the use of socket.io
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
// app.listen(port, console.log(`Media Analysis Server listening on ${port}`));

server.listen(port, () =>
  console.log(`Twitter Analysis Server listening on ${port}`)
);
