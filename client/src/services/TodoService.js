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
