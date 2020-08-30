import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native'
import { Container, ItensOnCart, InfoArea, TotalArea, Buttom, Text, TipoEntregaArea, Entrega, RadioButtom, ValorEntregaArea } from './styled.js';
import HeaderTitle from '../../components/HeaderTitle'
import HeaderCart from '../../components/Cart'
import Back from '../../components/Back'
import Product from '../../components/Cart/Product'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CheckOut from '../../components/Finalizar/ModalFinalizar'
import AddressModal from '../../components/AddressModal'
import TrocoModal from '../../components/TrocoModal'
import { connect } from 'react-redux'
import FlashMessage from "react-native-flash-message";
import {ErrorArea, Text as TextError} from '../../components/ErrorArea'
import ModalSucesso from '../../components/Finalizar/ModalSucesso'

const Cart = (props) => {

   console.log('lista no redux: ' + JSON.stringify(props.addressList))
   const [error, setError] = useState(false)
   const [errorMsg, setErrorMsg] = useState("")
   const [qtdCart, setQtdCart] = useState(props.cart.length)
   const [modalVisible, setModalVisible] = useState(false)
   const [addressModalVisible, setAddressModalVisible] = useState(false)
   const [radioDelivery, setRadioDelivery] = useState(false)
   const [trocoModalVisible, setTrocoModalVisible] = useState(false)
   const [modalSucessoVisible, setModalSucessoVisible] = useState(false)
   const [checkoutSuccess, setCheckoutSuccess] = useState(false)
   const vTotal = props.total
   
   useEffect(() => {
      setTimeout(() => {
         setErrorMsg('')
      }, 1850)
   }, [errorMsg])


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

   const goCheckout = async () => {

      if (props.cart.length < 1) {
         setErrorMsg('Adicione pelo menos 1 item ao carrinho!')
         return
      }

      if (!radioDelivery){
         props.setTroco(0);
      }
      
      const count = props.addressList.length;

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
            visible={addressModalVisible}
            visibleAction={setAddressModalVisible}
            checkoutAction={setModalVisible}
            userId={props.userId}
            token={props.token}
         />

         <CheckOut
            visible={modalVisible}
            visibleAction={setModalVisible}
            addressAction={setAddressModalVisible}
            delivery={radioDelivery}
            data={props.addressList}
            trocoAction={setTrocoModalVisible}
            successAction={setModalSucessoVisible}
            confirmSuccess={setCheckoutSuccess}
         />

         <TrocoModal
            visible={trocoModalVisible}
            visibleAction={setTrocoModalVisible}
         />

         <ModalSucesso
            visible={modalSucessoVisible}
            visibleAction={setModalSucessoVisible}
            navigation={props.navigation}
            success={checkoutSuccess}
            confirmSuccess={setCheckoutSuccess}
         />

         {errorMsg != '' &&
            <ErrorArea>
               <TextError size="12px" color="#fff" family="Roboto Regular">{errorMsg}</TextError>
            </ErrorArea>}
         <ItensOnCart
            showsVerticalScrollIndicator={false}
            data={props.cart}
            renderItem={({ item, index }) => <Product data={item} navigation={props.navigation} setQtdProduto={setQtdCart} />}
            decelerationRate="fast"
            maxToRenderPerBatch={20}
            snapToInterval={130}
            keyExtractor={(item, index) => `${item.nome}-${index}`}
         />

         {props.cart.length > 0 &&
            <>
               <TipoEntregaArea>
                  <Entrega>
                     <RadioButtom onPress={() => setRadioDelivery(false)} enabled={!radioDelivery} />
                     <Text color="#000">Retirar na loja</Text>
                  </Entrega>
                  <ValorEntregaArea>
                     <Text color="#000">Grátis</Text>
                  </ValorEntregaArea>
               </TipoEntregaArea>

               <TipoEntregaArea>
                  <Entrega>
                     <RadioButtom onPress={() => setRadioDelivery(true)} enabled={radioDelivery} />
                     <Text color="#000">Receber em casa</Text>
                  </Entrega>
                  <ValorEntregaArea>
                     <Text color="#000">R$ 8,00</Text>
                  </ValorEntregaArea>
               </TipoEntregaArea>
            </>
         }



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
         <FlashMessage position="top" animated={true} icon="success" titleStyle={{ color: '#fff' }} />
      </Container>


   )
}

Cart.navigationOptions = ({ navigation }) => {
   const goCart = () => {
      navigation.navigate('Cart')
   }
   return {
      headerRight: () => <HeaderCart goCart={goCart} />,
      headerTitle: () => <HeaderTitle title="Seu Carrinho" />,
      headerLeft: () => <Back navigation={navigation} />
   }
}

const mapStateToProps = (state) => {
   return {
      token: state.authReducer.token,
      cart: state.cartReducer.carrinho,
      status: state.authReducer.status,
      total: state.cartReducer.total,
      userId: state.userReducer.id,
      addressList: state.userReducer.addressList
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      addCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: { carrinho: product } }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      setAddressList: (list) => dispatch({ type: 'SET_ADDRESS', payload: { addressList: list } }),
      setTroco: (troco) => dispatch({ type: 'SET_TROCO', payload: { troco } }),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);