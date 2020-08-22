import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native'
import { Container, ItensOnCart, InfoArea, TotalArea, Buttom, Text, ScrollArea, TipoEntregaArea, Entrega, RadioButtom, ValorEntregaArea } from './styled.js';
import HeaderTitle from '../../components/HeaderTitle'
import HeaderCart from '../../components/Cart'
import Back from '../../components/Back'
import Product from '../../components/Cart/Product'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CartModal from '../../components/ModalFinalizar'
import AddressModal from '../../components/AddressModal'
import { connect } from 'react-redux'
import api from '../../helpers/api'
import FlashMessage from "react-native-flash-message";


const Cart = (props) => {

   const [error, setError] = useState(false)
   const [errorMsg, setErrorMsg] = useState("")
   const [qtdCart, setQtdCart] = useState(props.cart.length)
   const [modalVisible, setModalVisible] = useState(false)
   const [addressModalVisible, setAddressModalVisible] = useState(false)
   const [radioDelivery, setRadioDelivery] = useState(false)

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

   const goCheckout =  async () => {

      const addressList = await api.get('/endereco', {headers:{auth:props.token}})

      const count = addressList.data.length;

      if (count > 0) {
         setModalVisible(true)
      } else {
         setAddressModalVisible(true)
      }


   }

   const goToShop = () => {
      props.navigation.navigate('Shop')
   }

   const goClearCart = () => {
      ClearCartConfirm()
   }

   return (
      <Container>

            <AddressModal 
               title=""
               visible={addressModalVisible}
               visibleAction={setAddressModalVisible}
               userId={props.userId}
               token={props.token}
            />

            <CartModal 
               title=""
               visible={modalVisible}
               visibleAction={setModalVisible}
            />


            <ItensOnCart
               showsVerticalScrollIndicator={false}
               data={props.cart}
               renderItem={({ item, index }) => <Product data={item} navigation={props.navigation} setQtdProduto={setQtdCart} />}
               decelerationRate="fast"
               maxToRenderPerBatch={20}
               snapToInterval={130}
               keyExtractor={(item, index) => `${item.nome}-${index}`}
            />
            <TipoEntregaArea>
               <Entrega>
                  <RadioButtom onPress={() => setRadioDelivery(false)}  enabled={!radioDelivery}/>
                  <Text color="#000">Retirar na loja</Text>
               </Entrega>
               <ValorEntregaArea>
                  <Text color="#000">Grátís</Text>
               </ValorEntregaArea>
            </TipoEntregaArea>
            
            <TipoEntregaArea>
               <Entrega>
                  <RadioButtom onPress = { () => setRadioDelivery(true)}  enabled={radioDelivery}/>
                  <Text color="#000">Receber em casa</Text>
               </Entrega>
               <ValorEntregaArea>
                  <Text color="#000">R$ 8,00</Text>
               </ValorEntregaArea>
            </TipoEntregaArea>




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
         <FlashMessage position="top" animated={true} icon="success" titleStyle={{color:'#fff'}} />     
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
     headerLeft: () => <Back navigation={navigation} />
   }
}

const mapStateToProps = (state) => {
   return {
      token: state.authReducer.token,
      cart: state.cartReducer.carrinho,
      status: state.authReducer.status,
      total: state.cartReducer.total,
      userId: state.userReducer.id
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      addCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: { carrinho: product } }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);