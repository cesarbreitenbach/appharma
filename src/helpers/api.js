import axios from 'axios'
import d from '../config/padroes'

const api = axios.create({
  baseURL:d.API_URL
})

export default api;
