const types = Object.freeze({
  SET_STATE: 'SET_STATE'
})

const getDefaultState = () => {
  return {
    user: [],
    jwt: ''
  }
}

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  async authenticate({ commit }, payload) {
    try {
      const { status, data } = await this.$api.auth.authenticate(payload)
      if (status === 200) {
        commit(types.SET_STATE, data, { root: true })
      } else {
        throw new Error('Could not authenticate')
      }
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async register({ commit }, payload) {
    try {
      const { status, data } = await this.$api.auth.register(payload)
      if (status === 200) {
        commit(types.SET_STATE, data, { root: true })
      } else {
        throw new Error('Could not authenticate')
      }
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async logOut({ commit }) {
    try {
      const success = await this.$api.auth.reset()
      if (success) {
        commit(types.SET_STATE, getDefaultState(), { root: true })
      }
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async setState({ commit }, payload) {
    try {
      commit(types.SET_STATE, payload, { root: true })
    } catch ({ message }) {
      console.error(message)
    }
  }
}

// mutations
const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
