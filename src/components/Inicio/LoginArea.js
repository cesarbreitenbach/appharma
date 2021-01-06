import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import Items from '../Items'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux'

export const Conteiner = styled.View`
width:100%;
height:200px;
background-color:#fff;

margin-bottom:10px;
margin-top:5px;


border-top-left-radius: 20px


`;
export const HeaderArea = styled.View`
   width:100%;
   height:55px;
   background-color:${ props => props.cor || '#3f9168'};
   border-top-left-radius: 20px;
   flex-direction:row;
   
`;
export const IconeArea = styled.View`
width:50px;
border-top-left-radius: 20px;
background-color:${ props => props.cor || '#3f9168'};
justify-content:center;
align-items:center;
margin-left:15px;
`;
export const HeaderTextArea = styled.View`
justify-content:center;
align-items:center;
padding:10px;
`;
export const HeaderText = styled.Text`
color:#fff;
font-size:${props=>props.size || '17px'};;
fontFamily:Ubuntu Bold Italic  
text-align:center;
`;

export const FormArea = styled.View`
width:100%;
height:120px;
justify-content:center;
align-items:center;
`;
export const ButtomArea = styled.View`
justify-content:center;
align-items:center;

`;
export const Buttom = styled.TouchableHighlight`
   width:200px;
   height:50px;
   background-color:${ props => props.cor || '#3f9168'};
   justify-content:center;
   align-items:center;
   border-radius:15px;
`;
export const ViewButtom = styled.View`
   flex-direction:row;
   justify-content:center;
   align-items:center;
`;

export const FooterArea = styled.View`
   width:100%; 
   height:15px;
   border-bottom-right-radius: 35px;
   background-color:${ props => props.cor || '#3f9168'};
   `;


const LoginArea = props => {

    const corSecundaria = useSelector(state => state.shopReducer.cor_secundaria)

    const go = (route) => {
        props.navigation.navigate(route);
    }

    return (
      <Conteiner>
      <HeaderArea cor={corSecundaria}>
         <IconeArea cor={corSecundaria}><Items width="30px" height="30px" source={require('../../assets/senha.png')} /></IconeArea>
         <HeaderTextArea>
            <HeaderText >Faça o login ou cadastre-se </HeaderText>
            <HeaderText size="14px">Tenha acesso a todos os nossos descontos </HeaderText>
         </HeaderTextArea>
      </HeaderArea>

      <FormArea>
         <ButtomArea>
            <Buttom cor={corSecundaria} underlayColor="#52d191" onPress={() => props.navigation.navigate('Login')}>
               <ViewButtom>
                  <Icon name="login"  size={25} color="#fff" style={{marginRight:5}} />
                  <Text style={{ fontFamily:'Roboto Bold', fontSize:15, color: '#fff' }}>Cadastrar ou Entrar</Text>
               </ViewButtom>
            </Buttom>

         </ButtomArea>
      </FormArea>

      <FooterArea  cor={corSecundaria} />

   </Conteiner>
    )
}

export default LoginArea;