import React, { useState } from 'react';
import { Alert } from 'react-native'
import { Container, ItensOnCart, InfoArea, TotalArea, Buttom, Text } from './styled.js';
import HeaderTitle from '../../components/HeaderTitle'
import HeaderCart from '../../components/Cart'
import Product from '../../components/Cart/Product'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'

const Cart = (props) => {

   const [error, setError] = useState(false)
   const [errorMsg, setErrorMsg] = useState("")
   const [qtdCart, setQtdCart] = useState(props.cart.length)
   const [visible, setVisible] = useState(true)

   const vTotal = props.total

   const ClearCartConfirm = () => {
      Alert.alert(
         'Esvaziar',
         'Deseja realmente esvaziar o carrinho?',
         [
            {
               text: 'Confirmar',
               onPress: () => {
                  console.log('Confirmou')
                  props.clearCart();
               } 
            },
            {
               text: 'Cancelar',
               onPress: () => {
                  console.log('Cancel Pressed')
               },
               style: 'cancel'
            }
         ],
         { cancelable: false }
      );
   }

   const goCheckout = () => {
      if (!props.status) {
         setError(true)
         setErrorMsg("Efetue o login ou cadastre-se gratis")
         return
      }
      console.log("Efetuando a compra....")

   }

   const goToShop = () => {
      props.navigation.navigate('Shop')
   }

   const goClearCart = () => {
      ClearCartConfirm()
   }

   return (
      <Container>

            <ItensOnCart
               showsVerticalScrollIndicator={false}
               data={props.cart}
               renderItem={({ item, index }) => <Product data={item} navigation={props.navigation} setQtdProduto={setQtdCart} />}
               decelerationRate="fast"
               maxToRenderPerBatch={20}
               snapToInterval={130}
               keyExtractor={(item, index) => `${item.nome}-${index}`}
            />



         <InfoArea>
            <TotalArea>
               <Text style={{ fontFamily: 'Roboto Black', fontSize: 17, color: '#000' }}>Valor Total:</Text>
               <Text style={{ fontSize: 19, color: '#000' }}>R$ {vTotal.toFixed(2)}</Text>
            </TotalArea>
            <Buttom activeOpacity={0.7} onPress={goClearCart}>
               <Icon name="cart-remove" size={20} color="#fff" />
               <Text size="12px">Esvaziar</Text>
            </Buttom>
            <Buttom activeOpacity={0.7} onPress={goCheckout}>
               <Icon name="cart-arrow-right" size={20} color="#fff" />
               <Text size="12px">Finalizar</Text>
            </Buttom>
         </InfoArea>
      </Container>


   )
}

Cart.navigationOptions = ( {navigation} ) =>{
   const goCart = () => {
      navigation.navigate('Cart')
   }
   return{
     headerRight: () => <HeaderCart goCart={goCart} />,
     headerTitle: () => <HeaderTitle />,
     headerTintColor: '#fff'
   }
}

const mapStateToProps = (state) => {
   return {
      cart: state.cartReducer.carrinho,
      status: state.authReducer.status,
      total: state.cartReducer.total
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      addCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: { carrinho: product } }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);