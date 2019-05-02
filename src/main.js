import 'bootstrap/dist/css/bootstrap.css';
import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import VueSimpleMarkdown from 'vue-simple-markdown';
import 'vue-simple-markdown/dist/vue-simple-markdown.css';
import moment from 'moment';
import App from './App.vue';
import router from './router';


Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueSimpleMarkdown);
Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('ll');
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
