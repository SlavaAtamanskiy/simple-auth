<template>
  <Table
    :all="all"
    :loading="loading"/>
</template>

<script>
import Table from '~/components/catalogues/products.vue'

export default {
  components: {
    Table
  },
  computed: {
    all() {
      return this.$store.state.products.all
    },
    loading() {
      return this.$store.state.products.loading
    }
  },
  fetch({ store }) {
    return store.dispatch('products/getProducts')
  }
}
</script>
