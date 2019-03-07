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
    data.forEach(({ id, name, service, createdAt }) => {
      result.data.push({
        id,
        service: service ? 'yes' : 'no',
        name: name || '',
        date: createdAt || ''
      })
    })
  }

  return result
}

export const remove = async function(id) {
  const { status } = await this.$axios({
    url: `/products/${id}`,
    method: 'delete'
  })

  return status === 200
}

export const update = async function(item) {
  const { status, data } = await this.$axios({
    url: `/products/${item.id}`,
    method: 'put',
    data: item
  })

  const result = {
    status,
    data: {}
  }

  if (status === 200) {
    result.data = Object.assign({}, data)
    result.data.service = data.service ? 'yes' : 'no'
  }

  return result
}

export const create = async function(item) {
  const { status, data } = await this.$axios({
    url: `/products`,
    method: 'post',
    data: item
  })

  const result = {
    status,
    data: {}
  }

  if (status === 200) {
    result.data = Object.assign({}, data)
    result.data.service = data.service ? 'yes' : 'no'
  }

  return result
}
