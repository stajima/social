const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { getUserData, addNewTodo, deleteTodo } = require('./database');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api/users/:id', (req, res, next) => {
  console.log('get::');
  getUserData(req.params.id, (error, data) => {
    if (error) {
      next(error);
    }
    res.send(data).end();
  });
});

app.post('/api/users/:id', (req, res, next) => {
  console.log('POST todo::');
  addNewTodo(req.params.id, req.body, next);
}, (req, res) => {
  console.log('no errors');
  res.status(201).end();
});

app.delete('/api/users/:userId/todos/:todoId', (req, res, next) => {
  console.log('delete::');
  deleteTodo(req.params.userId, req.params.todoId, next);
}, (req, res) => {
  console.log('no errors');
  res.end();
});

module.exports = app;
