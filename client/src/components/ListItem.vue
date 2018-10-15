<template>
  <li>
    {{ todo.text }}
    <i class="fa fa-minus-circle" v-on:click="remove(index)"></i>
  </li>
</template>

<script>
export default {
  name: 'ListItem',
  props: ['todo'],
}
</script>