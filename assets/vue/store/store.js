/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import * as qs from 'qs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    some_data: ''
  },
  mutations: {
    setter(state, object) {
      Object.entries(object).forEach(([key, value]) => {
        Vue.set(state, key, value);
      });
    },
  },
  actions: {
    sendRequest({state}, requestBody) {
      return axios.post(window.ajaxurl, qs.stringify(requestBody));
    },
  },
  getters: {}
});
