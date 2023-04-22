<script>
import { compile, resolveComponent } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  computed: {
    dynamicRender() {
      return compile(this.template);
    },
  },

  watch: {
    components: {
      immediate: true,
      handler(components) {
        this.$options.components = components;
      },
    },
  },

  render(...args) {
    return this.dynamicRender.apply(this, args);
  },
};
</script>
