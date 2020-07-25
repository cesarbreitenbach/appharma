import React from 'react'
import Item from '../../components/Items'
import styled from 'styled-components/native';


export const ProductArea = styled.TouchableHighlight`
   height:100%;
   width:150px;
   padding:5px;
   margin-left:5px;
   background-color:#fff;
   border-radius: 5px;
   justify-content: center;
   align-items:center;
   border:#999 solid 1px;
`;
export const PromoTitle = styled.Text`
   font-size:18px;
   font-weight: bold;
   text-align:center;
   margin-bottom:5px;
`;
export const ProductTitle = styled.Text`
   font-size:16px;
   font-weight: bold;
   text-align:center;
   margin-bottom:5px;
`;
export const FlexPromo = styled.View`
   flex:1;
   justify-content:center;
   align-items:center;
   
`


export const OriginalPrice = styled.Text``;
export const PromoPrice = styled.Text``;

const ItemVitrine = (props) => {

   return (
      <ProductArea underlayColor='#52d191' onPress={() => console.log("clicou na oferta")}>
         <>
          <FlexPromo>
               {props.data.produto.image && <Item radius="60px" resizeMode='cover' width="125px" height="125px" source={{uri:props.data.produto.image.url}}  />}
               {!props.data.produto.image && <Item width="90px" height="90px" source={require('../../assets/nopicture.png')} />}  
          </FlexPromo>
              
            <FlexPromo>
               <ProductTitle >{props.data.produto.nome}</ProductTitle>
               <OriginalPrice>de {props.data.produto.valor_venda}</OriginalPrice>
               <PromoPrice>por {props.data.preco_promocao}</PromoPrice>
            </FlexPromo>
         </>
      </ProductArea>
   )
}

export default ItemVitrine;