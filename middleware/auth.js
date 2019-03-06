export default function({ store, redirect, route }) {
  const userIsLoggedIn = store.getters['auth/isAuthenticated']
  const urlRequiresAuth =
    /^\/register(\/|$)/.test(route.fullPath) ||
    /^\/login(\/|$)/.test(route.fullPath)

  if (!userIsLoggedIn && !urlRequiresAuth) {
    return redirect('/login')
  }

  if (userIsLoggedIn && urlRequiresAuth) {
    return redirect('/')
  }

  return Promise.resolve()
}
