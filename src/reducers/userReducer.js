/* eslint-disable prettier/prettier */
const initialState = {
  token:'',
  name: '',
  cpf:'',
  level: '', // begginer, inermediate, advanced
  workOutDays: [], //1-0
  myWorkOuts: [],
  lastWorkout: '', //ID
  dailyProgress: ['2020-07-06', '2020-06-08'],
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
