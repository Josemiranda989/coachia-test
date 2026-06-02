import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const userService = {
  // GET all users
  getAllUsers: async () => {
    const response = await api.get('/users')
    return response.data.data
  },

  // GET user by id
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`)
    return response.data.data
  },

  // POST create new user
  createUser: async (userData) => {
    const response = await api.post('/users', userData)
    return response.data.data
  },

  // PUT update user
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData)
    return response.data.data
  },

  // DELETE user
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`)
    return response.data.data
  }
}
