import React, { useState, useEffect } from 'react';
import { Conteiner, LogoArea, LogoText, Logo, FormArea, InputArea, FormText, ButtomArea, Buttom, MsgError } from './styled'
import ValidateCpf from '../../helpers/CpfValidator'
import { TextInputMask } from 'react-native-masked-text'
import { connect } from 'react-redux'
import api from '../../helpers/api'



const Login = (props) => {

   const [cpfUser, setCpfUser] = useState('');
   const [error, setError] = useState(false);
   const start = () => {
      setError(false)
      // if (!ValidateCpf(cpfUser)){
      //    setError(true)
      //    return
      // }
      let parsedCpf = cpfUser;

      parsedCpf = parsedCpf.replace('.', '').replace('.', '').replace('-', '');

      console.log(`cpf do caboco ${parsedCpf}`)

      api.get(`usuarios/${parsedCpf}`)
         .then((r) => {
            console.log(`Id: ${r.data.user.id} Nome ${r.data.user.nome}`)

            props.setName(r.data.user.nome)
            props.setId(r.data.user.id)
            props.setCpf(parsedCpf)

         }).catch((e) => {
            console.log("Usuario não existe")
            props.setName('')
            props.setId('')
            props.setCpf(parsedCpf)
         }).finally(() => {
            console.log("finalmente... ")
            props.navigation.navigate('ConfirmPassword');
         })




   }

   return (
      <Conteiner>
         <LogoArea>
            <LogoText size="16px">Approach Mobile</LogoText>
            <Logo source={require('../../assets/logo.png')} />
            <LogoText >Soluções</LogoText>
         </LogoArea>

         <FormArea>
            <InputArea>
               <FormText >Insira o seu CPF para começar sua experiência em nossos serviços</FormText>
               <TextInputMask
                  style={{ width: 200, height: 40 }}
                  autoFocus={true}
                  type={'cpf'}
                  value={cpfUser}
                  onChangeText={text => {
                     setCpfUser(text)
                  }}
               />
               {error && <MsgError> CPF INVALIDO </MsgError>}
            </InputArea>

            <ButtomArea>
               <Buttom onPress={start}>
                  <FormText color="#fff">Continuar </FormText>
               </Buttom>
            </ButtomArea>

         </FormArea>


      </Conteiner>
   );
}

Login.navigationOptions = {
   headerShown: false
}

const mapStateToProps = (state) => {
   return {
      cpf: state.userReducer.cpf,
      id: state.userReducer.id,
      name: state.userReducer.name,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setCpf: (cpf) => dispatch({ type: 'SET_CPF', payload: { cpf } }),
      setName: (name) => dispatch({ type: 'SET_NAME', payload: { name } }),
      setId: (id) => dispatch({ type: 'SET_ID', payload: { id } }),

   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);