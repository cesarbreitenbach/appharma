import React from 'react';
import { Conteiner, ScrollArea } from './styled'
import Vitrine from '../../components/Inicio/Vitrine'
import BuyNow from '../../components/Inicio/BuyNow'
import LoginArea from '../../components/Inicio/LoginArea'
import GreetensArea from '../../components/Inicio/GreetensArea'

import { connect } from 'react-redux'



const Page = (props) => {

   return (
      <Conteiner>
         <ScrollArea showsVerticalScrollIndicator={false}> 
             <GreetensArea />
            <Vitrine />
            <BuyNow />
            <LoginArea />
         </ScrollArea> 
      </Conteiner>
   );
}

Page.navigationOptions = {
   headerTitle: "APPharma",
   headerShown: true,
   headerTitleAlign: 'center',
   headerTintColor: "#fff",
   headerStyle: {
      height: 50, // Specify the height of your custom header
      backgroundColor: "#9d80ff",
   }
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