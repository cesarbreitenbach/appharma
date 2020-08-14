import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import HeaderCart from '../Cart/HeaderCart'



const Conteiner = styled.View`
   flex:1;
   width:100%;
   height:40px;
   flex-direction:row;
   padding:5px;
   padding-top:8px;
   justify-content:center;
`

const InputSearch = styled.TextInput`
   border:1px solid #ddd;
   width:300px;
   height:30px;
   padding:5px;
   margin-top:5px;
   background-color:#fff
   border-radius:10px;
`;

const ButtonSearch = styled.TouchableOpacity`
   width: 40px;
   height: 40px;
   margin-right:5px;
`

const CartArea = styled.View`
   width:50px;
   height:50px;
   margin-top:22px;
`



const SearchBar = props => {

   return (
      <Conteiner>
         <InputSearch />
         <ButtonSearch activeOpacity={0.7}>
            <Icon name="search" size={35} style={{ marginLeft: 3, color: '#eee' }} />
         </ButtonSearch>
         {props.status &&
         <CartArea>
            <HeaderCart cart={props.cart} goCart={props.goCart} />
         </CartArea>
         }
      </Conteiner>
   )
}
const mapStateToProps = (state) => {
   return {
      activePage: state.tabReducer.activePage,
      token: state.authReducer.token,
      cart: state.cartReducer.carrinho,
      status: state.authReducer.status,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setActivePage: (activePage) => dispatch({ type: 'SET_ACTIVE', payload: { activePage } }),
      setPromocoes: (promocoes) => dispatch({ type: 'SET_PROMOCOES', payload: { promocoes } })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
