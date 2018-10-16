<template>
  <div>
    <h1>Welcome {{ user.name }}</h1>

    <FriendSelect 
      v-on:selectedFriend="onUserSelect($event)" 
      v-bind:friends="user.friends" 
      v-bind:userId="userId" 
      v-bind:currentListId="currentListId"
    />

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
            v-on:reloadUserData="onUserSelect(currentListId)"
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
import FriendSelect from '../components/FriendSelect.vue';
import TodoService from '../services/TodoService.js';
import io from '../../../node_modules/socket.io-client/dist/socket.io.js';

let socket;
export default {
  name: 'TodoList',
  data () {
    return {
      todo: '',
      shownTodos: [],
      currentListId: null,
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
          TodoService.addTodo(this.user.id, { text: this.todo })
          .then(() => this.getUserData(this.currentListId).then((data) => {
            this.shownTodos = data.todos;
          }));
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
    FriendSelect,
  },
  created: function () {
    return this.getUserData(this.userId)
    .then((data) => {
      this.user = data;
      this.shownTodos = this.user.todos;
      this.currentListId = this.user.id;
      const friendsJSON = JSON.stringify(this.user.friends.map(friend => friend.id));
      socket = io.connect({ 
        query: {
          userId: this.userId,
          friends: friendsJSON,
        }
      });
      socket.on('refresh', (id) => {
        if (id !== this.user.id && Number(id) === this.currentListId) {
          this.getUserData(this.currentListId).then((data) => {
            this.shownTodos = data.todos;
          });
        }
      });
    }); 
  },
}
</script>
