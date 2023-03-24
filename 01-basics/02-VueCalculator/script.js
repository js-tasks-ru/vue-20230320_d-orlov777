import { createApp } from './vendor/vue.esm-browser.js';

const App = {
  data() {
    return {
      leftOperand: 1,
      rightOperand: 0,
      operator: 'sum',
    };
  },

  computed: {
    result() {
      switch (this.operator) {
        case 'sum':
          return this.leftOperand + this.rightOperand;
        case 'subtract':
          return this.leftOperand - this.rightOperand;
        case 'multiply':
          return this.leftOperand * this.rightOperand;
        case 'divide':
          return this.leftOperand / this.rightOperand;
      }
    },
  },
};

createApp(App).mount('#app');
