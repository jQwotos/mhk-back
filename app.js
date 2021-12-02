// App

const express = require('express');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io')
const { isDevEnv, servName, devPort } = require('./utils/utils');

// Setup CORS.
const whiteList = [
  process.env.CLIENT_URL_HTTP,
  process.env.CLIENT_URL_HTTPS
];
const corsOpts = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`Origin: ${origin} not allowed by CORS.`);
      callback(new Error(`Origin: ${origin} not allowed by CORS.`));
    };
  },
  credentials: true
};

// Setup server and io.
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: true,
  origins: [
    process.env.CLIENT_URL_HTTP,
    process.env.CLIENT_URL_HTTPS
  ]
});

// Send io to file where all of the io logic is.
require('./io/io')(io);

// Routes //

const lobbyRoutes = require('./routes/lobby-rts')(io);
const userRoutes = require('./routes/user-rts');
const adminRoutes = require('./routes/admin-rts');

// Middleware //

app.use(cors(corsOpts));
app.use(express.json());

// Required setting for cookies to work with CORS.
if (!isDevEnv) {
  app.set('trust proxy', 1);
}

app.use('/api/user', userRoutes);
app.use('/api/lobby', lobbyRoutes);
app.use('/api/admin', adminRoutes);

// This will execute if any middleware before it throws an error.
app.use((error, req, res, next) => {
  // Check if a response has already been sent.
  if (res.headerSent) {
    return next(error);
  };
  // Send error code attached to the error object that was recieved, if any,
  // or else send error code 500.
  res.status(error.code || 500);
  // Send a message to the client to show to the user.
  res.json({message: error.message || 'An unknown error occurred!'});
});

server.listen(
  process.env.PORT || devPort,
  console.log(`${servName} listening on port ${process.env.PORT || devPort}`)
);
