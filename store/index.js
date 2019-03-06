export const actions = {
  async nuxtServerInit({ dispatch }, context) {
    return new Promise(resolve => {
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
}
