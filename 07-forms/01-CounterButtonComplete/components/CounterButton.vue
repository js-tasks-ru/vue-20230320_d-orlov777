<template>
  <button @click="handleClick">{{ state }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      state: this.count,
    };
  },

  watch: {
    count(newValue) {
      if (this.state !== newValue) {
        this.state = newValue;
      }
    },
  },

  methods: {
    handleClick() {
      this.state += 1;
      this.$emit('update:count', this.state);
    },
  },
};
</script>
