<template>
  <div id="hello">
    <div class="holder">
      <form @submit.prevent="addtodo">
        <input type="text" placeholder="Enter a item..." v-model="todo" v-validate="'min:3'" name="todo">
        <transition name="alert-in">
          <p class="alert" v-if="errors.has('todo')">{{ errors.first('todo') }}</p>
        </transition>
      </form>

      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <ListItem 
            v-for="(todo, index) in todos" 
            v-bind:todo="todo"
            v-bind:userId="userId"
            v-bind:key="index"
          />
        </transition-group>
      </ul>
      <p>These are things you need to do!</p>
    </div>
  </div>
</template>

<script>
import ListItem from '../components/ListItem.vue';
import TodoService from '../services/TodoService.js';

export default {
  name: 'TodoList',
  data () {
    return {
      todo: '',
      userId: 1,
      todos: [],
      friends: [],
    }
  },
  methods: {
    addtodo() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.todos.push({ todo: this.todo });
          this.todo = '';
        }
      });
    }
  },
  components: {
    ListItem,
  },
  created: function (id = this.userId) {
    const data = TodoService.getList(id);
    this.todos = data.todos;
    this.friends = data.friends;
  },
}
</script>