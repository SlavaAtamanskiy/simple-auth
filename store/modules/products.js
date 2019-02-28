const types = Object.freeze({
  SET_PRODUCTS: 'SET_PRODUCTS',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  EDIT_PRODUCT: 'EDIT_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT'
})

// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  async getProducts({ commit }) {
    try {
      const { status, data } = await this.$api.products.getAll()
      if (status === 200) {
        commit(types.SET_PRODUCTS, data)
      } else {
        throw new Error('Could not load products')
      }
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

// mutations
const mutations = {
  [types.SET_PRODUCTS](state, items) {
    state.all = items
  },
  [types.CREATE_PRODUCT](state, item) {
    state.all.push(item)
  },
  [types.EDIT_PRODUCT](state, item) {
    let i = state.all.findIndex(itm => itm._id === item._id)
    if (i >= 0) state.all.splice(i, 1, item)
    //if (i) state.all[i] = {...item};
  },
  [types.DELETE_PRODUCT](state, id) {
    let i = state.all.findIndex(itm => itm._id === id)
    if (i >= 0) state.all.splice(i, 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
