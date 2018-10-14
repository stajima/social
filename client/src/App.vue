<template>
  <div id="app">
    <Nav />
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Nav.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: {
    Nav,
    TodoList,
  },
}
</script>