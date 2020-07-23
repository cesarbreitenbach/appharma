import axios from 'axios'

const api = axios.create({
  baseURL:'https://ioffertas.club:3333/api'
})

export default api;
