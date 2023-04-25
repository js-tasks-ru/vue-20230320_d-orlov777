<template>
  <div class="pagination-container">
    <template v-for="{ id, item } in pageItems" :key="id">
      <slot :item="item" />
    </template>
  </div>
</template>

<script>
let id = 0;

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
    localItems() {
      return this.items.map((it) => ({
        id: --id,
        item: it,
      }));
    },

    pageItems() {
      const startIndex = (this.page - 1) * this.perPage;
      return this.localItems.slice(startIndex, startIndex + this.perPage);
    },
  },
};
</script>

<style></style>
