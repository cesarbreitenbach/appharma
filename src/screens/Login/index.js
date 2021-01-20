import React, { useState } from 'react';
import { Conteiner, LogoArea, LogoText, Logo, FormArea, InputArea, FormText, ButtomArea, Buttom, MsgError, InternalButtom } from './styled'
import { ActivityIndicator } from 'react-native'
import ValidateCpf from '../../helpers/CpfValidator'
import { TextInputMask } from 'react-native-masked-text'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import useApi from '../../helpers/apiAppharma'



const Login = (props) => {

   const [cpfUser, setCpfUser] = useState('');
   const [error, setError] = useState(false);
   const appharma = useApi()

   const start =  async () => {
      setError(false)
      if (!ValidateCpf(cpfUser)){
         setError(true)
         return
      }
      let parsedCpf = cpfUser;

      parsedCpf = parsedCpf.replace('.', '').replace('.', '').replace('-', '');

      const infoUser = await appharma.getUser(parsedCpf)

      if (infoUser.success) {
        props.setName(infoUser.user.nome)
        props.setId(infoUser.user.id)
        props.setCpf(parsedCpf)
        props.setWhats(infoUser.user.whatsapp)
        props.navigation.navigate('ConfirmPassword');
    } else {
        props.setName('')
        props.setCpf(parsedCpf)
        props.navigation.navigate('ConfirmPassword');
    }

   }

   return (
      <Conteiner>
         <LogoArea>
            <Logo source={require('../../assets/logo.png')} />
            <LogoText size="12px" >Farmácia On Pocket</LogoText>
         </LogoArea>

         <FormArea>
            <InputArea>
               <FormText >Digite seu CPF para começar uma experiência incrivel com nossos serviços online</FormText>
               <TextInputMask
                   style={{ width: '100%', height: 40, borderWidth: 1, marginTop: 5, borderRadius: 10, padding: 5 }}
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
      whatsapp: state.userReducer.whatsapp
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setCpf: (cpf) => dispatch({ type: 'SET_CPF', payload: { cpf } }),
      setName: (name) => dispatch({ type: 'SET_NAME', payload: { name } }),
      setId: (id) => dispatch({ type: 'SET_ID', payload: { id } }),
      setWhats: (whatsapp) => dispatch({ type: 'SET_USER_WHATS', payload: { whatsapp } }),

   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);