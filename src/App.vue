<template>
  <div id="app" class="layout">
    <navbar></navbar>
    <router-view/>
    <appFooter></appFooter>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/footer.vue';

export default {
  name: 'App',
  components: {
    navbar: Navbar,
    appFooter: Footer,
  },
};
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');

html, body {
  font-family: 'Roboto', sans-serif;
}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

.main {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 0px 0px;
  position: relative;
}

a:hover {
    color: #f33;
    border-bottom-color: #f33;
}

a{
    color: #f66;
}
</style>

<style scoped>
  .layout {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
</style>
