import React, {useEffect}  from 'react'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import api from '../../helpers/api'
import { Conteiner, Title, Logo } from './styled'
import {promoRandom} from '../../services/PromoService'


const Preload = (props) => {
   
   const go = () =>{
      props.navigation.dispatch(StackActions.reset({
         index: 0,
         actions: [
            NavigationActions.navigate({ routeName: 'AppTab' }),
         ],
      }));
   }

   useEffect(()=>{
      setTimeout(() => {
         const dataPesquisa = '2020-07-14T00:00:00-03:00'
   
         if (!props.token) {
            
            api.get(`promocoes/best`).then(r=>{
               props.setPromocoes(r.data)
               go()
            })


         }else{
            console.log(`vou chamar api do directno cpf : ${props.cpf} com o token ${props.token}`)
            api.get(`promocoes/direct?cpf=${props.cpf}`, {headers:{auth:props.token}}).then(r=>{
               props.setPromocoes(r.data)
               go()
            });
         }
         
      }, 1000)
   }, [])


   return (
      <Conteiner>
         <Title size="16px">Approach Mobile </Title>
         <Logo source={require('../../assets/logo.png')} />
         <Title size="14px">Soluções</Title>
      </Conteiner>
   );
};

const mapStateToProps = (state) => {
   return {
      promocoes: state.vitrineReducer.promocoes,
      token: state.authReducer.token,
      id:state.userReducer.id,
      cpf:state.userReducer.cpf,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      setPromocoes: (promocoes) => dispatch({ type: 'SET_PROMOCOES', payload: { promocoes } })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preload);
