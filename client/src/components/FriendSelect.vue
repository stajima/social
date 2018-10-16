<template>
  <select v-model="selectedFriend" v-on:change="$emit('selectedFriend', selectedFriend)">
    <option v-if="currentListId == userId" disabled value="">View a Friends List</option>
    <option v-else value="">View My List</option>
    <option v-bind:key="friend.id" v-for="friend in friends" v-bind:value="friend.id">
      {{ friend.name }}
    </option>
  </select> 
</template>

<script>
export default {
  name: 'FriendSelect',
  data() {
    return {
      selectedFriend: '',
    }
  },
  props: {
    friends: Array,
    userId: Number,
    currentListId: Number,
  }
}
</script>