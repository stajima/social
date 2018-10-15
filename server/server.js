const http = require('http');
const socket = require('socket.io');
const app = require('./app');

const server = http.Server(app);
const io = socket(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


const PORT = process.env.PORT || 8000;
server.listen(PORT);
