import Vuex from 'vuex'
import auth from './modules/auth'
import products from './modules/products'

const types = Object.freeze({
  SET_STATE: 'SET_STATE'
})

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      jwt: '',
      user: {}
    }),
    getters: {
      isAuthenticated(state) {
        return state.jwt.length > 0
      }
    },
    actions: {
      async nuxtServerInit({ dispatch }, context) {
        return new Promise((resolve, reject) => {
          const cookies = context.app.$cookies.getAll()
          if (cookies.hasOwnProperty('user') && cookies.hasOwnProperty('jwt')) {
            dispatch('auth/setState', {
              user: cookies.user,
              jwt: cookies.jwt
            })
              .then(() => {
                resolve(true)
              })
              .catch(error => {
                console.log('Error in (store/index.js) :', error)
                context.app.$api.auth.reset()
                resolve(false)
              })
          } else {
            context.app.$api.auth.reset()
            resolve(false)
          }
        })
      }
    },
    mutations: {
      [types.SET_STATE](state, data) {
        state = Object.assign(state, data)
      }
    },
    modules: {
      auth,
      products
    }
  })
}

export default createStore
