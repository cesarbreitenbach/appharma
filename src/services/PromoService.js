import api from '../helpers/api'

export const promoRandom = (props) => {

   if(!props.token){
      api.get(`promocoes/best`).then(r => {
         props.setPromocoes(r.data)
      }).catch(e => {
         console.log(e.message)
      })
   } else {
      api.get(`promocoes/direct?cpf=${props.cpf}`, {headers:{auth:props.token}}).then(r=>{
         props.setPromocoes(r.data)
      });
   }

   
}
