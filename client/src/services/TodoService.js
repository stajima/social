const Users = {
  1: {
    id: 1,
    todos: [
      { text: 'Vue.js' },
      { text: 'Front-end dev' },
    ],
    friends: [2],
  },
  2: {
    id: 2,
    todos: [
      { text: 'Angular.js' },
      { text: 'Back-end dev' },
    ],
    friends: [1],
  },
  3: {
    id: 3,
    todos: [
      { text: 'Backbone.js' },
      { text: 'CSS Wiz' },
    ],
    friends: [],
  },
};

export default {
  getList(userId) {
    return Users[userId];
  },
};
