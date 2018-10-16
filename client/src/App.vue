<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Nav.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: {
    TodoList,
  },
}
</script>