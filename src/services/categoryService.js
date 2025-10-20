import api from './api'

export const fetchCategoriesAPI = () => {
  return api.get('/categories')
}
