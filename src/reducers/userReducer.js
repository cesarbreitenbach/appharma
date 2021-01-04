/* eslint-disable prettier/prettier */
const initialState = {
    id: "",
    name: '',
    cpf: '',
    addressList: [],
    tokenFcm: '',
    tokenFcmGuest: '',
    whatsapp: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CLEAR_USERREDUCER':
            return initialState
            break
        case 'SET_NAME':
            return { ...state, name: action.payload.name };
            break;
        case 'SET_ID':
            return { ...state, id: action.payload.id }
            break;
        case 'SET_CPF':
            return { ...state, cpf: action.payload.cpf }
            break;
        case 'SET_ADDRESS':
            return { ...state, addressList: action.payload.addressList }
            break;
        case 'SET_FCMTOKEN':
            return { ...state, tokenFcm: action.payload.tokenFcm }
            break;
        case 'SET_FCMTOKENGUEST':
            return { ...state, tokenFcmGuest: action.payload.tokenFcmGuest }
            break;
        case 'SET_USER_WHATS':
            return { ...state, whatsapp: action.payload }
            break;
    }

    return state;
};
