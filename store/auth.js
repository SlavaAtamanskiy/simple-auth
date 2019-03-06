const types = Object.freeze({
  SET_STATE: 'SET_STATE'
})

const getDefaultState = () => {
  return {
    user: {},
    jwt: ''
  }
}

// initial state
export const state = () => getDefaultState()

// getters
export const getters = {
  isAuthenticated(state) {
    return state.jwt.length > 0
  }
}

// actions
export const actions = {
  async authenticate({ commit }, payload) {
    try {
      const { status, data } = await this.$api.auth.authenticate(payload)
      if (status === 200) {
        commit(types.SET_STATE, data)
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
        commit(types.SET_STATE, data)
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
        commit(types.SET_STATE, getDefaultState())
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
  }
}

// mutations
export const mutations = {
  [types.SET_STATE](state, data) {
    state = Object.assign(state, data)
  }
}
