<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': state === $options.StateType.UPLOADING }"
      :style="state === $options.StateType.UPLOADED ? `--bg-url: url('${image}')` : ''"
      @click="clickHandler"
    >
      <span class="image-uploader__text">{{ title }}</span>
      <input
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        ref="input"
        @change="changeHandler"
      />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const StateType = {
  UPLOADING: 'UPLOADING',
  UPLOADED: 'UPLOADED',
  EMPTY: 'EMPTY',
} as const;

type TData = {
  state: (typeof StateType)[keyof typeof StateType];
  image: string;
};

export default defineComponent({
  name: 'UiImageUploader',
  inheritAttrs: false,

  StateType,

  props: {
    preview: String,
    uploader: Function,
  },

  emits: ['select', 'upload', 'error', 'remove'],

  data(): TData {
    return {
      state: this.preview ? StateType.UPLOADED : StateType.EMPTY,
      image: this.preview || '',
    };
  },

  computed: {
    title(): string {
      switch (this.state) {
        case StateType.EMPTY:
          return 'Загрузить изображение';

        case StateType.UPLOADING:
          return 'Загрузка...';

        default:
        case StateType.UPLOADED:
          return 'Удалить изображение';
      }
    },

    clickHandler() {
      return this.state === StateType.UPLOADED ? this.removeHandler : undefined;
    },
  },

  methods: {
    removeHandler(event: MouseEvent) {
      event.preventDefault();
      this.state = StateType.EMPTY;
      (this.$refs.input as HTMLInputElement).value = '';
      this.$emit('remove');
    },

    async changeHandler(event: Event) {
      const { files } = event.target as HTMLInputElement;
      if (!files) {
        return;
      }

      this.image = URL.createObjectURL(files[0]);
      this.$emit('select', files[0]);

      if (!this.uploader) {
        this.state = StateType.UPLOADED;
        return;
      }

      const storedState = this.state;
      this.state = StateType.UPLOADING;
      try {
        const response = await this.uploader(files[0]);
        this.state = StateType.UPLOADED;
        this.$emit('upload', response);
      } catch (err) {
        (this.$refs.input as HTMLInputElement).value = '';
        this.state = storedState;
        this.$emit('error', err);
      }
    },
  },
});
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
