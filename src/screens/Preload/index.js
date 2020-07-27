import React, {useEffect}  from 'react'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import api from '../../helpers/api'
import { Conteiner, Title, Logo } from './styled'


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
   
         console.log(`este é o token: ${props.token} usuario id: ${props.id}`)
   
         if (!props.token) {
            api.get(`promocoes?date=${dataPesquisa}`).then(r => {
               props.setPromocoes(r.data)
               console.log('consultei sem token...')
               go();
            })
         }else{
            api.get(`promocoes?date=${dataPesquisa}&id=${props.id}`).then(r => {
               console.log(`Consultando com token do cliente id: ${props.id}`)
               props.setPromocoes(r.data)
               go();
            })
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
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      setPromocoes: (promocoes) => dispatch({ type: 'SET_PROMOCOES', payload: { promocoes } })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preload);
