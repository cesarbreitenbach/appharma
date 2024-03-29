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
import { connect, useDispatch } from 'react-redux'
import FlashMessage from "react-native-flash-message";
import { ErrorArea, Text as TextError } from '../../components/ErrorArea'
import ModalSucesso from '../../components/Finalizar/ModalSucesso'
import WhatsModal from '../../components/WhatsModal'
// import io from 'socket.io-client';
import useApi from '../../helpers/apiAppharma'
import { useSelector } from 'react-redux'


const Cart = (props) => {

  //  const socket = io('https://approachmobile.company');



    const corPrincipal = useSelector(state => state.shopReducer.cor_primaria)
    const taxa_entrega = useSelector(state => state.shopReducer.taxa_entrega)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [whatsModalVisible, setWhatsModalVisible] = useState(false)
    const [qtdCart, setQtdCart] = useState(props.cart.length)
    const [modalVisible, setModalVisible] = useState(false)
    const [addressModalVisible, setAddressModalVisible] = useState(false)
    const [radioDelivery, setRadioDelivery] = useState(false)
    const [trocoModalVisible, setTrocoModalVisible] = useState(false)
    const [modalSucessoVisible, setModalSucessoVisible] = useState(false)
    const [checkoutSuccess, setCheckoutSuccess] = useState(false)
    const vTotal = props.total
    const whatsapp = useSelector(state => state.userReducer.whatsapp)

    useEffect(() => {
        setTimeout(() => {
            setErrorMsg('')
        }, 2000)
    }, [errorMsg])

    // useEffect(() => {
    //     socket.on('connect', () => {
    //         console.log("Abrindo conexão com socket...")
    //     })

    // }, [codVendaSucesso])


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

        if (!props.status) {
            props.navigation.navigate('Login')
        }


        if (!radioDelivery) {
            props.setTroco(0);
        }

        const count = props.addressList.length;

        if (!whatsapp) {
            setWhatsModalVisible(true)
            return
        }

        if (count > 0 || !radioDelivery) {
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

    // const socketHandlerConfirmSell = (codVenda) => {
    //     setCodVendaSucesso(codVenda)
    //     socket.emit('venda-recebida', codVenda)
    //     console.log("Emit uma mensagem ao servidor confirmando uma venda...")
    // }

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

            <WhatsModal
                visible={whatsModalVisible}
                visibleAction={setWhatsModalVisible}
                userId={props.userId}
                token={props.token}
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
                    <TipoEntregaArea onPress={() => setRadioDelivery(false)}>
                        <Entrega>
                            <RadioButtom enabled={!radioDelivery} />
                            <Text color="#000">Retirar na loja</Text>
                        </Entrega>
                        <ValorEntregaArea>
                            <Text color="#000">Grátis</Text>
                        </ValorEntregaArea>
                    </TipoEntregaArea>

                    <TipoEntregaArea onPress={() => setRadioDelivery(true)} >
                        <Entrega>
                            <RadioButtom enabled={radioDelivery} />
                            <Text color="#000">Receber em casa</Text>
                        </Entrega>
                        <ValorEntregaArea>
                            <Text color="#000">R$ {parseFloat(taxa_entrega).toFixed(2).replace('.', ',')}</Text>
                        </ValorEntregaArea>
                    </TipoEntregaArea>
                </>
            }



            <InfoArea cor={corPrincipal}>
                <TotalArea >
                    <Text style={{ fontFamily: 'Roboto Black', fontSize: 18, color: '#000' }}>Total:</Text>
                    <Text style={{ fontSize: 28, color: '#000' }}>R$ {vTotal.toFixed(2).replace(".", ",")}</Text>
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