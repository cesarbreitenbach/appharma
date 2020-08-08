import React, {useEffect, useState} from 'react'
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import {ActivityIndicator} from 'react-native'
import Item from '../../components/Items'
import d from '../../config/padroes'

const Conteiner = styled.TouchableOpacity`
    background-color: #f2f2f2
    border:1px solid #ddd
    width: 170px ;
    height: 225px ;
    margin:5px;
    padding-left:3px;
    padding-right:3px;
    border-radius:10px;
    justify-content:center;
    align-items:center;
`;

const Title = styled.Text`
   color:#000;
   text-align:center;
   font-size:12px;
   font-family:Ubuntu Bold Italic
   margin-bottom:3px;
`
const Off = styled.Text`
   font-family:Ubuntu Bold
   color:#239636
   font-size:10px;
   margin-bottom:3px;
`
const Preco = styled.Text`
font-family:Ubuntu Light
font-size:9px;
text-decoration:line-through;
`
const PrecoPromo = styled.Text`
font-family:Ubuntu Regular
margin-bottom:3px;
` 

const ItemProduct = props => {


   let desconto =  Number.parseFloat(props.data.discount);

   const handleClick = (id) => {
      props.navigation.navigate('Produto', {id})
   }

   return (
         <Conteiner activeOpacity={0.7} onPress={()=>handleClick(props.data.id)}>
               <Item style={{marginBottom:20}}  radius="50px" resizeMode='stretch' width="100px" height="100px" source={{uri:d.URL_FILES+props.data.image}}  />
               <Title>{props.data.nome}</Title>
               <Off> {desconto.toFixed(2)}% OFF</Off>
               <Preco>de R$ {props.data.preco_original}</Preco>
               <PrecoPromo>por R$ {props.data.preco_vigente}</PrecoPromo>
         </Conteiner>
   )
}

const mapStateToProps = (state) => {
   return {
      status: state.authReducer.status
   };
};

export default connect(mapStateToProps)(ItemProduct);