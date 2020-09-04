import axios from 'axios'

const api = axios.create({
  baseURL:'https://approachmobile.company/api'
})

export default api;
