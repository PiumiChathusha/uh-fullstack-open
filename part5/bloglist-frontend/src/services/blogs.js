import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = newBlog => {
  const request = axios.post(baseUrl, newBlog, { headers: { Authorization: token } })
  return request.then(response => response.data)
}

const update = (id, updateBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, updateBlog, { headers: { Authorization: token } })
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } })
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { setToken, getAll, create, update, remove }