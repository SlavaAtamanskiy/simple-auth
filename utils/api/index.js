import {
  authenticate,
  reset,
  register,
  processAuthError,
  processRegisterError
} from './auth'
import { getAll } from './products'

export default context => ({
  auth: {
    authenticate: authenticate.bind(context),
    register: register.bind(context),
    reset: reset.bind(context),
    processAuthError: processAuthError.bind(context),
    processRegisterError: processRegisterError.bind(context)
  },
  products: {
    getAll: getAll.bind(context)
  }
})
