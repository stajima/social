<template>
  <div>
    <h1>Welcome {{ user.name }}</h1>
    <select id="softflow" v-model="selectedFriend" v-on:change="onUserSelect(selectedFriend)">
      <option v-if="currentListId == userId" disabled value="">View a Friends List</option>
      <option v-else value="">View My List</option>
      <option v-bind:key="friend.id" v-for="friend in user.friends" v-bind:value="friend.id">
        {{ friend.name }}
      </option>
    </select>
    <span>My ID: {{ userId }}</span>
    <span>Friend ID: {{ selectedFriend }}</span>
    <div class="holder">
      <form v-if="currentListId == user.id" @submit.prevent="addtodo">
        <input autocomplete="off" type="text" placeholder="Enter a item..." v-model="todo" v-validate="'min:3'" name="todo">
        <transition name="alert-in">
          <p class="alert" v-if="errors.has('todo')">{{ errors.first('todo') }}</p>
        </transition>
      </form>

      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp">
          <ListItem 
            v-for="todo in shownTodos" 
            v-bind:todo="todo"
            v-bind:userId="userId"
            v-bind:deletable="currentListId == userId"
            v-bind:key="`currentListId${currentListId}itemId${todo.id}`"
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
import io from '../../../node_modules/socket.io-client/dist/socket.io.js';

export default {
  name: 'TodoList',
  data () {
    return {
      todo: '',
      shownTodos: [],
      currentListId: null,
      selectedFriend: '',
      userId: Number(this.$route.params.userId),
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
          TodoService.addTodo(this.user.id, { text: this.todo });
          this.todo = '';
        }
      }); 
    },
    onUserSelect(id) {
      if (!id) {
        this.currentListId = this.user.id;
        this.shownTodos = this.user.todos;
        return;
      }
      this.currentListId = id;
      this.getUserData(this.currentListId).then((data) => {
        this.shownTodos = data.todos;
      });
    },
    getUserData(id) {
      return TodoService.getList(id);   
    },
  },
  components: {
    ListItem,
  },
  created: function () {
    return this.getUserData(this.userId)
    .then((data) => {
      this.user = data;
      this.shownTodos = this.user.todos;
      this.currentListId = this.user.id;
    });
  },
}
var socket = io();
</script>
