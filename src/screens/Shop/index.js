import React, { useState } from 'react';
import { AvatarArea, UserAvatar, Conteiner, WelcomeText, DescText} from './styled'
import { connect } from 'react-redux'

const Page = (props) => {

   return (
      <Conteiner>
         <WelcomeText>Em breve nosso Ecommerce!</WelcomeText>
         <AvatarArea>
            <UserAvatar source={require('../../assets/ecommerce.png')} />
         </AvatarArea>
         <DescText>Essa pagina destina-se a loja, vitrines com produtos e filtros faceis, nessa tela tem o carrinho.</DescText>
      </Conteiner>
   );
}

Page.navigationOptions = {
   headerShown: false
}

const mapStateToProps = (state) => {
   return {
      cpf: state.userReducer.cpf
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setCpf: (cpf) => dispatch({ type: 'SET_CPF', payload: { cpf } })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);