import axios from 'axios'
const URL = 'http://localhost:1337/auth/local'

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
  authenticate({ commit }, payload) {
    axios.post(URL, {
        identifier: payload.login,
        password: payload.password
      })
      .then(response => {
        // Handle success.
        commit('setState', response.data)
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error)
      })
  }
}

// mutations
const mutations = {
  setState(state, data) {
    //state = { ...data }
    state.jwt = data.jwt
    state.user = data.user
    this.$router.push('/')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
