const initialState = {
   endereco:[],
   troco:0,
   subTotal:0,
   desconto:0,
   total:0,
   tipoPgto:'',
   taxaEntrega:0,
   previsaoEntrega:60,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case "CLEAR_CHECKOUT":
         return initialState
         break

		case "SET_ENDERECO": {
         return { ...state, endereco: action.payload.endereco }
         break
      }
      
      case "SET_TROCO": {
         return { ...state, troco: action.payload.troco }
         break
      }

      case "SET_SUBTOTAL": {
         return { ...state, subTotal: action.payload.subTotal }
         break
      }

      case "SET_DESCONTO": {
         return { ...state, desconto: action.payload.desconto }
         break
      }

      case "SET_TOTAL": {
         return { ...state, total: action.payload.total }
         break
      }

      case "SET_TAXA": {
         return { ...state, taxaEntrega: action.payload.taxaEntrega }
         break
      }

      case "SET_PREVISAO": {
         return { ...state, previsaoEntrega: action.payload.previsaoEntrega }
         break
      }

      case "SET_TIPOPGTO": {
         return { ...state, tipoPgto: action.payload.tipoPgto }
         break
      }
      
	}

	return state
};
