<template>
  <div class="table-wrapper">
    <Table/>
  </div>
</template>

<script>
import Table from '~/components/catalogues/products.vue'

export default {
  components: {
    Table
  },
  fetch({ store }) {
    return store.dispatch('products/getProducts')
  }
}
</script>
