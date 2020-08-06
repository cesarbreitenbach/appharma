import React, {useEffect, useState} from 'react'
import { Dimensions } from 'react-native'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import ItemVitrine from '../../components/Inicio/ItemVitrine'
import Items from '../Items'
import padrao from '../../config/padroes'
import {connect} from 'react-redux'
import {ActivityIndicator} from 'react-native'



const Conteiner = styled.View`
    background-color:#eee;
    border:1px solid #ddd
    width:100%;
    height:300px;
    margin-bottom:5px;
    padding:5px;
    border-bottom-left-radius: 15px
    border-bottom-right-radius: 15px
`;
export const HeaderPromo = styled.View`
   background-color:${padrao.corPrincipal || '#3f9168'};
   width:100%;
   height:30px;
   justify-content:center;
   align-items:center;
   padding:10px;
   border-top-left-radius: 15px;
   border-top-right-radius: 15px;
   flex-direction:row;

`;

export const HeaderTextArea = styled.View`
justify-content:center;
align-items:center;
padding:10px;
`;
export const IconeArea = styled.View`
width:40px;
border-top-left-radius: 35px;
background-color:${padrao.corPrincipal || '#3f9168'};
justify-content:center;
align-items:center;
margin-left:15px;
margin-top:19px;
`;
export const HeaderArea = styled.View`
   width:100%;
   height:40px;
   background-color:#04c2b5;
   border-top-left-radius: 35px;
   flex-direction:row;
   
`;
export const HeaderText = styled.Text`
color:${props => props.color || '#eee'};
font-size:${props => props.size || '17px'};
font-weight:bold;
text-align:center;
`;
export const ProductScroll = styled.FlatList`
   background-color:#eee;
   opacity:0.8;
   flex:1
`;
export const Nodata = styled.View`
  
   justify-content:center;
   align-items:center;
   padding:5px;
   height:100%;

` 


const Vitrine = props => {

   const tamanhoTotal = Dimensions.get('window').width;
   let welcome = 'Top ofertas da semana';

   if(props.status){
      welcome = 'Ofertas especias para você';
   }

   return (
      <>
         <HeaderPromo>
            <IconeArea><Items width="25px" height="25px" source={require('../../assets/offinicial.png')} /></IconeArea>
            <Text style={{ fontSize: 18, color: '#fff', fontFamily:'Roboto Black Italic' }}>{welcome}</Text>
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
               data={props.promocoes}
               renderItem={({ item }) => <ItemVitrine data={item} />} 
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