<template>
  <nav>
    <router-link to="user">Home</router-link>
    <router-link to="/about">About</router-link>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {
      userId: Number(this.$route.params.userId),
    }
  },
}
</script>