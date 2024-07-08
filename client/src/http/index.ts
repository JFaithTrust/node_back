import axios from 'axios'

export const API_URL = 'http://localhost:8080'

const $axios = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
})

export default $axios