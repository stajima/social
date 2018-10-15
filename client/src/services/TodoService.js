import axios from 'axios';

const Users = {
  1: {
    id: 1,
    name: 'Jane',
    count: 2,
    todos: [
      { id: 1, text: 'Vue.js' },
      { id: 2, text: 'Front-end dev' },
    ],
    friends: [{ id: 2, name: 'Shane' }],
  },
  2: {
    id: 2,
    name: 'Shane',
    count: 2,
    todos: [
      { id: 1, text: 'Angular.js' },
      { id: 2, text: 'Back-end dev' },
    ],
    friends: [{ id: 1, name: 'Jane' }],
  },
  3: {
    id: 3,
    name: 'John',
    count: 2,
    todos: [
      { id: 1, text: 'Backbone.js' },
      { id: 2, text: 'CSS Wiz' },
    ],
    friends: [],
  },
};

export default {
  getList(userId) {
    // return Users[userId];
    return axios(`http://localhost:8000/api/users/${userId}`).then(res => res.data);
  },
  removeTodo(userId, todoId) {
    const userData = Users[userId];
    if (userData) {
      const index = userData.todos.find(todo => todo.id === todoId);
      userData.todos.splice(index, 1);
      userData.count -= 1;
    }
  },
  addTodo(userId, data) {
    console.log('addTodo');
    return axios.post(`/api/users/${userId}`, data);
  },
};
