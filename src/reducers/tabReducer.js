/* eslint-disable prettier/prettier */
const initialState = {
   activePage:'home'
 };
 
 export default (state = initialState, action) => {
    switch (action.type) {
       case 'SET_ACTIVE':
          return {...state, activePage: action.payload.activePage};
          break;
    }
 
    return state;

   };
 