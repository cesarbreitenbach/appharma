import React, {useEffect, useState} from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import ItemVitrine from '../../components/Inicio/ItemVitrine'
import Items from '../Items'
import {connect, useSelector} from 'react-redux'
import {ActivityIndicator} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const Conteiner = styled.View` 
    background-color:#eee;
    height:${hp('63.5%')}px;
    padding:${hp('0.5%')}px;
`;
export const HeaderPromo = styled.View`
   background-color:${props => props.cor || '#3f9168'};
   width:${wp('98%')}px;
   height:${hp('5.5%')}px;
   justify-content:center;
   align-items:center;
   padding:${hp('0.5%')}px;
   border-top-left-radius: 10px;
   border-top-right-radius: 10px;
   flex-direction:row;

`;

export const HeaderTextArea = styled.View`
justify-content:center;
align-items:center;
padding:${hp('0.5%')}px;
`;
export const IconeArea = styled.View`
width:40px;
border-top-left-radius: 35px;
background-color:${props => props.cor || '#3f9168'};
justify-content:center;
align-items:center;
margin-left:15px;
margin-top:19px;
`;
export const HeaderArea = styled.View`
   width:${wp('98%')}px;
   height:${hp('5%')}px;
   background-color:#04c2b5;
   border-top-left-radius: 35px;
   flex-direction:row;
   
`;
export const HeaderText = styled.Text`
font-family: Roboto Medium;
color:${props => props.color || '#eee'};
font-size:${props => props.size || '17px'};
font-weight:bold;
text-align:center;
`;
export const ProductScroll = styled.FlatList`
   background-color:#eee;
   flex:1
`;
export const Nodata = styled.View`
  
   justify-content:center;
   align-items:center;
   padding:5px;
   height:100%;

` 


const Vitrine = props => {

   let welcome = 'Top ofertas da semana';
   const corSecundaria = useSelector(state => state.shopReducer.cor_secundaria)

   if(props.status){
      welcome = 'Ofertas especias para você';
   }

   return (
      <>
         <HeaderPromo cor={corSecundaria}>
            <IconeArea cor={corSecundaria}><Items width="25px" height="25px" source={require('../../assets/offinicial.png')} /></IconeArea>
            <Text style={{ fontSize: 18, color: '#fff', fontFamily:'Roboto Medium' }}>{welcome}</Text>
         </HeaderPromo>
         <Conteiner>
           {props.promocoes.length == 0 ?
            <Nodata>
               <HeaderText color="#000" size="14px" style={{marginBottom:5}}>Estamos trabalhando em suas promoções</HeaderText>
               <ActivityIndicator size="large" color="#ddd" />
               <HeaderText  color="#000" size="14px" style={{marginTop:5}}>Volte mais tarde</HeaderText>
            </Nodata> 
            : 
            <ProductScroll horizontal={true}
               showsHorizontalScrollIndicator={false}
               data={props.promocoes.produtos}
               renderItem={({ item }) => <ItemVitrine data={item} navigation={props.navigation} />} 
               keyExtractor={(item) => item.id.toString()}
               decelerationRate="fast"
               maxToRenderPerBatch={20}
               snapToInterval={130}
               >     
            </ProductScroll>
         }

         </Conteiner>

      </>
   )
}

const mapStateToProps = (state) => {
   return {
      promocoes: state.vitrineReducer.promocoes,
      status: state.authReducer.status
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      setPromocoes: (promocoes) => dispatch({ type: 'SET_PROMOCOES', payload: { promocoes } })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vitrine);