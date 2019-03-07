<template>
  <Table
    :all="all"
    :loading="loading"
    :search="search"
    :dialogFormVisible="dialogFormVisible"
    :formLabelWidth="formLabelWidth"
    :title="label"
    :form="form"
    :fields="fields"
    :columns="columns"
  />
</template>

<script>
import Table from '~/components/reusable/table_with_modal.vue'
let getDefaults = () => ({
  id: '',
  name: '',
  date: '',
  service: false
})

export default {
  components: {
    Table
  },
  fetch({ store }) {
    return store.dispatch('products/getAll')
  },
  data() {
    return {
      //permanent
      title: 'Product',
      formLabelWidth: '50px',
      fields: [
        { label: 'Name', prop: 'name', type: 'input' },
        { label: 'Service', prop: 'service', type: 'checkbox' }
      ],
      columns: [
        { label: 'Service', prop: 'service' },
        { label: 'Name', prop: 'name' }
      ],
      //dynamic
      form: getDefaults(),
      search: '',
      dialogFormVisible: false
    }
  },
  computed: {
    all() {
      return this.$store.state.products.all
    },
    loading() {
      return this.$store.state.products.loading
    },
    label() {
      return !this.form.id
        ? `${this.title} (creation)`
        : `${this.title} (editing)`
    }
  },
  created() {
    this.$nuxt.$on('ROW_EDIT', data => {
      this.form = Object.assign({}, data)
      this.form.service = data.service === 'yes' ? true : false
      this.$store.dispatch('products/setCurrent', this.form)
      this.dialogFormVisible = !this.dialogFormVisible
    })
    this.$nuxt.$on('ROW_DELETE', ({ id }) => {
      this.$store.dispatch('products/remove', id)
    })
    this.$nuxt.$on('ROW_CREATE', () => {
      this.dialogFormVisible = !this.dialogFormVisible
      this.form = getDefaults()
      this.$store.dispatch('products/setCurrent', this.form)
    })
    this.$nuxt.$on('CANCEL', () => {
      this.dialogFormVisible = !this.dialogFormVisible
    })
    this.$nuxt.$on('SAVE', () => {
      this.$store.dispatch('products/update', this.form)
      this.dialogFormVisible = !this.dialogFormVisible
    })
    this.$nuxt.$on('CREATE', () => {
      this.$store.dispatch('products/create', this.form)
      this.dialogFormVisible = !this.dialogFormVisible
    })
  },
  methods: {}
}
</script>
