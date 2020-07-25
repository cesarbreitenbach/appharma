import React, { useState } from 'react';
import { Conteiner, FormArea, InputArea, FormText, ButtomArea, Buttom, LogoText , ItemInput, LogoArea, Logo, MsgError } from './styled'
import { connect } from 'react-redux'

const ConfirmPassword = (props) => {

   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [error, setError] = useState(false);
   const [errorMsg, setErrorMsg] = useState('');

   const start = () => {
      setError(false)

      if (password !== confirmPassword){
         setErrorMsg("Senhas são diferentes. Tente de novo.");
         setError(true);
         return;
      }



      props.navigation.navigate('Preload');

   }

   return (
      <Conteiner>
         <LogoArea>
            <Logo source={require('../../assets/logo.png')} />
         </LogoArea>
         {error && <MsgError>  {errorMsg} </MsgError>}
         <FormArea>
            <InputArea>
             
             { props.id ? <LogoText>Bem vindo de volta {props.nome} !  </LogoText>  : <LogoText>Cadastre uma senha de acesso no nosso App.  </LogoText> }

                  <ItemInput 
                     placeholder="Digite sua senha secreta"
                     secureTextEntry
                     onChangeText={(e)=>setPassword(e)}
                     />

            {!props.id &&
                 <ItemInput 
                        secureTextEntry
                        placeholder="Confirme sua senha"
                        onChangeText={(e)=>setConfirmPassword(e)}
                     />}
            </InputArea>

            <ButtomArea>
               <Buttom onPress={start}>
                  <FormText color="#fff">{ props.id ? "Entrar" : "Cadastrar"} </FormText>
               </Buttom>
            </ButtomArea>

         </FormArea>

      </Conteiner>
   );
}

ConfirmPassword.navigationOptions = {
   headerShown: false
}

const mapStateToProps = (state) => {
   return {
      cpf: state.userReducer.cpf,
      token:state.authReducer.token,
      id:state.userReducer.id,
      nome:state.userReducer.name
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setToken: (token) => dispatch({ type: 'SET_TOKEN', payload: { tokeen } })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPassword);