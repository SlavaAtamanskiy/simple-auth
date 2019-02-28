import { authenticate, reset, processAuthError } from './auth'
import { getAll } from './products'

export default context => ({
  auth: {
    authenticate: authenticate.bind(context),
    reset: reset.bind(context),
    processAuthError: processAuthError.bind(context)
  },
  products: {
    getAll: getAll.bind(context)
  }
})
