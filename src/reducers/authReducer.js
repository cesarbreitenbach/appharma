/* eslint-disable prettier/prettier */
const initialState = {
   token:'',
   admin:false,
   status:0, // 0 deslogado - 1 logado
 };
 
 export default (state = initialState, action) => {
    switch (action.type) {
       case 'SET_TOKEN':
          return {...state, token: action.payload.token};
          break;
       case 'SET_ADMIN':
          return {...state, admin:action.payload.admin}
          break;
      case 'SET_STATUS':
            return {...state, status:action.payload.status}
            break;
    }
 
    return state;
 };