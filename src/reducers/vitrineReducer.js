/* eslint-disable prettier/prettier */
const initialState = {
   promocoes:[],
 };
 
 export default (state = initialState, action) => {
    switch (action.type) {
       case 'SET_PROMOCOES':
          return {...state, promocoes: action.payload.promocoes};
          break;
    }
 
    return state;
 };