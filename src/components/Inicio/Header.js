import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux'
import HeaderCart from '../Cart/HeaderCart'
import p from '../../config/padroes'

export const Conteiner = styled.View`
   background-color:${p.corPrincipal}
   flex-direction:row
`
const Text = styled.Text`
   font-size:${props => props.size || "14px"};
   color:${props => props.color || "#000"};
`
const CartArea = styled.View`
   padding-top:33px
   width:50px;
   height:50px;
`
const HeaderArea = styled.View`
padding-top:10px
   flex:1
`

const Header = props => {
   return (
      <Conteiner>
         <HeaderArea>
            <Text style={{ textAlign: 'center' , fontFamily:'Roboto Black', fontSize:16, color:'#fff'}}>Sua Farmacia Online</Text>
         </HeaderArea>
         {props.status &&
         <CartArea>
            <HeaderCart cart={props.cart} goCart={props.goCart} />
         </CartArea>}
      </Conteiner>
   )
}
const mapStateToProps = (state) => {
   return {
      status: state.authReducer.status,
      cart: state.cartReducer.carrinho,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setActivePage: (activePage) => dispatch({ type: 'SET_ACTIVE', payload: { activePage } }),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
