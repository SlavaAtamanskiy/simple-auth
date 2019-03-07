<template>
  <div>
    <div style="margin: .5rem 0 1rem 0;">
      <el-container direction="horizontal">
        <el-input
          v-model="search"
          size="mini"
          placeholder="Type to search"
          style="margin-right: 60%; max-width: 40%;"/>
        <el-button
          size="mini"
          type="success"
          @click="handleCreate()">Create</el-button>
      </el-container>
    </div>
    <el-table
      :data="all.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      border>
      <div v-for="(column, i) in columns" :key="i">
        <el-table-column
          :label="column.label"
          :prop="column.prop"/>
      </div>
      <el-table-column
        align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogFormVisible" :title="title">
      <el-form :model="form">
        <div v-for="(field, u) in fields" :key="u">
          <div v-if="field.type === 'input'">
            <el-form-item :label="field.label" :label-width="formLabelWidth">
              <el-input v-model="form[field.prop]" autocomplete="off"/>
            </el-form-item>
          </div>
          <div v-if="field.type === 'checkbox'">
            <el-form-item :label="field.label" :label-width="formLabelWidth">
              <el-checkbox v-model="form[field.prop]"/>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">Cancel</el-button>
        <el-button v-if="form.id" type="primary" @click="save">Save</el-button>
        <el-button v-if="!form.id" type="success" @click="create">Create</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    all: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    search: {
      type: String,
      default: ''
    },
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    formLabelWidth: {
      type: String,
      default: '100px'
    },
    title: {
      type: String,
      default: 'Form modal'
    },
    columns: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array,
      default: () => []
    },
    form: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleEdit(index, row) {
      this.$nuxt.$emit('ROW_EDIT', row)
    },
    handleDelete(index, row) {
      this.$nuxt.$emit('ROW_DELETE', row)
    },
    handleCreate() {
      this.$nuxt.$emit('ROW_CREATE')
    },
    create() {
      this.$nuxt.$emit('CREATE')
    },
    cancel() {
      this.$nuxt.$emit('CANCEL')
    },
    save() {
      this.$nuxt.$emit('SAVE')
    }
  }
}
</script>
