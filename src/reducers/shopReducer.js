import {URL_FILES} from '@env'

const initialState = {
    descricao: '',
    taxa_entrega: 0,
    whatsapp: '',
    logo: '',
    cor_primaria: '',
    cor_secundaria: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "TAXA_ENTREGA":
            return { ...state, taxa_entrega: action.payload }

        case "WHATSAPP":
            return { ...state, whatsapp: action.payload }

        case "SET_COR_PRIMARIA":
            return { ...state, cor_primaria: action.payload }

        case "SET_COR_SECUNDARIA":
            return { ...state, cor_secundaria: action.payload }
            
        case "SET_DESCRICAO":
            return { ...state, descricao: action.payload }

        case "SET_LOGO":
            return { ...state, logo: URL_FILES + action.payload }

    }

    return state;
};

