import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux'
import HeaderCart from '../Cart/HeaderCart'
import p from '../../config/padroes'

export const Conteiner = styled.View`
   background-color:${p.corPrincipal}
`
const Text = styled.Text`
   font-size:${props => props.size || "14px"};
   color:${props => props.color || "#000"};
`

const Header = props => {
   return (
      <Conteiner>
         <Text style={{ textAlign: 'center' , fontFamily:'Roboto Black', fontSize:16, color:'#fff'}}>Sua Farmacia Online</Text>
         {props.status &&
         <HeaderCart cart={props.cart} goCart={props.goCart} />}
      </Conteiner>
   )
}
const mapStateToProps = (state) => {
   return {
      status: state.authReducer.status,
      cart: state.cartReducer.cart,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setActivePage: (activePage) => dispatch({ type: 'SET_ACTIVE', payload: { activePage } }),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
