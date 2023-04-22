<script>
import { compile, defineComponent, h } from 'vue';

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
    dynamicComponent() {
      const components = this.components;
      const template = this.template;
      const bindings = this.$options.props.bindings;

      return defineComponent({
        props: { bindings },
        components,
        render: compile(template),
      });
    },
  },

  render() {
    return h(this.dynamicComponent, {
      bindings: this.bindings,
    });
  },
};
</script>
