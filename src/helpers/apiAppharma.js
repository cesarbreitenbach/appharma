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

    validaCart: async (token, cart) => {
        try{
            const resp = await api.post(`verify/reserva`, {cart}, {
                 headers:{auth:`${bearer} ${token}`}
            })
            return resp.data.estoque
        }catch(e){
            console.log(e.message)
        }
    },

    postReserva: async (token, reserva) => {
        try{
            console.log("Vou chamar reserva com: "+JSON.stringify(reserva))
            const resp = await  api.post(`reserva`, reserva, {
                headers:{auth:`${bearer} ${token}`}
            })
            return resp.data
        } catch (e){
            console.log(e.message)
        }
    }

}
export default () => ApiApp;