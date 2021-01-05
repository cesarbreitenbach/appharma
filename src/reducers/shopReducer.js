import d from '../config/padroes'

const initialState = {
    descricao: '',
    taxa_entrega: 0,
    whatsapp: '',
    logo: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "TAXA_ENTREGA":
            return { ...state, taxa_entrega: action.payload }

        case "WHATSAPP":
            return { ...state, whatsapp: action.payload }


        case "SET_DESCRICAO":
            return { ...state, descricao: action.payload }

        case "SET_LOGO":
            return { ...state, logo: d.URL_FILES + action.payload }

    }

    return state;
};

