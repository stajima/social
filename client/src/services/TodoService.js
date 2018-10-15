const Users = {
  1: {
    id: 1,
    count: 2,
    todos: [
      { id: 1, text: 'Vue.js' },
      { id: 2, text: 'Front-end dev' },
    ],
    friends: [2],
  },
  2: {
    id: 2,
    count: 2,
    todos: [
      { id: 1, text: 'Angular.js' },
      { id: 2, text: 'Back-end dev' },
    ],
    friends: [1],
  },
  3: {
    id: 3,
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
    return Users[userId];
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
    const userData = Users[userId];
    if (userData) {
      userData.count += 1;
      const newTodo = { id: userData.count, ...data };
      userData.todos.push(newTodo);
    }
  },
};
