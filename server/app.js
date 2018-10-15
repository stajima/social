const express = require('express');
const path = require('path');
const { getUserData } = require('./database');

const app = express();
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

app.delete('/api/users/:id', (req, res) => {
  console.log('delete::');

});

module.exports = app;
