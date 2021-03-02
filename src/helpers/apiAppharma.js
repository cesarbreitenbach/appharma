import axios from 'axios'
import { IDLOJA, API_URL } from '@env'

const api = axios.create({
    baseURL: API_URL
})

const bearer = 'Bearer';

const ApiApp = {

    getReservas: async (idProduto) => {
        try {
            const resp = await api.get(`reserva/${idProduto}`, {}, { headers: {} })
            return resp.data.total_reservado[0].total_reservado
        } catch (e) {
            return { error: e }
        }
    },

    validaCart: async (token, cart) => {
        try {
            const resp = await api.post(`verify/reserva`, { cart }, {
                headers: { auth: `${bearer} ${token}` }
            })
            return resp.data.estoque
        } catch (e) {
            console.log(e.message)
        }
    },

    postReserva: async (token, reserva) => {
        try {
            const resp = await api.post(`reserva`, reserva, {
                headers: { auth: `${bearer} ${token}` }
            })
            return resp.data
        } catch (e) {
            console.log(e.message)
        }
    },

    getConf: async (token) => {
        try {
            const resp = await api.get(`/loja/${IDLOJA}`, {
                headers: { auth: `${token}` }
            })
            return resp.data
        } catch (e) {
            return { error: e }
        }
    },

    getPrazoEntrega: async () => {
        try {
            const resp = await api.get(`loja/prazo`)
            return resp.data.prazo

        } catch (e) {
            console.log(e.message)
        }
    },

    getDestaques: async () => {
        try {
            const resp = await api.get('promocoes/destaques')
            return resp.data
        } catch (e) {
            console.log(e.message)
        }
    },
    getMaisVendidos: async () => {
        try {
            const resp = await api.get('promocoes/destaques')
            return resp.data
        } catch (e) {
            console.log(e.message)
        }
    },

    getValidaMarcacao: async () => {
        try {
            const resp = await api.get('/sync/valida')
            return resp.data[0].desync;
        } catch (e) {
            console.log(e.message)
        }
    },

    getUser: async (cpf) => {
        try {
            const resp = await api.get(`usuarios/${cpf}`)
            return resp.data
        } catch (e) {
            console.log(e.message)
        }
    },

    postUser: async (body) => {
        try {
            const resp = await api.post(`usuarios`, body)
            return resp.data

        } catch (e) {
            return e.response

        }
    },

    getSession: async (body) => {
        try {
            const resp = await api.post(`sessions`, body)
            return resp.data
        } catch (e) {
            return e.response
        }
    },

    putUser: async (token, body) => {
        try {
            console.log("cheguei aqui com token e body: " + JSON.stringify(body) + " " + token)
            const resp = await api.put(`usuarios`, body, {
                headers: { auth: `${token}` }
            })
            return resp.data
        } catch (e) {
            console.log(e.response)
            return e.response
        }
    },

    getCategorias: async () => {
        try {
            const resp = await api.get(`categorias`)
            return resp.data
        } catch (e) {
            return e.response
        }
    },
    getSubCategorias: async (id_categoria) => {
        try {
            const resp = await api.get(`subcategorias/${id_categoria}`)
            return resp.data
        } catch (e) {
            console.log(e.message)
        }
    },
    getMensagensRdc: async (id_produto) => {
        try {
            const resp = await api.get(`mensagemrdc/${id_produto}`);
            return resp.data

        } catch (e) {
            console.log(JSON.stringify(e))
        }
    },
    getStatus: async (id, token) => {
        try {
            const resp = await api.get(`status?id=${id}`, {
                headers: { auth: `${token}` }
            });
            console.log("Peguei api", resp.data)
            return resp.data

        } catch (e) {
            console.log(JSON.stringify(e))

        }
    },
    getAppVersion: async () => {
        try{
            const resp = await api.get('app/version')
            return resp.data
        } catch(e) {
            console.log(JSON.stringify(e))
        }
    }



}
export default () => ApiApp; 