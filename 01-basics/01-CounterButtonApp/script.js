import { createApp } from './vendor/vue.esm-browser.js';

const App = {
  counter: 0,

  data() {
    return { counter: 0 };
  },

  methods: {
    increment() {
      this.counter += 1;
    },
  },
};

createApp(App).mount('#app');
