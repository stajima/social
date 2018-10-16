import Vue from 'vue';
import Router from 'vue-router';
import TodoList from './components/TodoList.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/:userId',
      name: 'todolist',
      component: TodoList,
    },
  ],
});
