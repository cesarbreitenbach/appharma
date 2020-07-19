import React from 'react';
import styled from 'styled-components/native';
import Items from '../Items'
import {Text} from 'react-native'

export const BuyNowArea = styled.View`
   width:100%;
   height:200px;
   background-color:#FFF;

   margin-bottom:10px;
   margin-top:5px;

   
   border-top-left-radius: 35px
   border-bottom-right-radius: 35px
   
`;
export const HeaderTextArea = styled.View`
justify-content:center;
align-items:center;
padding:10px;
`;
export const IconeArea = styled.View`
width:50px;
border-top-left-radius: 35px;
background-color:#9d80ff;
justify-content:center;
align-items:center;
margin-left:15px;
`;
export const HeaderArea = styled.View`
   width:100%;
   height:65px;
   background-color:#9d80ff;
   border-top-left-radius: 35px;
   flex-direction:row;
   
`;
export const FooterArea = styled.View`
   width:100%; 
   height:15px;
   border-bottom-right-radius: 35px;
   background-color:#9d80ff;
   `
export const ButtomArea = styled.View`
justify-content:center;
align-items:center;

`
export const BuyNowItems = styled.View`
   flex-direction:row;
   justify-content:center;
   align-items:center;
   padding:10px;
`;

export const BuyNowButtom = styled.TouchableHighlight`
   width:200px;
   height:50px;
   background-color:#47ad7a;
   justify-content:center;
   align-items:center;
   border-radius:15px;
`;
export const HeaderText = styled.Text`
color:#eee;
font-size:${props=>props.size || '17px'};;
font-weight:bold;
text-align:center;
`;
export const ImageArea = styled.ImageBackground`
flex:1;
justify-content: center;
`
export const ViewButtom = styled.View`
   flex-direction:row;
   justify-content:center;
   align-items:center;
`;

const BuyNow = props => {

    return (
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
    )
}

export default BuyNow;