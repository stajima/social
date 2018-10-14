<template>
  <div>
    {{ nickname }}
    <registration v-bind:nickname="nickname" v-if="!loggedIn" />
    <app-view v-else />
  </div>
</template>

<script>
import AppView from './AppView.vue'
import Registration from './Registration.vue'

export default {
  data () {
    return {
      loggedIn: false,
      nickname: 'test',
    }
  },
  components: {
    AppView,
    Registration,
  },
}
</script>