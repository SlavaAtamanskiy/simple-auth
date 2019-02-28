export const getAll = async function() {
  const { status, data } = await this.$axios({
    url: '/products',
    method: 'get'
  })

  const result = {
    status,
    data: []
  }

  if (status === 200) {
    data.forEach(({ id, Name, Service, createdAt }) => {
      result.data.push({
        id,
        service: Service ? 'yes' : 'no',
        name: Name || '',
        date: createdAt || ''
      })
    })
  }

  return result
}
