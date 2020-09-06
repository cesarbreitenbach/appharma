/* eslint-disable prettier/prettier */
const initialState = {
   id: "",
   name: '',
   cpf: '',
   addressList: [],
   tokenFcm: '',
   tokenFcmGuest: ''
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
         console.log("Entrei aqui com o token: " + action.payload.tokenFcm)
         return { ...state, tokenFcm: action.payload.tokenFcm }
         break;
      case 'SET_FCMTOKENGUEST':
         console.log("Entrei aqui com o token GUEST: " + action.payload.tokenFcmGuest)
         return { ...state, tokenFcmGuest: action.payload.tokenFcmGuest }
         break;
   }

   return state;
};
