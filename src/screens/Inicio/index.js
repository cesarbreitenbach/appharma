import React from 'react';
import { Text } from 'react-native'
import { Conteiner, ConteinerArea, ScrollArea } from './styled'
import Vitrine from '../../components/Inicio/Vitrine'
import BuyNow from '../../components/Inicio/BuyNow'
import LoginArea from '../../components/Inicio/LoginArea'
import GreetensArea from '../../components/Inicio/GreetensArea'


import { connect } from 'react-redux'

const Page = (props) => {

   return (
      <Conteiner>
         <ConteinerArea>

            <ScrollArea showsVerticalScrollIndicator={false}>
               <GreetensArea />
               <Vitrine navigation={props.navigation} />
               <BuyNow navigation={props.navigation} />
               <LoginArea navigation={props.navigation} />
            </ScrollArea>

         </ConteinerArea>
      </Conteiner>
   );
}

Page.navigationOptions = {
   headerTitle: "Sua Farmacia 24hrs",
   headerShown: true,
   headerTitleAlign: 'center',
   headerTintColor: "#fff",
   headerStyle: {
      height: 50, // Specify the height of your custom header
      backgroundColor:  '#de3e3e'  ,
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