<template>
  <h1>{{ state }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const StateType = {
  PENDING: 'pending',
  FULLFILLED: 'fullfilled',
  REJECTED: 'rejected',
} as const;

type TData = {
  state: (typeof StateType)[keyof typeof StateType];
};

export default defineComponent({
  name: 'PromiseWrapper',

  StateType,

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data(): TData {
    return {
      state: StateType.PENDING,
    };
  },

  watch: {
    promise: {
      handler() {
        this.state = StateType.PENDING;
        this.promise.then(() => (this.state = StateType.FULLFILLED)).catch(() => (this.state = StateType.REJECTED));
      },
      immediate: true,
    },
  },
});
</script>
