import React, { useState, useEffect } from 'react'
import { Modal, Linking, ActivityIndicator } from "react-native";
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons'
import IconAwesome from 'react-native-vector-icons/FontAwesome5'
import AddressItem from './AddressItem'
import { connect, useSelector } from 'react-redux'
import { ErrorArea, Text as TextError } from '../../components/ErrorArea'
import useApi from '../../helpers/apiAppharma'
import api from '../../helpers/api'
import { URL_FILES } from '@env'


export const ActivityArea = styled.View`
   align-items:center;
   justify-content:center;
   flex:1;
`

const ModalArea = styled.KeyboardAvoidingView`
   flex:1;
   background-color:#fff
`
const ModalHeader = styled.View`
   flex-direction:row;
   background-color:${props => props.cor || '#ddd'}
   
`;
const AreaBack = styled.View`
   width:50px;
   height:50px;
`
const Buttom = styled.TouchableOpacity`
   height:50px;
   width:50px;
   margin-left:10px;
   margin-top:10px;
`
const Text = styled.Text`
   font-family:${props => props.family || 'Roboto Medium'};
   font-size:${props => props.size || "14px"}
   color:${props => props.color || "#000"}
   margin-top:2px
`
const AreaText = styled.View`
   flex:1
   justify-content: center;
   align-items:center;
`

const EnderecoArea = styled.View`

   background-color:#999
`

const TitleArea = styled.View`
   flex-direction:row
   justify-content:space-between
   align-items:center;
   padding:5px
   background-color:${props => props.cor || '#ddd'}
`

const TitleEndereco = styled.View`
   flex-direction:row
   justify-content:space-between
   align-items:center;
   padding:3px
   background-color:${props => props.cor || '#ddd'}
`

const AreaButtom = styled.TouchableOpacity`

   width:45px;
   justify-content:center;
   align-items:center;
`

const RevisaoArea = styled.View`
   flex:1

`
const ScrollRevisao = styled.ScrollView`
   height:190px

   
`
const ScrollEndereco = styled.ScrollView`
   height:80px
`

const ProdutoArea = styled.View`
   flex-direction:row;   
   margin-top:10px
   border-bottom-width:1px;
   border-bottom-color:#ddd
   background-color: ${props => props.semSaldo == 1 ? '#ff0000' : '#fff'};
`
const ImageArea = styled.View`
   padding:5px
   width:70px;

`
const ProdutoInfo = styled.View`
   width:275px
`
const ProdutoImage = styled.Image`
   width:60px;
   height:60px;
`
const TotaisArea = styled.View`

   justify-content:center

`
const TotaisInfo = styled.View`
   flex-direction:row;
   padding:5px 10px;
   height:50px
   margin-top:10px;
   margin-bottom:10px;

`

const AreaCheckoutButtom = styled.View`
   height:60px
   background-color:${props => props.cor || '#ddd'}
   justify-content:center;
   align-items:center;
`
const CheckoutButtom = styled.TouchableOpacity`
   width:165px;
   height:38px;
   flex-direction:row;
   background-color:#3f9168
   border-radius:10px;
   justify-content:center;
   align-items:center;
  
`

const TotalArea = styled.View`
   flex:1
   justify-content:center;
   align-items:center;
`
const SubArea = styled.View`
   
   justify-content:center;
   align-items:center;
`
const TipoPgtoArea = styled.View`
   flex-direction:row
   justify-content:space-around
   padding:10px
   
`
const CartaoArea = styled.TouchableOpacity`

justify-content:center;
align-items:center;
width:90px;
height:60px;
background-color:${props => props.cor || '#3f9168'};

border-radius:5px

border-color:${props => props.enabled ? '#326ded' : props.cor}
border-width:2px
`
const DinheiroArea = styled.TouchableOpacity`

justify-content:center;
align-items:center;
width:90px;
height:60px;
background-color:${props => props.cor || '#ddd'}

border-radius:5px
border-color:${props => props.enabled ? '#326ded' : props.cor}
border-width:2px
`
const TrocoArea = styled.View`

justify-content:center;
align-items:center;
width:100px;
height:60px;
background-color:${props => props.cor || '#ddd'}
border-radius:7px
flex-direction:row
`



const SubtrocoArea = styled.View`
 justify-content:center;
 align-items:center;
 padding:5px

`

const BodyArea = styled.View`
   flex:1
`

const TipoPgto = styled.View`
   width:100%
   background-color:#fff
   justify-content:center;

`

const ModalFinalizar = ({ data, visible, visibleAction, addressAction, setAddress, delivery, cart, total, token, trocoAction, getTroco, troco, endereco, taxaEntrega, successAction, confirmSuccess, socketHandler }) => {

    const whatsapp = useSelector(state => state.shopReducer.whatsapp)
    const taxa_entrega = useSelector(state => state.shopReducer.taxa_entrega)
    const corPrincipal = useSelector(state => state.shopReducer.cor_primaria)
    const corSecundaria = useSelector(state => state.shopReducer.cor_secundaria)

    const [addressList, setAddressList] = useState(data)
    const [errorMsg, setErrorMsg] = useState('')
    const [idAddress, setIdAddress] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [descontoTotal, setDescontoTotal] = useState(0)
    const [tipoPgto, setTipoPgto] = useState(false)
    const [loading, setLoading] = useState(false)
    const [totalGeral, setTotalGeral] = useState(0)


    const appharma = useApi();

    useEffect(() => {
        setTimeout(() => {
            setErrorMsg('')
        }, 1950)
    }, [errorMsg])

    useEffect(() => {
        let vSubTotal = 0;
        let vDesconto = 0;

        const getTotais = async () => {
            await cart.map((i, k) => {
                vSubTotal += parseFloat(i.preco_original) * parseInt(i.qtd)
                vDesconto += (parseFloat(i.preco_original) * parseInt(i.qtd)) - (parseFloat(i.preco_vigente) * parseInt(i.qtd))
            });
            setSubTotal(vSubTotal)
            setDescontoTotal(vDesconto)
            let totalAux = vSubTotal - vDesconto;
            if (delivery) {
                totalAux = totalAux + parseFloat(taxa_entrega);
            }
            setTotalGeral(totalAux)


        }
        getTotais();

    }, [delivery])

    useEffect(() => {
        setIdAddress(endereco.id)

    }, [idAddress])

    const handleClose = () => {
        console.log("Fechei o modal..")
        visibleAction(false)
    }
    const handleAddAddress = () => {
        if (addressList.length > 2) {
            setErrorMsg('Limite de endereços atingido, maximo 3.')
            return
        }
        visibleAction(false)
        addressAction(true)
    }

    const handleDelete = (id) => {
        let newList = addressList.filter(i => i.id != id);
        setAddressList(newList)
        setAddress(newList)
    }

    const handleCheckout = async () => {

        setLoading(true);

        const marcacaoValida = await appharma.getValidaMarcacao();

        if (marcacaoValida == 1) {
            setLoading(false);

            const link = `whatsapp://send?text=Oi, estou com dificuldade para comprar no APP!&phone=+55${whatsapp}`
            const supported = await Linking.canOpenURL(link);
            if (!supported) {
                alert("Venda não disponivel. Não encontrei o Whatsapp para enviar mensagem!")
            } else {
                alert("Venda não disponivel no momento.")
                await Linking.openURL(link);
            }
            return
        }


        if (cart.length < 1) {
            setLoading(false);
            setErrorMsg('Você precisa inserir itens ao carrinho!')
            return
        }

        if (delivery) {
            if (endereco.length < 1) {
                setLoading(false);
                setErrorMsg('Selecione um endereço!')
                return
            }
            if (!tipoPgto) {
                setLoading(false);
                setErrorMsg("Selecione um tipo de pagamento!")
                return
            }
        }

        const checkout = {
            cart,
            levar_pinpad: (tipoPgto === 'Cartao' ? true : false),
            troco_para: troco,
            tipo_venda: 'A',
            tipo_entrega: (delivery ? 'Delivery' : 'Balcao'),
            id_endereco: idAddress,
        }

        try {

            const estoqueSemSaldo = await appharma.validaCart(token, cart);

            if (estoqueSemSaldo.length == 0) {
                const venda = await api.post('venda', checkout, { headers: { auth: token } });
                successAction(true)
                confirmSuccess(true)
                const { codigo_venda } = venda.data

                cart.map(async (i, k) => {
                    let reserva = {
                        "chave_venda": codigo_venda,
                        "id_produto": i.id,
                        "id_estoque": i.id_estoque,
                        "qtd_reserva": i.qtd
                    }
                    await appharma.postReserva(token, reserva)

                })

            } else {
                cart.map((i, k) => {
                    estoqueSemSaldo.map((item, key) => {
                        if (i.id == item.id_produto) {
                            i.semSaldo = 1
                        } else {
                            i.semSaldo = 0
                        }
                    })
                })
                setLoading(false);
                setErrorMsg("Existem produtos sem saldo suficiente!");
            }

            setLoading(false);

            return () => {
                setSubTotal(0);
                setTotalGeral(0);
                setDescontoTotal(0);
            }

        } catch (e) {
            console.log("Erro: " + e.message)
        }
    }

    const handleTipoPgto = (tipo) => {
        if (tipo === 'Dinheiro') {
            trocoAction(true);
            setTipoPgto('Dinheiro')
        }
        if (tipo === 'Cartao') {
            setTipoPgto('Cartao')
            getTroco(0)
        }

    }

    return (
        <Modal
            visible={visible}
            visiblieAction={visibleAction}
            animationType="slide"
            transparent={false}
        >
            <ModalArea>
                {!loading &&
                    <>
                        <BodyArea>
                            <ModalHeader cor={corPrincipal} >
                                <AreaBack>
                                    <Buttom onPress={handleClose}>
                                        <Icon name="arrow-back" size={25} color="#fff" />
                                    </Buttom>
                                </AreaBack>
                                <AreaText>
                                    <Text size="17px" color="#fff">Finalizar Compra</Text>
                                </AreaText>
                            </ModalHeader>

                            <RevisaoArea>

                                <TitleArea cor={corSecundaria}>
                                    <Text size="15px" color="#fff" >Revisão do Pedido:</Text>
                                </TitleArea>
                                <ScrollRevisao >
                                    {
                                        cart.map((i, k) => {
                                            return (
                                                <ProdutoArea key={k} semSaldo={i.semSaldo}>
                                                    <ImageArea>
                                                        <ProdutoImage source={{ uri: URL_FILES + i.path }} />
                                                    </ImageArea>
                                                    <ProdutoInfo>
                                                        <Text size="12px">{i.nome}</Text>
                                                        <Text size="12px">Qtd: {i.qtd}</Text>
                                                        <Text size="15px">R$ {parseFloat(i.preco_vigente).toFixed(2).replace(".", ",")}</Text>
                                                    </ProdutoInfo>
                                                </ProdutoArea>
                                            )
                                        })
                                    }
                                </ScrollRevisao>
                            </RevisaoArea>
                            {delivery &&

                                <EnderecoArea>
                                    <TitleEndereco cor={corSecundaria}>
                                        <Text size="15px" color="#fff" >Endereço para entrega:</Text>
                                        <AreaButtom onPress={handleAddAddress}>
                                            <Icon name="add-location" size={15} color={corPrincipal} />
                                            <Text size="10px" family="Roboto Thin">Adicionar</Text>
                                        </AreaButtom>
                                    </TitleEndereco>

                                    <ScrollEndereco showsVerticalScrollIndicator={false}>
                                        {addressList.map((i, k) => {
                                            return (
                                                <AddressItem key={k} data={i} onDelete={handleDelete} onSelect={setIdAddress} active={idAddress} />
                                            )
                                        })
                                        }
                                    </ScrollEndereco>

                                </EnderecoArea>
                            }
                            <TotaisArea>
                                <TitleArea cor={corSecundaria}>
                                    <Text size="15px" color="#fff" >Totais:</Text>
                                </TitleArea>
                                <TotaisInfo>
                                    <SubArea>

                                        <Text size="12px">Sub-Total: R$ {subTotal.toFixed(2).replace(".", ",")}</Text>
                                        <Text size="12px">Desconto: R$ {parseFloat(descontoTotal).toFixed(2).replace(".", ",")}</Text>
                                        {delivery &&
                                            <Text size="12px">Taxa de Entrega: R$ {parseFloat(taxa_entrega).toFixed(2).replace(".", ",")}</Text>}

                                    </SubArea>
                                    <TotalArea>
                                        <Text size="20px" family="Roboto Black">Total: R$ {parseFloat(totalGeral).toFixed(2).replace(".", ",")}</Text>
                                    </TotalArea>
                                </TotaisInfo>
                            </TotaisArea>
                        </BodyArea>

                        {delivery &&
                            <TipoPgto>
                                <TitleArea cor={corPrincipal}>
                                    <Text size="15px" color="#fff" >Tipo de pagamento:</Text>
                                </TitleArea>

                                <TipoPgtoArea>
                                    <CartaoArea cor={corPrincipal} enabled={tipoPgto === 'Cartao' ? true : false} onPress={() => handleTipoPgto('Cartao')} activeOpacity={0.7}>
                                        <IconAwesome name="credit-card" size={20} color="#999" />
                                        <Text size="10px" color='#fff'>Cartão</Text>
                                    </CartaoArea>
                                    <DinheiroArea cor={corPrincipal} enabled={tipoPgto === 'Dinheiro' ? true : false} onPress={() => handleTipoPgto('Dinheiro')} activeOpacity={0.7}>
                                        <IconAwesome name="money-bill" size={20} color={corSecundaria} />
                                        <Text size="10px" color="#fff">Dinheiro</Text>
                                    </DinheiroArea>
                                    {troco > 0 &&
                                        <>
                                            <TrocoArea cor={corPrincipal}>
                                                <IconAwesome name="coins" size={20} color={'#ff0'} />
                                                <SubtrocoArea>
                                                    <Text size="10px" color="#fff">Troco para</Text>
                                                    <Text size="10px" color="#fff">R$ {parseFloat(troco).toFixed(2).replace(".", ",")}</Text>
                                                </SubtrocoArea>
                                            </TrocoArea>
                                        </>
                                    }
                                </TipoPgtoArea>
                            </TipoPgto>
                        }
                        {errorMsg != '' &&
                            <ErrorArea>
                                <Text size="12px" color="#fff" family="Roboto Regular">{errorMsg}</Text>
                            </ErrorArea>}
                        <AreaCheckoutButtom cor={corPrincipal}>
                            <CheckoutButtom onPress={handleCheckout} activeOpacity={0.7}>
                                <IconTwo name="cart-arrow-right" size={20} color="#fff" />
                                <Text color="#fff" size="16px">Concluir Compra</Text>
                            </CheckoutButtom>
                        </AreaCheckoutButtom>
                    </>
                }

                {loading && <ActivityArea>
                    <ActivityIndicator size="large" color="#999" />
                    <Text size="15px" color="#000">Aguarde, estamos concluindo sua compra!</Text>
                </ActivityArea>}



            </ModalArea>



        </Modal>
    )


}
const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.carrinho,
        total: state.cartReducer.total,
        token: state.authReducer.token,
        troco: state.checkoutReducer.troco,
        endereco: state.checkoutReducer.endereco,
        taxaEntrega: state.checkoutReducer.taxaEntrega
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAddress: (list) => dispatch({ type: 'SET_ADDRESS', payload: { addressList: list } }),
        getTroco: (troco) => dispatch({ type: 'SET_TROCO', payload: { troco } }),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalFinalizar);