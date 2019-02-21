export default function(context) {
  // redirect is allowed only for default pages. Public ones make exception
  let allow_redirect =
    context.route.name.toLowerCase() !== 'register' &&
    context.route.name.toLowerCase() !== 'login'

  if (allow_redirect) {
    if (!isAuth(context)) {
      return context.redirect('/login')
    }
  }
}

function isAuth(context) {
  // Check if user session exists somehow
  let isAuth = context.store.getters['auth/isAuthenticated']
  //if not look for data in cookies
  if (!isAuth) {
    const cookies = context.app.$cookies.getAll()
    if (cookies.hasOwnProperty('user') && cookies.hasOwnProperty('jwt')) {
      context.store.dispatch('auth/setState', {
        user: cookies.user,
        jwt: cookies.jwt
      })
      isAuth = true
    }
  }
  return isAuth
}
