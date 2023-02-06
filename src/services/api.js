const baseUrl = 'http://127.0.0.1:8000/api'

const request = async (method, endpoint, params, token = null) => {
  method = method.toLowerCase()
  let fullUrl = `${baseUrl}${endpoint}`
  let body = null
  // eslint-disable-next-line default-case
  switch (method) {
    case 'get':
      let queryString = new URLSearchParams(params).toString()
      fullUrl += `?${queryString}`
      break
    case 'post':
    case 'put':
    case 'delete':
      body = JSON.stringify(params)
      break
  }
  let headers = { 'Content-Type': 'application/json' }
  if (token) {
    headers.Authorization = 'Bearer ' + token
  }

  let req = await fetch(fullUrl, { method, headers, body })

  let json = await req.json()
  return json
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return {
    getToken: () => {
      return localStorage.getItem('token')
    },
    validateToken: async () => {
      let token = localStorage.getItem('token')
      let json = await request('post', '/auth/validate', {}, token)
      return json
    },
    login: async (email, password) => {
      let json = await request('post', '/auth/login', { email, password })
      return json
    },
    logout: async () => {
      let token = localStorage.getItem('token')
      let json = await request('post', '/auth/logout', {}, token)
      localStorage.removeItem('token')
      return json
    },

    getWall: async () => {
      let token = localStorage.getItem('token')
      let json = await request('get', '/walls', {}, token)
      return json
    },

    getUsers: async () => {
      let token = localStorage.getItem('token')
      let json = await request('get', '/users', {}, token)
      return json
    },
    removeUser: async (id) => {
      let token = localStorage.getItem('token')
      let json = await request('delete', `/user/${id}`, {}, token)
      return json
    },
    addUser: async (data) => {
      let token = localStorage.getItem('token')
      let json = await request('post', '/users', data, token)
      return json
    },
    updateUser: async (id, data) => {
      let token = localStorage.getItem('token')
      let json = await request('put', `/user/${id}`, data, token)
      return json
    },
  }
}
