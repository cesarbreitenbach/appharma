import React from 'react';
import styled from 'styled-components/native';
import Items from '../Items'
import {Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {connect, useSelector} from 'react-redux'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const BuyNowArea = styled.View`
   width:${wp('98%')}px;
   height:${hp('30%')}px;
   background-color:#FFF;

   margin-bottom:10px;
   margin-top:5px;

   border-radius:35px;
   
`;
export const HeaderTextArea = styled.View`
justify-content:center;
align-items:center;
padding:${hp('2.8%')}px;
`;
export const IconeArea = styled.View`
width:50px;
border-radius: 35px;
background-color:${props => props.cor || '#3f9168'};
justify-content:center;
align-items:center;
margin-left:15px;
`;
export const HeaderArea = styled.View`
   width:${wp('98%')}px;
   height:${hp('8.6%')}px;
   background-color:${props => props.cor || '#3f9168'};
   border-top-left-radius: 10px;
   border-top-right-radius: 10px;
   flex-direction:row;
   justify-content:center;
   align-items:center

   
`;
export const FooterArea = styled.View`
   width:${wp('98%')}px;
   height:${hp('7%')}px;
   padding:${hp('2%')}px;
   border-bottom-right-radius: 10px;
   border-bottom-left-radius: 10px;
   background-color:${props => props.cor || '#3f9168'};
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
   width:${wp('50%')}px;
   height:${hp('9%')}px;
   background-color:${props => props.cor || '#3f9168'};
   justify-content:center;
   align-items:center;
   border-radius:15px;
`;
export const HeaderText = styled.Text`
color:#fff;
font-size:${props=>props.size || hp('2.9%')}px;
fontFamily:Roboto Medium; 
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

const BuyNow = (props) => {

    const corSecundaria = useSelector(state => state.shopReducer.cor_secundaria)

   const handleGoShop = (iconTab) =>{
      props.setActivePage(iconTab)
      props.navigation.navigate('ShopStack')
   }

    return (
      <BuyNowArea >
               <HeaderArea cor={corSecundaria} >
                  <IconeArea cor={corSecundaria}><Items width="30px" height="30px" source={require('../../assets/ecommerce.png')} /></IconeArea>
                  <HeaderTextArea>
                     <HeaderText style={{marginTop:hp('2.8%')}}>Compre pelo aplicativo </HeaderText>
                  </HeaderTextArea>
               </HeaderArea>
               <ImageArea source={require('../../assets/loja.jpg')} >
                  <ButtomArea>
                     <BuyNowButtom cor={corSecundaria} underlayColor="#52d191" onPress={() => handleGoShop('shopping-cart')}>
                        <ViewButtom>
                           <Icon name='shopping-cart' size={25} color="#fff" style={{marginRight:5}}/>
                           <Text style={{ fontFamily:'Roboto Bold', fontSize:15, color: '#fff' }}>Ir às Compras</Text>
                        </ViewButtom>
                     </BuyNowButtom>
                  </ButtomArea>
               </ImageArea>
               <FooterArea  cor={corSecundaria} >
                     <HeaderText size={hp('2.6%')}>Receba em casa ou retire na loja! </HeaderText>
                </FooterArea>
            </BuyNowArea>
    )
}


const mapStateToProps = (state) => {
   return {
      activePage: state.tabReducer.activePage
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setActivePage: (activePage) => dispatch({ type: 'SET_ACTIVE', payload: { activePage } })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyNow);