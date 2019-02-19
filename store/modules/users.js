import axios from 'axios'
const token = 'TOKEN'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  filterList(state, val) {
    return state.all.filter(itm =>
      itm.title.toLowerCase().match(val.toLowerCase())
    )
  }
}

// actions
const actions = {
  getUsers({ commit }) {
    axios
      .get('/users', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => response.data)
      .then(items => {
        commit('setUsers', items)
      })
      .catch(err => {
        console.log(err)
      })
  },
  createUser({ commit }, payload) {
    axios
      .post('/users', payload.data)
      .then(res => {
        payload.callback(res, commit)
      })
      .catch(err => {
        console.log(err)
      })
  },
  editUser({ commit }, payload) {
    axios
      .put('/users/${payload.data._id}', payload.data)
      .then(res => {
        payload.callback(res, commit)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteUser({ commit }, id) {
    axios
      .delete('/users/${id}')
      .then(res => {
        if ((res.status = 200)) {
          commit('deleteUser', id)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

// mutations
const mutations = {
  setUsers(state, items) {
    state.all = items
  },
  createUser(state, item) {
    state.all.push(item)
  },
  editUser(state, item) {
    let i = state.all.findIndex(itm => itm._id === item._id)
    if (i >= 0) state.all.splice(i, 1, item)
    //if (i) state.all[i] = {...item};
  },
  deleteUser(state, id) {
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
