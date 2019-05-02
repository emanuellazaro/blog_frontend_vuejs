import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import Dashboard from '@/components/Dashboard.vue';
import About from '@/components/About.vue';
import Post from '@/components/Post.vue';
import addPost from '@/components/addPost.vue';
import editPost from '@/components/editPost.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'blog',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/addpost',
      name: 'addpost',
      component: addPost,
    },
    {
      path: '/editpost/:slug',
      name: 'editpost',
      component: editPost,
    },
    {
      path: '/:slug',
      name: 'post',
      component: Post,
    },
  ],
});
