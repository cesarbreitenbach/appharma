import React, { useState } from 'react';
import { AvatarArea, UserAvatar, Conteiner, WelcomeText, DescText} from './styled'
import { connect } from 'react-redux'

const Page = (props) => {

   return (
      <Conteiner>
         <WelcomeText>Em breve nossas Ofertas!</WelcomeText>
         <AvatarArea>
            <UserAvatar source={require('../../assets/oferta.png')} />
         </AvatarArea>
         <DescText>Essa pagina, onde existirão ofertas de produtos, cupons o que seja..</DescText>
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