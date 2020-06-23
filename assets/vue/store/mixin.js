   import Vue from 'vue';

Vue.mixin({
  methods: {
    ajaxUrl() {
      return window.ajaxurl;
    },
    currentPath() {
      return location.pathname;
    }
  }
});
