import React from 'react';
import styled from 'styled-components/native';
import Items from '../Items'
import {Text} from 'react-native'
import padrao from '../../config/padroes'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {connect} from 'react-redux'

export const BuyNowArea = styled.View`
   width:100%;
   height:200px;
   background-color:#FFF;

   margin-bottom:10px;
   margin-top:5px;

   border-radius:35px;
   
`;
export const HeaderTextArea = styled.View`
justify-content:center;
align-items:center;
padding:10px;
`;
export const IconeArea = styled.View`
width:50px;
border-radius: 35px;
background-color:${padrao.corSecundaria || '#3f9168'};
justify-content:center;
align-items:center;
margin-left:15px;
`;
export const HeaderArea = styled.View`
   width:100%;
   height:40px;
   background-color:${padrao.corSecundaria || '#3f9168'};
   border-top-left-radius: 15px;
   border-top-right-radius: 15px;
   flex-direction:row;
   justify-content:center;
   align-items:center

   
`;
export const FooterArea = styled.View`
   width:100%; 
   height:15px;
   border-bottom-right-radius: 15px;
   border-bottom-left-radius: 15px;
   background-color:${padrao.corSecundaria || '#3f9168'};
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
   background-color:${padrao.corSecundaria || '#3f9168'};
   justify-content:center;
   align-items:center;
   border-radius:15px;
`;
export const HeaderText = styled.Text`
color:#fff;
font-size:${props=>props.size || '17px'};;
fontFamily:Ubuntu Bold Italic 
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

   const handleGoShop = (iconTab) =>{
      props.setActivePage(iconTab)
      props.navigation.navigate('ShopStack')
   }

    return (
      <BuyNowArea >
               <HeaderArea>
                  <IconeArea><Items width="30px" height="30px" source={require('../../assets/ecommerce.png')} /></IconeArea>
                  <HeaderTextArea>
                     <HeaderText style={{marginTop:15}}>Compre pelo aplicativo </HeaderText>
                     <HeaderText size="14px">Receba em casa ou retire na loja! </HeaderText>
                  </HeaderTextArea>
               </HeaderArea>
               <ImageArea source={require('../../assets/loja.jpg')} >
                  <ButtomArea>
                     <BuyNowButtom underlayColor="#52d191" onPress={() => handleGoShop('shopping-cart')}>
                        <ViewButtom>
                           <Icon name='shopping-cart' size={25} color="#fff" style={{marginRight:5}}/>
                           <Text style={{ fontFamily:'Roboto Bold', fontSize:15, color: '#fff' }}>Ir às Compras</Text>
                        </ViewButtom>
                     </BuyNowButtom>

                  </ButtomArea>
               </ImageArea>
               <FooterArea />
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