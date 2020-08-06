import React, { useState, useEffect } from 'react';
import { Conteiner, LogoArea, LogoText, Logo, FormArea, InputArea, FormText, ButtomArea, Buttom, MsgError, InternalButtom } from './styled'
import ValidateCpf from '../../helpers/CpfValidator'
import { TextInputMask } from 'react-native-masked-text'
import { connect } from 'react-redux'
import api from '../../helpers/api'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'



const Login = (props) => {

   const [cpfUser, setCpfUser] = useState('');
   const [error, setError] = useState(false);
   const start =  () => {
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
            console.log(`Encontrei usuario Id: ${r.data.user.id} Nome ${r.data.user.nome}`)

            props.setName(r.data.user.nome)
            props.setId(r.data.user.id)
            props.setCpf(parsedCpf)

         }).catch(async (e) => {
            console.log("Usuario não existe")
            try{
               const cliente = await api.get(`clientes/${parsedCpf}`);
               
               console.log(`Existe cliente sem usuario no app: ${cliente.data.cliente.nome}`)
               props.setName(cliente.data.cliente.nome)

            } catch (e){
               console.log(e.response.data)
               props.setName('')
            }

            props.setCpf(parsedCpf)

         }).finally(() => {
            console.log("Direcionando para ConfirmPassword ")
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
               <FormText >Digite seu CPF para começar uma experiência incrivel com nossos serviços online</FormText>
               <TextInputMask
                  style={{ width: 200, height: 40 }}
                  autoFocus={true}
                  type={'cpf'}
                  value={cpfUser}
                  onChangeText={text => {
                     setCpfUser(text)
                  }}
                  onSubmitEditing={start}
               />
               {error && <MsgError> CPF INVALIDO </MsgError>}
            </InputArea>

            <ButtomArea>
               <Buttom onPress={start}>
                  <InternalButtom>
                     <Icon name="arrow-right-bold" size={25} color="#fff" style={{marginRight:5}} />
                     <FormText size="15px" color="#fff">Continuar </FormText>
                  </InternalButtom>
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