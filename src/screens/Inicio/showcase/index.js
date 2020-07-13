import React, { useState } from 'react';
import { AvatarArea, UserAvatar, Conteiner, WelcomeText, DescText} from './styled'
import { connect } from 'react-redux'

const Page = (props) => {

   return (
      <Conteiner>
         <WelcomeText>Bem vindo ao Appharma!</WelcomeText>
         <AvatarArea>
            <UserAvatar source={require('../../assets/logo.png')} />
         </AvatarArea>
         <DescText>Aqui os usuarios terão a visão de muitas informações, como promoções segmentadas, avisos e o que for interessante..</DescText>
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