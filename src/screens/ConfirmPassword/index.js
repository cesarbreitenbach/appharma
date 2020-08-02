import React, { useState, useRef } from 'react';
import { Conteiner, FormArea, InputArea, FormText, ButtomArea, Buttom, LogoText, ItemInput, LogoArea, Logo, MsgError, InternalButtom } from './styled'
import { connect } from 'react-redux'
import api from '../../helpers/api'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ConfirmPassword = (props) => {

   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [error, setError] = useState(false);
   const [errorMsg, setErrorMsg] = useState('');
   const [name, setName] = useState(props.nome);

   const passwordRef = useRef();
   const confirmPasswordRef = useRef();

   const start = () => {
      setError(false)

      if (password !== confirmPassword && !props.id) {
         setErrorMsg("Senhas são diferentes. Tente de novo.");
         setError(true);
         return;
      }

      // aqui o cara não tem usuario ainda, não tem id definido nem nome
      if (!props.id) {
         api.post('usuarios', { name, cpf: props.cpf, password, confirmPassword }).then(e => {
            props.setId(e.data.id);
            props.setToken(`Bearer ${e.data.token}`);
            props.setStatus(true);
            props.setName(name);

            console.log(`Cadastrei, id: ${e.data.id} o token é: ${e.data.token}`);

            props.navigation.navigate('Preload');
         }).catch(e => {

            console.log("Pau na bagaça");

            setErrorMsg(`${e.response.data.error} ${e.response.data.messages[0].errors}`);
            setError(true);
            return;

         }).finally(() => {
            console.log("Finalizei processo de cadastro, novo usuario")
         })
      }

      // Aqui o kra já tem cadastro, tem um nome definido e um id
      if (props.id) {
         console.log(`Vou tentar autenticar o cpf: ${props.cpf}` )
         api.post('sessions', { cpf: props.cpf, password: password }).then((r) => {


            props.setToken(`Bearer ${r.data.token}`);
            props.setStatus(true);

            props.navigation.navigate('Preload');
         }).catch(e => {

            console.log('erro não loguei..' + e)
            setErrorMsg("Usuario ou senha invalidos")
            setError(true);


         }).finally(() => console.log("Finalizei login..."))
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


               {props.id ? <LogoText>Bem vindo de volta {props.nome} !  </LogoText> : <LogoText>Cadastre uma senha de acesso no nosso App.  </LogoText>}
               {!props.nome && <ItemInput
                  placeholder="Digite seu nome"
                  onChangeText={(e) => setName(e)}
                  blurOnSubmit={false}
                  returnKeyType="go"
                  onSubmitEditing={() => {
                     passwordRef.current.focus();
                  }}
               />}

               <ItemInput
                  ref={passwordRef}
                  placeholder="Digite sua senha secreta"
                  secureTextEntry
                  onChangeText={(e) => setPassword(e)}
                  returnKeyType={!props.id ? "go" : "done"}
                  onSubmitEditing={() => {
                     !props.id ? confirmPasswordRef.current.focus() : start
                        ;
                  }}
               />

               {!props.id &&
                  <ItemInput
                     ref={confirmPasswordRef}
                     secureTextEntry
                     placeholder="Confirme sua senha"
                     onChangeText={(e) => setConfirmPassword(e)}
                     returnKeyType="done"
                     onSubmitEditing={() => start()}
                  />}
            </InputArea>

            <ButtomArea>
               <Buttom onPress={start}>
                  <InternalButtom>
                     <Icon name="login" size={25} color="#fff" style={{ marginRight: 5 }} />
                     <FormText size="15px" color="#fff">{props.id ? "Entrar" : "Cadastrar"} </FormText>
                  </InternalButtom>

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
      token: state.authReducer.token,
      id: state.userReducer.id,
      nome: state.userReducer.name,
      admin: state.authReducer.admin,
      status: state.authReducer.status
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setName: (name) => dispatch({ type: 'SET_NAME', payload: { name } }),
      setToken: (token) => dispatch({ type: 'SET_TOKEN', payload: { token } }),
      setAdmin: (admin) => dispatch({ type: 'SET_ADMIN', payload: { admin } }),
      setStatus: (status) => dispatch({ type: 'SET_STATUS', payload: { status } }),
      setId: (id) => dispatch({ type: 'SET_ID', payload: { id } })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPassword);