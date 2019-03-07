const types = Object.freeze({
  SET_PRODUCTS: 'SET_PRODUCTS',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  SET_PRODUCT: 'SET_PRODUCT'
})

// initial state
export const state = () => ({
  all: [],
  item: {},
  loading: false
})

// getters
export const getters = {}

// actions
export const actions = {
  async getAll({ commit }) {
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
  },
  setCurrent({ commit }, item) {
    commit(types.SET_PRODUCT, item)
  },
  async remove({ commit }, id) {
    try {
      const success = await this.$api.products.remove(id)
      if (success) {
        commit(types.DELETE_PRODUCT, id)
      } else {
        throw new Error('Could not load products')
      }
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async update({ state, commit }, item) {
    if (JSON.stringify(state.item) !== JSON.stringify(item)) {
      try {
        const { status, data } = await this.$api.products.update(item)
        if (status === 200) {
          commit(types.UPDATE_PRODUCT, data)
        } else {
          throw new Error('Could not load products')
        }
      } catch (err) {
        return Promise.reject(err)
      }
    }
  },
  async create({ state, commit }, item) {
    if (JSON.stringify(state.item) !== JSON.stringify(item)) {
      try {
        const { status, data } = await this.$api.products.create(item)
        if (status === 200) {
          commit(types.CREATE_PRODUCT, data)
        } else {
          throw new Error('Could not load products')
        }
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

// mutations
export const mutations = {
  [types.SET_PRODUCTS](state, items) {
    state.all = items
  },
  [types.SET_PRODUCT](state, item) {
    state.item = Object.assign({}, item)
  },
  [types.CREATE_PRODUCT](state, item) {
    state.all.push(item)
  },
  [types.UPDATE_PRODUCT](state, item) {
    let i = state.all.findIndex(itm => itm.id === item.id)
    if (i >= 0) state.all.splice(i, 1, item)
    //if (i) state.all[i] = {...item};
  },
  [types.DELETE_PRODUCT](state, id) {
    let i = state.all.findIndex(itm => itm.id === id)
    if (i >= 0) state.all.splice(i, 1)
  }
}
