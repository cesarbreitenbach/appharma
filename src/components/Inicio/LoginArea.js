import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import Items from '../Items'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const Conteiner = styled.View`
width:${wp('98%')}px;
height:${hp('40%')}px;
background-color:#fff;

`;
export const HeaderArea = styled.View`
   width:${wp('98%')}px;
   height:${hp('9%')}px;
   background-color:${props => props.cor || '#3f9168'};
   flex-direction:row;
    border-top-left-radius: 10px
    border-top-right-radius: 10px
`;
export const IconeArea = styled.View`
width:50px;
border-top-left-radius: 20px;
background-color:${props => props.cor || '#3f9168'};
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
font-size:${props => props.size || hp('2.9%') }px;
fontFamily:Roboto Medium;  
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
   width:${wp('50%')}px;
   height:${hp('9%')}px;
   background-color:${props => props.cor || '#3f9168'};
   justify-content:center;
   align-items:center;
   border-radius:10px;
`;
export const ViewButtom = styled.View`
   flex-direction:row;
   justify-content:center;
   align-items:center;
`;

export const FooterArea = styled.View`
   width:${wp('98%')}px;
   height:${hp('10%')}px;
   justify-content:center;
   border-bottom-right-radius: 10px;
   border-bottom-left-radius: 10px;
   background-color:${props => props.cor || '#3f9168'};
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
                    <HeaderText size={hp('2.8%')}>Faça o login ou cadastre-se </HeaderText>
                </HeaderTextArea>
            </HeaderArea>

            <FormArea>
                <ButtomArea>
                    <Buttom cor={corSecundaria} underlayColor="#52d191" onPress={() => props.navigation.navigate('Login')}>
                        <ViewButtom>
                            <Icon name="login" size={25} color="#fff" style={{ marginRight: 5 }} />
                            <Text style={{ fontFamily: 'Roboto Bold', fontSize: 15, color: '#fff' }}>Cadastrar ou Entrar</Text>
                        </ViewButtom>
                    </Buttom>

                </ButtomArea>
            </FormArea>

            <FooterArea cor={corSecundaria}>
                <HeaderText size={hp('2.6%')}>Tenha acesso a todos os nossos descontos </HeaderText>
            </FooterArea>

        </Conteiner>
    )
}

export default LoginArea;