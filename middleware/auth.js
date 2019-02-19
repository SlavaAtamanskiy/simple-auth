export default function(ctx) {
  if (!isAuth(ctx)) {
    return ctx.redirect('/login')
  }
}

function isAuth(ctx) {
  // Check if user session exists somehow
  return ctx.store.getters['auth/isAuthenticated']
}
