/* eslint-disable prettier/prettier */

const initialState = {
   carrinho: [],
   total: 0
};

export default (state = initialState, action) => {
   const lista = state.carrinho;
   let index = 0;
   
   switch (action.type) {
      case 'ADD_TO_CART':
         if (!lista) { return state }

         index = lista.findIndex(p => p.carrinho.id == action.payload.carrinho.id)

         console.log(`O indice desse produto é ${index} no array lista`)

         if (index >= 0) {
            lista[index].qtd += 1;
            return { ...state.carrinho, 
                         qtd: lista[index].qtd, 
                         ...state,
                         total: state.total + Number.parseFloat(lista[index].carrinho.preco_vigente) }
         } else {
            console.log(`Vou inserir um item que ainda não existe no array.. `)
            return {
               ...state,
               total: state.total + Number.parseFloat(action.payload.carrinho.preco_vigente) ,
               carrinho:[...state.carrinho, {carrinho:action.payload.carrinho, qtd: 1}],
            };
         }
         break;

      case 'DEL_FROM_CART':
         console.log("Vou deletar 1 do carrinho de: "+ action.payload.carrinho.nome)
         if (!lista) { return state }
         
         if ( state.qtd == 1){   
            let novoCarrinho = lista.filter(p => p.carrinho.id != action.payload.carrinho.id)
            console.log("Novo carrinho: "+JSON.stringify(novoCarrinho))
            return state
            // return {
            //       ...state,
            //       carrinho: [novoCarrinho],
            //       total: state.total + Number.parseFloat(action.payload.carrinho.preco_vigente)
            //    };         
         } else {
            console.log("Tem mais de um item, só deve mexer na quantidade... que é: "+state.qtd )
            return state
            // return { ...state.carrinho , qtd: state.qtd - 1, total: state.total - lista[index].carrinho.preco_vigente }
         }

         break;
   }

   return state;
};