import Vue from 'vue'
import './store/mixin';
import store from './store/store';
import router from './store/router';
import {Checkbox,Select} from 'ant-design-vue';

Vue.config.productionTip = false;

Vue.use(Checkbox);
Vue.use(Select);

//Templates
import app from './App';

setTimeout(() => {
  const main = document.querySelector('#app-vue');
  if (main) {
    new Vue({
      el: main,
      render: h => h(app),
      store,
      router,
    });
  }
}, 0);

export default () => {
    return {app, store, router}
};
