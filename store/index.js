import Vuex from 'vuex'
import auth from './modules/auth'
import users from './modules/users'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      auth,
      users
    }
  })
}

export default createStore
