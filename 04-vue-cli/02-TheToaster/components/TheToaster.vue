<template>
  <div class="toasts">
    <UiToast v-for="{ kind, text, id } in toasts" :kind="kind" :text="text" :key="id" @close="update()" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { nanoid } from 'nanoid';
import UiToast, { EToastKind } from './UiToast.vue';

type TToasterData = { toasts: { kind: EToastKind; text: string; id: string }[] };

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
      this.toasts.push({ id: nanoid(5), kind: EToastKind.SUCCESS, text });
    },

    error(text: string) {
      this.toasts.push({ id: nanoid(5), kind: EToastKind.ERROR, text });
    },

    update() {
      this.toasts.splice(0, 1);
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
