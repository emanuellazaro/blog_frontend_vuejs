<template>
  <div class="container">
    <nav class="navbar navbar-default navbar-fixed-top navbar-expand-lg navbar-light main">
      <div class="navbar-header"><router-link class="navbar-brand" to="/">blog</router-link></div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar"
      aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse mr-auto mt-2 mt-lg-0" id="navbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link a" to="/">blog</router-link>
          </li>
          <li v-if="auth==''" class="nav-item">
            <router-link class="nav-link a" to="/about">about</router-link>
          </li>
          <li v-if="auth=='loggedin'" class="nav-item">
            <router-link class="nav-link a" to="/dashboard">Dashboard</router-link>
          </li>
          <li v-if="auth=='loggedin'" class="nav-item">
            <a class="nav-link" href="" v-on:click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>

import EventBus from './EventBus.vue';
import router from '../router';

EventBus.$on('logged-in', (test) => {
  // console.log(test);
});
export default {
  data() {
    return {
      auth: '',
      user: '',
    };
  },

  methods: {
    logout() {
      localStorage.removeItem('usertoken');
      router.push({ name: 'Home' });
    },
  },
    mounted() {
      EventBus.$on('logged-in', (status) => {
      this.auth = status;
    });
  },
};
</script>
