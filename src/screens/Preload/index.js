import React  from 'react'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import api from '../../helpers/api'
import { Conteiner, Title, Logo } from './styled'


const Preload = (props) => {


   setTimeout(() => {
      const dataPesquisa = '2020-07-14T00:00:00-03:00'

      console.log(`este é o token: ${props.token}`)

      if (!props.token) {
         api.get(`promocoes?date=${dataPesquisa}`).then(r => {
            props.setPromocoes(r.data)
         })
      }

      props.navigation.dispatch(StackActions.reset({
         index: 0,
         actions: [
            NavigationActions.navigate({ routeName: 'AppTab' }),
         ],
      }));
   }, 2000)


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
      token: state.authReducer.token
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      setPromocoes: (promocoes) => dispatch({ type: 'SET_PROMOCOES', payload: { promocoes } })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preload);
