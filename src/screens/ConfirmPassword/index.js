import React, { useState } from 'react';
import { Conteiner, FormArea, InputArea, FormText, ButtomArea, Buttom, LogoText , ItemInput, LogoArea, Logo, MsgError } from './styled'
import { connect } from 'react-redux'
import api from '../../helpers/api'

const ConfirmPassword = (props) => {

   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [error, setError] = useState(false);
   const [errorMsg, setErrorMsg] = useState('');

   const start = () => {
      setError(false)

      if (password !== confirmPassword && !props.id){
         setErrorMsg("Senhas são diferentes. Tente de novo.");
         setError(true);
         return;
      }

      if(props.id){
         api.post('sessions', {cpf:props.cpf, password:password}).then((r)=>{

            props.setToken(r.data.token);
            props.setStatus(true);
            
            props.navigation.navigate('Preload');
         }).catch(e=> {
            console.log('erro não loguei..'+e)
            setErrorMsg("Usuario ou senha invalidos")
            setError(true);
         }).finally(()=>console.log("Finalizei login..."))
      }


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
      nome:state.userReducer.name, 
      admin:state.authReducer.admin,
      status:state.authReducer.status
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setToken: (token) => dispatch({ type: 'SET_TOKEN', payload: { token } }),
      setAdmin: (admin) => dispatch({ type: 'SET_ADMIN', payload: { admin } }),
      setStatus: (status) => dispatch({ type: 'SET_STATUS', payload: { status } })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPassword);