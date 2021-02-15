import React from 'react'
import Item from '../../components/Items'
import styled from 'styled-components/native';
import StrCaptalize from '../../helpers/StrCaptalize'
import {URL_FILES} from '@env'

export const ProductArea = styled.TouchableHighlight`
   width:250px;
   padding:2px;
   margin-left:5px;
   background-color:#fff;
   border-radius: 5px;
   align-items:center;
   border:#999 solid 1px;
`;
export const BadgeText = styled.Text`
   font-size:12px;
   font-weight: bold;
   text-align:center;
   margin-bottom:5px;
`;
export const ProductTitle = styled.Text`
   font-size:13px;
   text-align:center;
   margin-bottom:5px;
   margin-top:5px;
   font-family:'Roboto Medium';
   max-width: 200px;
   
`;
export const BadgeArea = styled.View`
   flex-direction:row;
   
`
export const OriginalPrice = styled.Text`
   font-size:20px;
   text-align:center;
   text-decoration: line-through;
   margin-bottom:1px;
   margin-top:1px;
   color:#ff0000;
   font-family:Roboto Black;
`;
export const PromoPrice = styled.Text`
font-size:28px;
text-align:center;
margin-bottom:5px;
margin-top:5px;
color:#282e29;
font-family:Roboto Black;
`;


const ItemVitrine = (props) => {

   const handleClick = ({id, tipo}) => {
      console.log("Id e tipo: "+id+" "+tipo)
      props.navigation.navigate('Produto', {id, tipo})
   }


   return (
      <ProductArea underlayColor='#ddd' onPress={() => handleClick(props.data)}>
         <>
               {props.data.image && <Item style={{marginTop:5, borderRadius: 5}}  width="200px" height="200px" source={{uri:URL_FILES+props.data.image}}  />}
               {!props.data.image && <Item style={{marginTop:5}} width="200px" height="200px" source={require('../../assets/nopicture.png')} />}  
         
               <ProductTitle >{StrCaptalize(props.data.nome)}</ProductTitle>
               <OriginalPrice>de {parseFloat(props.data.preco_venda).toFixed(2).replace(".", ",")}</OriginalPrice>
               <PromoPrice >por {parseFloat(props.data.preco_promocao).toFixed(2).replace(".", ",")}</PromoPrice>

         </>
      </ProductArea>
   )
}

export default ItemVitrine;