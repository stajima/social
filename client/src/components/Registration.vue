<template>
  <section>
    <h1>Register {{ nickname }}</h1>
    <input type="text" v-model="nickname" />
    <input type="button" value="Set Nickname" v-on:click="setNickname" />
  </section>
</template>

<script>
  export default {
    props: ['nickname'],
    methods: {
      setNickname: () => {
        console.log('setNickname');
      }
    }
  }
</script>