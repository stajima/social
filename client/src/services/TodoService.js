import axios from 'axios';

export default {
  getList(userId) {
    return axios(`/api/users/${userId}`).then(res => res.data);
  },
  removeTodo(userId, todoId) {
    return axios.delete(`/api/users/${userId}/todos/${todoId}`);
  },
  addTodo(userId, data) {
    return axios.post(`/api/users/${userId}`, data);
  },
};
