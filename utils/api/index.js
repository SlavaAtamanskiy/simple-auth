import { authenticate } from './auth'

export default context => ({
  authenticate: {
    authenticate: authenticate.bind(context)
  }
})
//export default function generateApi(context) {
//  return {
//  authenticate: {
//    authenticate: authenticate.bind(context)
//  }
// }
//}
