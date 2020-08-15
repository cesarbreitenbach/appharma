import React, { useState } from 'react';
import { AvatarArea, UserAvatar, Conteiner, WelcomeText, DescText, Buttom, ButtomArea, FormText } from './styled'
import { connect } from 'react-redux'

const Page = (props) => {

   const  logout = async () => {
      await props.setCpf('');
      await props.setId('');
      await props.setToken('');
      await props.setNome('');
      await props.setStatus(false);
      await props.setActivePage('home');
      await props.clearCart()
      props.navigation.navigate('Preload');
   }

   return (
      <Conteiner>
         <WelcomeText>Perfil do usuario!</WelcomeText>
         <AvatarArea>
            <UserAvatar source={require('../../assets/avatar2.png')} />
         </AvatarArea>
         <DescText>Nessa pagina o usuario terá acesso a todo seu perfil, sua carteira, endereços para entrega, historico de compras, avaliações, e mais...</DescText>
         <ButtomArea>
            <Buttom onPress={logout}>
               <FormText color="#fff">Sair </FormText>
            </Buttom>
         </ButtomArea>
      </Conteiner>
   );
}

Page.navigationOptions = {
   headerShown: false
}

const mapStateToProps = (state) => {
   return {
      cpf: state.userReducer.cpf,
      nome: state.userReducer.name,
      id: state.userReducer.id,
      token: state.authReducer.token,
      status: state.authReducer.status,
      activePage: state.tabReducer.activePage
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setCpf: (cpf) => dispatch({ type: 'SET_CPF', payload: { cpf } }),
      setNome: (name) => dispatch({ type: 'SET_NAME', payload: { name } }),
      setToken: (token) => dispatch({ type: 'SET_TOKEN', payload: { token } }),
      setStatus: (status) => dispatch({ type: 'SET_STATUS', payload: { status } }),
      setId: (id) => dispatch({ type: 'SET_ID', payload: { id } }),
      setActivePage: (activePage) => dispatch({ type: 'SET_ACTIVE', payload: { activePage } }),
      clearCart: () => dispatch({type: 'CLEAR_CART' })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);