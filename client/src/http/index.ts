import axios from 'axios'

export const API_URL = 'http://localhost:8080/api'

const $axios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

export default $axios