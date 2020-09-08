import Vue from 'vue';
import App from "./App.vue";

import SafeArea from "../src/index";
Vue.component("SafeArea", SafeArea);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
