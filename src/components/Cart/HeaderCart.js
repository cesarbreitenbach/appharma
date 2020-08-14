import React from 'react';
import styled from 'styled-components/native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export const CarArea = styled.TouchableOpacity`
   align-self:flex-end
   align-items:center
   margin-top:-25px
   margin-right: 5px
`

export const Text = styled.Text`
   font-family:Roboto Medium;
   color:#cbf7d6
   font-size:10px;
`

 
const Cart = (props) => {
   return (
      <CarArea onPress={props.goCart}>
         <Icon name="cart" size={18} color="#fff" />
         <Text>Itens: {props.cart.length} </Text>
      </CarArea>
   )
}

export default Cart;