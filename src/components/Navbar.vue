<template>
  <div class="container">
    <b-navbar toggleable="lg" type="light" class="main">
      <b-navbar-brand href="/">brazu.ca</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="auth==''" class="nav-link" href="/">blog</b-nav-item>
          <b-nav-item v-if="auth==''" class="nav-link" href="/about">about</b-nav-item>
          <b-nav-item v-if="auth=='loggedin'">
            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
          </b-nav-item>
          <b-nav-item v-if="auth=='loggedin'">
            <a class="nav-link" href="" v-on:click="logout">Logout</a>
          </b-nav-item>
        </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  </div>
</template>

<script>

import EventBus from './EventBus.vue';
import router from '../router';

EventBus.$on('logged-in', (test) => {
  console.log(test);
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
