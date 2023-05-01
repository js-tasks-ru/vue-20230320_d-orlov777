<template>
  <div class="pagination-container">
    <slot :item="item" v-for="item in pageItems" />
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    pageItems() {
      const startIndex = (this.page - 1) * this.perPage;
      return this.items.slice(startIndex, startIndex + this.perPage);
    },
  },
};
</script>

<style></style>
