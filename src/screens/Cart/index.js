import React, {useState} from 'react';
import { Container, Header, ItensOnCart, InfoArea, TotalArea, Buttom, Text, IconBackArea, IconCartArea } from './styled.js';
import HeaderCart from '../../components/Cart/HeaderCart'
import Product from '../../components/Cart/Product'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

const Cart = (props) => {

   const [error, setError] = useState(false)
   const [errorMsg, setErrorMsg] = useState("")

   const vTotal = props.total

   const goCheckout = () => {
      if (!props.status){
         setError(true)
         setErrorMsg("Efetue o login ou cadastre-se gratis")
         return
      }
      console.log("Efetuando a compra....")
      
   }

   const goToShop = () => {
      props.navigation.navigate('Shop')
   }


   return (
      <Container>
         <Header>
            <IconBackArea onPress={goToShop}>
               <Icon2 name="arrow-back" size={25} color="#fff" />
            </IconBackArea>
            <Text style={{ textAlign: 'center' }}>Seu carrinho de compras</Text>
            <HeaderCart cart={props.cart} /> 
         </Header>

         <ItensOnCart
            showsVerticalScrollIndicator={false}
            data={props.cart}
            renderItem={({ item }) => <Product data={item} navigation={props.navigation} />}
            decelerationRate="fast"
            maxToRenderPerBatch={20}
            snapToInterval={130}
            keyExtractor={(item) => item.carrinho.id.toString()}
         />


         <InfoArea>
            <TotalArea>
               <Text style={{ fontFamily: 'Roboto Black', fontSize: 16, color: '#000' }}>Valor Total:</Text>
               <Text style={{ fontSize: 18, color: '#000' }}>R$ {vTotal.toFixed(2)}</Text>

            </TotalArea>
            <Buttom activeOpacity={0.7} onPress={goCheckout}>
               <Icon name="cart-arrow-right" size={25} color="#fff" />
               <Text>Finalizar Compra</Text>
            </Buttom>
         </InfoArea>
      </Container>


   )
}

Cart.navigationOptions = {
   headerShown: false,
   tabBarVisible: false
}

const mapStateToProps = (state) => {
   return {
      cart: state.cartReducer.carrinho,
      status:state.authReducer.status,
      total: state.cartReducer.total
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      addCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: { carrinho:product } })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);