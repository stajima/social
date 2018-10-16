const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const { getUserData, addNewTodo, deleteTodo } = require('./database');


const app = express();
const server = http.Server(app);
const io = socketIO(server);
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

const activeUsers = {};

io.on('connection', (socket) => {
  const { userId, friends } = socket.handshake.query;
  activeUsers[userId] = JSON.parse(friends);
});

app.get('/api/users/:id', (req, res, next) => {
  getUserData(req.params.id, (error, data) => {
    if (error) {
      next(error);
    }
    res.send(data).end();
  });
});

app.post('/api/users/:id', (req, res, next) => {
  addNewTodo(req.params.id, req.body, next);
}, (req, res) => {
  io.emit('refresh', req.params.id);
  res.status(201).end();
});

app.delete('/api/users/:userId/todos/:todoId', (req, res, next) => {
  deleteTodo(req.params.userId, req.params.todoId, next);
}, (req, res) => {
  io.emit('refresh', req.params.userId);
  res.end();
});


const PORT = process.env.PORT || 8000;
server.listen(PORT);
