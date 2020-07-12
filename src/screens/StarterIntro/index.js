import React, { useState } from 'react';
import { AddImg, ConfigArea, AvatarArea, UserAvatar, Conteiner, WelcomeText, DescText, TextButtom, MsgError} from './styled'
import DefaultButtom from '../../components/defaultButtom'
import { TextInputMask } from 'react-native-masked-text'
import { connect } from 'react-redux'
import ValidateCpf from '../../helpers/CpfValidator'

const Page = (props) => {
   const [cpfUser, setCpfUser] = useState('');
   const [error, setError] = useState(false);
   const start = () => {
      console.log("Vou validar...")
      if (!ValidateCpf(cpfUser)){
         setError(true)
         return
      }
      props.setCpf(cpfUser);
      props.navigation.navigate('StarterName');
      setError(false)
   }

   return (
      <Conteiner>
         <WelcomeText>Perfil do Usuario</WelcomeText>
         <AvatarArea>
            <UserAvatar source={require('../../assets/avatar.jpg')} />
            <DefaultButtom width="90" height="25" bgcolor="#7159c1" onPress={() => console.log("clicou")} underlayColor="#9d80ff" style={{ marginTop: 10, padding:2 }}>
               <AddImg>
                  Alterar Imagem
               </AddImg>
            </DefaultButtom>
         </AvatarArea>
         <DescText>Digite seu cpf para começar...</DescText>
         <ConfigArea>

            <TextInputMask
               style={{width:200, height:40}}
               autoFocus={true}
               type={'cpf'}
               value={cpfUser}
               onChangeText={text => {
                  setCpfUser(text)
               }}
            />
            {error && <MsgError> CPF INVALIDO </MsgError>}

            <DefaultButtom width="100%" bgcolor="#7159c1" onPress={start} underlayColor="#9d80ff">
               <TextButtom>
                  Proximo
               </TextButtom>
            </DefaultButtom>
         </ConfigArea>
      </Conteiner>
   );
}

Page.navigationOptions = {
   headerShown: false
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