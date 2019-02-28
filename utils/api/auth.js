export const authenticate = async function(payload) {
  const { status, data } = await this.$axios({
    url: '/auth/local',
    method: 'post',
    data: {
      identifier: payload.login,
      password: payload.password
    }
  })

  const res = {
    status,
    data: {
      jwt: '',
      user: {}
    }
  }

  if (status === 200) {
    setAuthToken(data.jwt, this)
    setCookies(data, this)
    res.data = Object.assign({}, data)
  }

  return res
}

export const reset = async function() {
  await this.app.$cookies.removeAll()
  resetAuthToken(this)
  return true
}

const setAuthToken = function(token, context) {
  context.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const setCookies = function(data, context) {
  const options = {
    path: '/'
  }
  const cookieList = [
    { name: 'user', value: data.user, opts: options },
    { name: 'jwt', value: data.jwt, opts: options }
  ]
  context.app.$cookies.setAll(cookieList)
}

const resetAuthToken = function(context) {
  delete context.$axios.defaults.headers.common['Authorization']
}

export const processAuthError = function(err, callback) {
  const code = parseInt(err.response && err.response.status)
  let message

  switch (code) {
    case 400:
      message = 'Incorrect login or password'
      break
    case 429:
      message = 'Too many requests'
      break
    default:
      message = 'Something went wrong'
  }

  callback({
    title: message,
    message: `Request failed with error code: ${code}`,
    type: 'error'
  })
}
