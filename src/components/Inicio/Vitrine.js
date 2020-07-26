import React, {useEffect, useState} from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import ItemVitrine from '../../components/Inicio/ItemVitrine'
import Items from '../Items'
import padrao from '../../config/padroes'
import {connect} from 'react-redux'



const Conteiner = styled.View`
    background-color:#fff;
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
   height:50px;
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
width:50px;
border-top-left-radius: 35px;
background-color:${padrao.corPrincipal || '#3f9168'};
justify-content:center;
align-items:center;
margin-left:15px;
`;
export const HeaderArea = styled.View`
   width:100%;
   height:45px;
   background-color:#04c2b5;
   border-top-left-radius: 35px;
   flex-direction:row;
   
`;
export const HeaderText = styled.Text`r
color:#eee;
font-size:${props => props.size || '17px'};;
font-weight:bold;
text-align:center;
`;
const ProductScroll = styled.FlatList`
flex:1;
`;



const Vitrine = props => {

   console.log(props.status)
   let welcome = 'Top ofertas da semana';

   if(props.status){
      welcome = 'Ofertas especias para você';
   }

   return (
      <>
         <HeaderPromo>
            <IconeArea><Items width="30px" height="30px" source={require('../../assets/offinicial.png')} /></IconeArea>
            <Text style={{ fontSize: 18, color: '#fff', fontWeight:'bold' }}>{welcome}</Text>
         </HeaderPromo>
         <Conteiner>

            <ProductScroll horizontal={true}
               showsHorizontalScrollIndicator={false}
               data={props.promocoes}c
               renderItem={({ item }) => <ItemVitrine data={item} />} 
               keyExtractor={(item) => item.id.toString()}>

            </ProductScroll>

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