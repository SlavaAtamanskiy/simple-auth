import { authenticate, removeCookies, processAuthError } from './auth'

export default context => ({
  auth: {
    authenticate: authenticate.bind(context),
    removeCookies: removeCookies.bind(context),
    processAuthError: processAuthError.bind(context)
  }
})
