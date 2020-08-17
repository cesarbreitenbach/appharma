import React from 'react';
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {connect} from 'react-redux'

const AreaIcone = styled.TouchableOpacity`
   width:30px;
   height:30px;
   margin-right:10px;
`
const Text = styled.Text`
   font-size: ${props => props.size || "16px"}
   color: ${props => props.color || "#fff"}
   font-family:Roboto Medium
`

const Badge = styled.View`
   width:15px;
   height:15px;
   background-color: rgba(255, 0, 0, 0.7)
   border-radius:8px
   justify-content:center;
   align-items:center;
   margin-left: 13px;
   margin-top: -31px;
`

const Cart = (props) => {
  return (
   <AreaIcone onPress={() => { props.goCart() }}>
   <>
      <Icon name="cart" size={25} color="#fff" />
      {props.cart.length > 0 &&
         <Badge>
            <Text size="9px">{props.cart.length} </Text>
         </Badge>}
   </>
</AreaIcone>

  )
}

const mapStateToProps = (state) => {
   return {
      cart: state.cartReducer.carrinho,
      activePage: state.tabReducer.activePage,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {

   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);