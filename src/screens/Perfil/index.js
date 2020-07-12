import React, { useState } from 'react';
import { AvatarArea, UserAvatar, Conteiner, WelcomeText, DescText} from './styled'
import { connect } from 'react-redux'

const Page = (props) => {

   return (
      <Conteiner>
         <WelcomeText>Perfil do usuario!</WelcomeText>
         <AvatarArea>
            <UserAvatar source={require('../../assets/avatar2.png')} />
         </AvatarArea>
         <DescText>Nessa pagina o usuario terá acesso a todo seu perfil, sua carteira, endereços para entrega, historico de compras, avaliações, e mais...</DescText>
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