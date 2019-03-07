import {
  authenticate,
  reset,
  register,
  processAuthError,
  processRegisterError
} from './auth'

import { getAll, remove, update, create } from './products'

export default context => ({
  auth: {
    authenticate: authenticate.bind(context),
    register: register.bind(context),
    reset: reset.bind(context),
    processAuthError: processAuthError.bind(context),
    processRegisterError: processRegisterError.bind(context)
  },
  products: {
    getAll: getAll.bind(context),
    remove: remove.bind(context),
    update: update.bind(context),
    create: create.bind(context)
  }
})
