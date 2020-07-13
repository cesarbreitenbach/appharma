import React, { useState } from 'react';
import {
   GreetensArea, ImageArea,
   ViewButtom,
   Conteiner, BuyNowArea,
   HeaderArea, FooterArea, Items, ButtomArea, FormArea,
   BuyNowButtom, HeaderText, IconeArea, ScollArea, HeaderTextArea, LoginArea
} from './styled'
import { Text, StyleSheet} from 'react-native'
import { connect } from 'react-redux'

import { BlurView } from 'expo-blur';

const Page = (props) => {
   const [cpfUser, setCpfUser] = useState('');
   const [error, setError] = useState(false);

   return (
      <Conteiner>
         <GreetensArea>
            <Text style={{fontWeight:'bold'}}>Olá!</Text>
            <Text style={{fontWeight:'bold'}}>Em que posso te ajudar?</Text>
         </GreetensArea>
         <ScollArea showsVerticalScrollIndicator={false}>
            <BuyNowArea >
               <HeaderArea>
                  <IconeArea><Items width="30" height="30" source={require('../../assets/carrinho.png')} /></IconeArea>
                  <HeaderTextArea>
                     <HeaderText>Compre pelo aplicativo </HeaderText>
                     <HeaderText size="14px">Receba em casa ou retire na loja! </HeaderText>
                  </HeaderTextArea>
               </HeaderArea>
               <ImageArea source={require('../../assets/loja.jpg')} >
                  <ButtomArea>
                     <BuyNowButtom underlayColor="#52d191" onPress={() => props.navigation.navigate('ShopStack')}>
                        <ViewButtom>
                           <Items source={require('../../assets/ecommerce.png')} />
                           <Text style={{ color: '#fff' }}>Ir às Compras</Text>
                        </ViewButtom>
                     </BuyNowButtom>

                  </ButtomArea>
               </ImageArea>
               <FooterArea />
            </BuyNowArea>

            <LoginArea>
               <HeaderArea>
                  <IconeArea><Items width="30" height="30" source={require('../../assets/senha.png')} /></IconeArea>
                  <HeaderTextArea>
                     <HeaderText size="14px">Faça o login ou cadastre-se </HeaderText>
                     <HeaderText size="12px">Tenha acesso a todos os nossos descontos </HeaderText>
                  </HeaderTextArea>
               </HeaderArea>

               <FormArea>
                  <ButtomArea>
                     <BuyNowButtom underlayColor="#52d191" onPress={() => props.navigation.navigate('ShopStack')}>
                        <ViewButtom>
                           <Items source={require('../../assets/chave.png')} />
                           <Text style={{ color: '#fff' }}>Cadastar ou Entrar</Text>
                        </ViewButtom>
                     </BuyNowButtom>

                  </ButtomArea>
               </FormArea>

               <FooterArea />

            </LoginArea>


         </ScollArea>
      </Conteiner>
   );
}

Page.navigationOptions = {
   headerTitle:"APPharma",
   headerShown: true,
   headerTitleAlign:'center',
   headerTintColor:"#fff",
   headerStyle: {
      height: 50, // Specify the height of your custom header
      backgroundColor:"#9d80ff",
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