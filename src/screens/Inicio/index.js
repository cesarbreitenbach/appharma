import React from 'react';
import { Conteiner, ConteinerArea, ScrollArea } from './styled'
import Vitrine from '../../components/Inicio/Vitrine'
import BuyNow from '../../components/Inicio/BuyNow'
import LoginArea from '../../components/Inicio/LoginArea'
import GreetensArea from '../../components/Inicio/GreetensArea'
import d from '../../config/padroes'


import { connect } from 'react-redux'

const Page = (props) => {

   return (
      <Conteiner>
         <ConteinerArea>

            <ScrollArea showsVerticalScrollIndicator={false}>
               <GreetensArea nome={props.nome} />
               <Vitrine navigation={props.navigation} />
               <BuyNow navigation={props.navigation} />
               {!props.token &&  <LoginArea navigation={props.navigation} />}
               <ConteinerArea style={{marginTop:10}}/>
                  
            </ScrollArea>

         </ConteinerArea>
      </Conteiner>
   );
}

Page.navigationOptions = {
   headerTitle: "Sua Farmacia de Bolso",
   headerTitleStyle:{
      fontFamily:'Roboto Black Italic'
   },
   headerShown: true,
   headerTitleAlign: 'center',
   headerTintColor: "#fff",
   headerStyle: {
      height: 50, // Specify the height of your custom header
      backgroundColor:  d.corPrincipal  ,
   }
}

const mapStateToProps = (state) => {
   return {
      cpf: state.userReducer.cpf,
      nome: state.userReducer.name,
      token: state.authReducer.token
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setCpf: (cpf) => dispatch({ type: 'SET_CPF', payload: { cpf } })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);