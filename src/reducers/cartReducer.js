/* eslint-disable prettier/prettier */
const initialState = {
   cart:['fuck', 'fuck','fuck', 'fuck','fuck', 'fuck','fuck', 'fuck','fuck', 'fuck','fuck', 'fuck','fuck', 'fuck','fuck', 'fuck','fuck', 'fuck','fuck', 'fuck','fuck', 'fuck']   
 };
 
 export default (state = initialState, action) => {
    switch (action.type) {
       case 'ADD_TO_CART':
          return {...state, product: action.payload.product};
          break;
    }
 
    return state;
 };