/* eslint-disable prettier/prettier */
const initialState = {
    idvenda: '',
    tipo: '',
    remoteMessage: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CLEAR_MESSAGE_REDUCER':
            return initialState
            break
        case 'SET_IDVENDA':
            return { ...state, idvenda: action.payload.idvenda };
            break;
        case 'SET_MSGTIPO':
            return { ...state, tipo: action.payload.tipo }
            break;
        case 'SET_REMOTEMESSAGE':
            console.log("Vou colocar o remote no reducer", action.payload)
            return { ...state, remoteMessage: action.payload }
            break;
    }

    return state;
};
