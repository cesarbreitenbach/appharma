import React from 'react'
import Item from '../../components/Items'
import styled from 'styled-components/native';
import StrCaptalize from '../../helpers/StrCaptalize'
import {URL_FILES} from '@env'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const ProductArea = styled.TouchableHighlight`
   width:${wp('46%')}px;
   padding:${hp('1%')}px;
   margin-left:${hp('0.5%')}px;
   background-color:#fff;
   border-radius: 5px;
   align-items:center;
   border:#999 solid 1px;
`;
export const BadgeText = styled.Text`
   font-size:${hp('2%')}px;
   text-align:center;
`;

export const ProductTitle = styled.Text`
   font-size:${hp('1.8%')}px;
   text-align:center;
   margin-bottom:5px;
   margin-top:${hp('1%')}px;
   font-family:'Roboto Medium';
   max-width: ${wp('40%')}px;
   
`;
export const BadgeArea = styled.View`
   flex-direction:row;
   
`
export const OriginalPrice = styled.Text`
   font-size:${hp('3.8%')}px;
   text-align:center;
   text-decoration: line-through;
   margin-bottom:${hp('0.2%')}px;
   margin-top:${hp('0.4%')}px;
   color:#ff0000;
   font-family:Roboto Black;
`;
export const PromoPrice = styled.Text`
font-size:${hp('4.8%')}px;
text-align:center;
margin-top:${hp('0.2%')}px;
color:#177000;
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
               {props.data.image && <Item style={{marginTop:5, borderRadius: 5}}  width={wp('43%')+'px'} height={wp('58%')+'px'} source={{uri:URL_FILES+props.data.image}}  />}
               {!props.data.image && <Item style={{marginTop:hp('5%')}} width={wp('43%')+'px'} height={wp('43%')+'px'} source={require('../../assets/nopicture.png')} />}  
         
               <ProductTitle >{StrCaptalize(props.data.nome)}</ProductTitle>
               <OriginalPrice>R$ {parseFloat(props.data.preco_venda).toFixed(2).replace(".", ",")}</OriginalPrice>
               <BadgeText>por</BadgeText>
               <PromoPrice>R$ {parseFloat(props.data.preco_promocao).toFixed(2).replace(".", ",")}</PromoPrice>

         </>
      </ProductArea>
   )
}

export default ItemVitrine;