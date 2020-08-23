/* eslint-disable prettier/prettier */
const initialState = {
  id:"",
  name: '',
  cpf:'',
  addressList:[]
};

export default (state = initialState, action) => {
   switch (action.type) {
      case 'SET_NAME':
         return {...state, name: action.payload.name};
         break;
      case 'SET_ID':
         return {...state, id: action.payload.id}
         break; 
      case 'SET_CPF':
         return {...state, cpf:action.payload.cpf}
         break;
      case 'SET_ADDRESS':
         return {...state, addressList:action.payload.addressList}
         break;
   }

   return state;
};
