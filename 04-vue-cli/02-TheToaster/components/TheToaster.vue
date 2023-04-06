<template>
  <div class="toasts">
    <UiToast v-for="toast in toasts" :kind="toast.kind" :text="toast.text" :key="toast.text" @close="update" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UiToast, { EToastKind } from './UiToast.vue';

type TToasterData = { toasts: { kind: EToastKind; text: string }[] };

export default defineComponent({
  name: 'TheToaster',

  components: { UiToast },

  data(): TToasterData {
    return {
      toasts: [],
    };
  },

  methods: {
    success(text: string) {
      this.toasts.push({ kind: EToastKind.SUCCESS, text });
    },

    error(text: string) {
      this.toasts.push({ kind: EToastKind.ERROR, text });
    },

    update(text: string) {
      this.toasts = this.toasts.filter((it) => it.text !== text);
    },
  },
});
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
