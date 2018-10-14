import Vue from 'vue';
import VeeValidate from 'vee-validate';
import App from './App.vue';
import router from './router';
import './assets/styles.css';

Vue.use(VeeValidate);
/* eslint-disable no-new */
new Vue({
  router,
  el: '#vue-todo',
  render: h => h(App),
});
