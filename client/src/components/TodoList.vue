<template>
  <div>
    <select id="softflow" v-model="selectedFriend" v-on:change="onUserSelect(selectedFriend)">
      <option v-if="currentListId == userId" disabled value="">View a Friends List</option>
      <option v-else value="">View My List</option>
      <option v-bind:key="friend.id" v-for="friend in user.friends" v-bind:value="friend.id">
        {{ friend.name }}
      </option>
    </select>
    <span>Friend ID: {{ selectedFriend }}</span>
    <div class="holder">
      <form v-if="currentListId == userId" @submit.prevent="addtodo">
        <input autocomplete="off" type="text" placeholder="Enter a item..." v-model="todo" v-validate="'min:3'" name="todo">
        <transition name="alert-in">
          <p class="alert" v-if="errors.has('todo')">{{ errors.first('todo') }}</p>
        </transition>
      </form>

      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <ListItem 
            v-for="(todo, index) in shownTodos" 
            v-bind:todo="todo"
            v-bind:userId="userId"
            v-bind:deletable="currentListId == userId"
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
      shownTodos: [],
      currentListId: null,
      selectedFriend: '',
      userId: 1,
      user: {
        id: null,
        name: '',
        count: 0,
        todos: [],
        friends: [],
      },
    }
  },
  methods: {
    addtodo() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          TodoService.addTodo(this.userId, { text: this.todo });
          this.todo = '';
        }
      });
    },
    onUserSelect(id) {
      if (!id) {
        this.currentListId = this.userId;
        this.shownTodos = this.user.todos;
        return;
      }
      this.currentListId = id;
      const data = this.getTodoList(this.currentListId);
      this.shownTodos = data.todos;
    },
    getTodoList(id) {
      return TodoService.getList(id);   
    },
  },
  components: {
    ListItem,
  },
  created: function (id = this.userId) {
    const data = this.getTodoList(id);
    this.user = data;
    this.shownTodos = this.user.todos;
    this.currentListId = this.user.id;
  },
}
</script>