<template>
  <div :class="['toast', data.className]">
    <UiIcon class="toast__icon" :icon="data.icon" />
    <span>{{ text }}</span>
  </div>
</template>

<script lang="ts">
import UiIcon from './UiIcon.vue';
import { defineComponent } from 'vue';

export enum EToastKind {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type TToastData = {
  icon: string;
  className: string;
};

export default defineComponent({
  name: 'TheToast',

  components: { UiIcon },

  props: {
    kind: {
      type: String,
      default: EToastKind.SUCCESS,
      validator(value: string): boolean {
        return value in EToastKind;
      },
    },

    text: { type: String, required: true },

    timeout: { type: Number, default: 5000 },
  },

  computed: {
    data(): TToastData {
      switch (this.kind) {
        case EToastKind.ERROR:
          return {
            icon: 'alert-circle',
            className: 'toast_error',
          };

        default:
        case EToastKind.SUCCESS:
          return {
            icon: 'check-circle',
            className: 'toast_success',
          };
      }
    },
  },

  emits: ['close'],

  mounted() {
    setTimeout(() => {
      this.$emit('close', this.text);
    }, this.timeout);
  },
});
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
