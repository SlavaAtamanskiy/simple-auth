const URL = 'http://localhost:1337/auth/local'

export const authenticate = async function () {

       const res = await this.$axios({
             url: URL,
             method: 'post',
             params: {
                   identifier: payload.login,
                   password: payload.password
             }
        })
        .catch(error => {
        // Handle error.
        console.log('An error occurred:', error)
       })

       return res;
}
