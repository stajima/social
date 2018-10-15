const http = require('http');
const io = require('socket.io')(http);
const app = require('./app');

const server = http.Server(app);
io.on('connection', (socket) => {
  console.log('a user connected');
});


const PORT = process.env.PORT || 8000;
server.listen(PORT);
