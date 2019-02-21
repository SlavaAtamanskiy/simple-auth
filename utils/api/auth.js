export const authenticate = async function(url, payload) {
  const res = await this.$axios({
    url: url,
    method: 'post',
    data: {
      identifier: payload.login,
      password: payload.password
    }
  })

  if (res.status === 200) {
    setCookies(res.data, this)
  }

  return res
}

const setCookies = function(data, context) {
  const options = {
    //path: '/'
  }
  const cookieList = [
    { name: 'user', value: data.user, opts: options },
    { name: 'jwt', value: data.jwt, opts: options }
  ]

  context.app.$cookies.setAll(cookieList)
}

export const removeCookies = async function(data) {
  this.app.$cookies.removeAll()
  return true
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
