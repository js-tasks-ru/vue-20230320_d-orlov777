<template>
  <component v-if="component" :is="component" :result="result" :error="error" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const StateType = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
} as const;

type TData = {
  state: (typeof StateType)[keyof typeof StateType];
  result: any;
  error: Error | null;
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
      error: null,
      result: null,
    };
  },

  computed: {
    component() {
      switch (this.state) {
        case StateType.PENDING:
          return this.$slots.pending;
        case StateType.FULFILLED:
          return this.$slots.fulfilled;
        case StateType.REJECTED:
          return this.$slots.rejected;
        default:
          return null;
      }
    },
  },

  watch: {
    promise: {
      immediate: true,
      async handler() {
        this.state = StateType.PENDING;
        try {
          this.result = await this.promise;
          this.state = StateType.FULFILLED;
        } catch (err) {
          this.error = err as Error;
          this.state = StateType.REJECTED;
        }
      },
    },
  },
});
</script>
