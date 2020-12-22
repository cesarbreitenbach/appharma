import axios from 'axios'
import d from '../config/padroes'

const api = axios.create({
  baseURL:d.API_URL
})

const bearer = 'Bearer';

const ApiApp = {

    getReservas: async (idProduto) => {
        try {
            const resp = await api.get(`reserva/${idProduto}`, { }, { headers: {} })
            return resp.data.total_reservado[0].total_reservado
        } catch (e) {
            return { error: e}
        }
    },

}
export default () => ApiApp;