/* eslint-disable prettier/prettier */
const initialState = {
  name: '',
  cpf:'',
};

export default (state = initialState, action) => {
   switch (action.type) {
      case 'SET_NAME':
         return {...state, name: action.payload.name};
         break;
      case 'SET_WORKOUT':
         return {...state, workOutDays: action.payload.workOutDays}
         break; 
      case 'SET_CPF':
         return {...state, cpf:action.payload.cpf}
         break;
   }

   return state;
};
