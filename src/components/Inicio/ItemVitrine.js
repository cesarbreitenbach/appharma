import React from 'react'
import Item from '../../components/Items'
import styled from 'styled-components/native';
import StrCaptalize from '../../helpers/StrCaptalize'

export const ProductArea = styled.TouchableHighlight`
   height:100%;
   width:125px;
   padding:5px;
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
   font-size:15px;
   text-align:center;
   margin-bottom:5px;
   margin-top:5px;
   font-family:'Ubuntu Medium';
`;
export const BadgeArea = styled.View`
   flex-direction:row;
   
`
export const OriginalPrice = styled.Text`
   font-size:12px;
   text-align:center;
   text-decoration: line-through;
   margin-bottom:5px;
   margin-top:5px;
   color:#ff0000;
   font-family:Roboto Medium;
`;
export const PromoPrice = styled.Text`
font-size:15px;
text-align:center;
margin-bottom:5px;
margin-top:5px;
color:#282e29;
font-family:Roboto Bold;
`;

const badgeOff = styled.Text`
   font-size:14px;
   color:#fff;
   font-weight:bold;

   `

const ItemVitrine = (props) => {

  // let percentOff = parseFloat(props.data.percent);



   return (
      <ProductArea underlayColor='#52d191' onPress={() => console.log("clicou na oferta")}>
         <>
               {props.data.image && <Item style={{marginTop:5}} radius="60px" resizeMode='cover' width="95px" height="95px" source={{uri:props.data.image}}  />}
               {!props.data.image && <Item style={{marginTop:5}} width="95px" height="95px" source={require('../../assets/nopicture.png')} />}  
         
               <ProductTitle >{StrCaptalize(props.data.nome)}</ProductTitle>
               <OriginalPrice>de {props.data.valor_venda}</OriginalPrice>
               <PromoPrice >por {props.data.preco_promocao}</PromoPrice>
               {/* <badgeOff>{percentOff.toFixed(2)}</badgeOff> */}

         </>
      </ProductArea>
   )
}

export default ItemVitrine;