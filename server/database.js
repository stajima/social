const mongoose = require('mongoose');

mongoose.connect('mongodb://vue-todo:vue-todo1!@ds035498.mlab.com:35498/vue-todo', { useNewUrlParser: true });

const User = mongoose.model('User', {
  id: Number,
  name: String,
  count: Number,
  todos: [
    { id: Number, text: String },
  ],
  friends: [
    { id: Number, name: String },
  ],
});

// const addNewTodo = (data) => {

// };

// const deleteTodo = (userId, todoId) => {

// };

const getUserData = (userId, callback) => {
  User.findOne({ id: userId }, (error, res) => {
    if (error) {
      callback(error);
    } else {
      callback(null, res);
    }
  });
};

module.exports = {
  // addNewTodo,
  // deleteTodo,
  getUserData,
};
