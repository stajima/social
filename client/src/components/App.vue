<template>
  <div>
    <registration v-if="!loggedIn" />
    <app-view v-else />
  </div>
</template>

<script>
import AppView from './AppView.vue'
import Registration from './Registration.vue'

export default {
  components: {
    AppView,
    Registration,
  },
  data: function () {
    return {
      loggedIn: false,
    }
  }
}
</script>