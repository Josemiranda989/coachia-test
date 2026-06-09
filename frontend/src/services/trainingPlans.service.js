import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const trainingPlansService = {
  // GET all training plans
  getAllTrainingPlans: async () => {
    const response = await api.get('/training-plans')
    return response.data.data
  },

  // GET training plan by id
  getTrainingPlanById: async (id) => {
    const response = await api.get(`/training-plans/${id}`)
    return response.data.data
  },

  // POST create new training plan
  createTrainingPlan: async (planData) => {
    const response = await api.post('/training-plans', planData)
    return response.data.data
  },

  // PATCH update training plan
  updateTrainingPlan: async (id, planData) => {
    const response = await api.patch(`/training-plans/${id}`, planData)
    return response.data.data
  },

  // DELETE training plan
  deleteTrainingPlan: async (id) => {
    const response = await api.delete(`/training-plans/${id}`)
    return response.data.data
  }
}
