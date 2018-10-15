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

const addNewTodo = (userId, newTodoData, callback) => {
  User.findOne({ id: userId }, (error, userData) => {
    if (error) {
      callback(error);
    } else {
      const updatedUserData = {
        count: userData.count + 1,
        todos: [...userData.todos],
      };
      updatedUserData.todos.push({ id: updatedUserData.count, ...newTodoData });
      User.updateOne({ id: userId }, updatedUserData, callback);
    }
  });
};

const deleteTodo = (userId, todoId, callback) => {
  User.findOne({ id: userId }, (error, userData) => {
    if (error) {
      callback(error);
    } else {
      const updatedUserData = {
        todos: [...userData.todos].filter(todo => todo.id !== Number(todoId)),
      };
      User.updateOne({ id: userId }, updatedUserData, callback);
    }
  });
};

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
  addNewTodo,
  deleteTodo,
  getUserData,
};
