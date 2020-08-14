/* eslint-disable prettier/prettier */

const initialState = {
   carrinho: [],
};

export default (state = initialState, action) => {
   switch (action.type) {
      case 'ADD_TO_CART':

         const lista = state.carrinho;


         if (!lista){ return state}
         const index = lista.findIndex(p => p.carrinho.id == action.payload.carrinho.id)

         console.log(index)

         if (index >= 0){
            lista[index].qtd += 1;
            return {...state, qtd: lista[index].qtd }
         } else {
            return { ...state, 
                        carrinho: [...state.carrinho, { carrinho:action.payload.carrinho, qtd:1 }]
            };
         }
         break;
   }

   return state;
};