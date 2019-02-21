const URL = 'http://localhost:1337/auth/local'
const types = Object.freeze({
  SET_STATE: 'SET_STATE'
})

// initial state
const state = {
  user: {},
  jwt: ''
}

// getters
const getters = {
  isAuthenticated(state) {
    return state.jwt.length > 0
  }
}

// actions
const actions = {
  async authenticate({ commit }, payload) {
    try {
      const { status, data } = await this.$api.auth.authenticate(URL, payload)
      if (status === 200) {
        commit(types.SET_STATE, data)
      } else {
        throw new Error('Could not authenticate')
      }
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async setState({ commit }, payload) {
    try {
      commit(types.SET_STATE, payload)
    } catch ({ message }) {
      console.error(message)
    }
  },
  async logOut({ commit }, payload) {
    try {
      const success = await this.$api.auth.removeCookies()
      if (success) {
        commit(types.SET_STATE, { user: {}, jwt: '' })
      }
    } catch ({ message }) {
      console.error(message)
    }
  }
}

// mutations
const mutations = {
  [types.SET_STATE](state, data) {
    Object.assign(state, data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
