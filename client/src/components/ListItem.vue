<template>
  <li>
    {{ todo.text }}
    <i v-if="deletable" class="fa fa-minus-circle" v-on:click="remove(todo.id)"></i>
  </li>
</template>

<script>
import TodoService from '../services/TodoService.js';

export default {
  name: 'ListItem',
  props: {
    todo: Object,
    userId: Number,
    deletable: Boolean,
  },
  methods: {
    remove(todoId) {
      TodoService.removeTodo(this.userId, todoId)
    }
  },
}
</script>