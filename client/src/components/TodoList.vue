<template>
  <div id="hello">
    <div class="holder">
      <form @submit.prevent="addSkill">
        <input type="text" placeholder="Enter a item..." v-model="skill" v-validate="'min:3'" name="skill">
        <transition name="alert-in">
          <p class="alert" v-if="errors.has('skill')">{{ errors.first('skill') }}</p>
        </transition>
      </form>

      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li v-for="(data, index) in skills" :key='index'>
            {{ data.skill }}
            <i class="fa fa-minus-circle" v-on:click="remove(index)"></i>
          </li>
        </transition-group>
      </ul>
      <p>These are things you need to do!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data () {
    return {
      skill: '',
      skills: [
        {skill: "Vue.js" },
        {skill: "Front-end dev" },
      ]
    }
  },
  methods: {
    addSkill() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.skills.push({ skill: this.skill });
          this.skill = '';
        }
      });
    },
    remove(id) {
      this.skills.splice(id, 1);
    }
  }
}
</script>