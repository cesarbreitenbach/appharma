import React, { useState, useEffect } from 'react'
import { Modal } from "react-native";
import styled from 'styled-components/native';
import p from '../../config/padroes'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons'
import IconAwesome from 'react-native-vector-icons/FontAwesome5'
import AddressItem from './AddressItem'
import { connect } from 'react-redux'
import api from '../../helpers/api'

const ModalArea = styled.KeyboardAvoidingView`
   flex:1;
   background-color:#fff
`
const ModalHeader = styled.View`
   flex-direction:row;
   background-color:${p.corPrincipal || '#ddd'}
   
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
   background-color:${p.corSecundaria}

`

const AreaButtom = styled.TouchableOpacity`

   width:45px;
   justify-content:center;
   align-items:center;
`

const RevisaoArea = styled.View``
const ScrollRevisao = styled.ScrollView`
   height:190px

   
`
const ScrollEndereco = styled.ScrollView`
   height:90px
`

const ProdutoArea = styled.View`
   flex-direction:row;   
   margin-top:10px
   border-bottom-width:1px;
   border-bottom-color:#ddd
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

`

const ErrorArea = styled.View`
   height:25px;
   background-color:#eb6c5b
   justify-content:center;
   padding:5px
`
const AreaCheckoutButtom = styled.View`
   flex:1
   background-color:${p.corPrincipal}
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
   justify-content:center
   
`
const CartaoArea = styled.TouchableOpacity`
padding-top:5px
justify-content:center;
align-items:center;
width:90px;
height:60px;
background-color:${p.corPrincipal}
margin:10px 20px
border-radius:7px
margin:10px 20px
border-color:${props => props.enabled ? p.corSecundaria : p.corPrincipal}
border-width:2px
`
const DinheiroArea = styled.TouchableOpacity`
padding-top:5px
justify-content:center;
align-items:center;
width:90px;
height:60px;
background-color:${p.corPrincipal}
margin:10px 20px
border-radius:7px
border-color:${props => props.enabled ? p.corSecundaria : p.corPrincipal}
border-width:2px
`
const TrocoArea = styled.View`
padding-top:5px
justify-content:center;
align-items:center;
width:100px;
height:60px;
background-color:${p.corPrincipal}
margin:10px 20px
border-radius:7px
flex-direction:row
`



const SubtrocoArea = styled.View`
 justify-content:center;
 align-items:center;
 padding:5px

`

const ModalFinalizar = ({ data, visible, visibleAction, addressAction, setAddress, delivery, cart, total, token, trocoAction, getTroco, troco, endereco }) => {

   const [addressList, setAddressList] = useState(data)
   const [errorMsg, setErrorMsg] = useState('')
   const [idAddress, setIdAddress] = useState(0)
   const [subTotal, setSubTotal] = useState(0)
   const [descontoTotal, setDescontoTotal] = useState(0)
   const [tipoPgto, setTipoPgto] = useState(false)


   useEffect(() => {
      let vSubTotal = 0;
      let vDesconto = 0;
      console.log(JSON.stringify(cart))
      const getTotais = async () => {
         await cart.map((i, k) => {
            vSubTotal += parseFloat(i.preco_original) * parseInt(i.qtd)
            vDesconto += (parseFloat(i.preco_original) * parseInt(i.qtd)) - (parseFloat(i.preco_vigente) * parseInt(i.qtd))
            console.log(`Preço original: ${i.preco_original} Preco vigente: ${i.preco_vigente}  total desconto: ${vDesconto} subTotal ${vSubTotal}`)
         });
         setSubTotal(vSubTotal)
         setDescontoTotal(vDesconto)
      }
      getTotais();
   }, [])

   useEffect(() => {
      console.log('mudei o id selecionado para: ' + idAddress)

   }, [idAddress])

   const handleClose = () => {
      console.log("Fechei o modal..")
      visibleAction(false)
   }
   const handleAddAddress = () => {
      if (addressList.length > 2) {
         setErrorMsg('Limite de endereços atingido, maximo 3.')
         setTimeout(() => {
            setErrorMsg('')
         }, 1850)
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

      if (endereco.length==0) {
         setErrorMsg('Selecione um endereço!')
         setTimeout(() => {
            setErrorMsg('')
         }, 1850)
         return
      }

      console.log(JSON.stringify(endereco))

      const venda = await api.post('venda', { cart, levar_pinpad: true, troco_para: 100.00, tipo_venda: 'A' }, { headers: { auth: token } });
      console.log(venda.data)
   }

   const handleTipoPgto = (tipo) => {
      console.log(`Recebio o tipo de pagamento: ${tipo}`)
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

            <ModalHeader>
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
               <TitleArea>
                  <Text size="15px" color="#fff" >Revisão do Pedido:</Text>
               </TitleArea>
               <ScrollRevisao >
                  {
                     cart.map((i, k) => {
                        return (
                           <ProdutoArea key={k}>
                              <ImageArea>
                                 <ProdutoImage source={{ uri: p.URL_FILES + i.image }} />
                              </ImageArea>
                              <ProdutoInfo>
                                 <Text size="12px">{i.nome}</Text>
                                 <Text size="12px">Qtd: {i.qtd}</Text>
                                 <Text size="15px">R$ {i.preco_vigente}</Text>
                              </ProdutoInfo>
                           </ProdutoArea>
                        )
                     })
                  }
               </ScrollRevisao>
            </RevisaoArea>


            {errorMsg != '' &&
               <ErrorArea>
                  <Text size="12px" color="#fff" family="Roboto Regular">{errorMsg}</Text>
               </ErrorArea>}

            {delivery &&

               <EnderecoArea>
                  <TitleArea>
                     <Text size="15px" color="#fff" >Endereço para entrega:</Text>
                     <AreaButtom onPress={handleAddAddress}>
                        <Icon name="add-location" size={15} color={p.corPrincipal} />
                        <Text size="10px" family="Roboto Thin">Adicionar</Text>
                     </AreaButtom>
                  </TitleArea>

                  <ScrollEndereco showsVerticalScrollIndicator={false}>
                     {addressList.map((i, k) => {
                        console.log('caralho: ' + JSON.stringify(i.id))
                        return (
                           <AddressItem key={k} data={i} onDelete={handleDelete} onSelect={setIdAddress} active={idAddress} />
                        )
                     })
                     }
                  </ScrollEndereco>

               </EnderecoArea>
            }
            <TotaisArea>
               <TitleArea>
                  <Text size="15px" color="#fff" >Totais:</Text>
               </TitleArea>
               <TotaisInfo>
                  <SubArea>

                     <Text size="14px">Sub-Total: R$ {subTotal.toFixed(2)}</Text>
                     <Text size="14px">Desconto: R$ {descontoTotal.toFixed(2)}</Text>

                  </SubArea>
                  <TotalArea>
                     <Text size="20px" family="Roboto Black">Total: R$ {parseFloat(total).toFixed(2)}</Text>
                  </TotalArea>
               </TotaisInfo>
            </TotaisArea>

            <TitleArea>
               <Text size="15px" color="#fff" >Tipo de pagamento:</Text>
            </TitleArea>
            <TipoPgtoArea>
               <CartaoArea enabled={tipoPgto === 'Cartao' ? true : false} onPress={() => handleTipoPgto('Cartao')} activeOpacity={0.7}>
                  <IconAwesome name="credit-card" size={20} color="#999" />
                  <Text size="10px" color='#fff'>Cartão de Credito</Text>
               </CartaoArea>
               <DinheiroArea enabled={tipoPgto === 'Dinheiro' ? true : false} onPress={() => handleTipoPgto('Dinheiro')} activeOpacity={0.7}>
                  <IconAwesome name="money-bill" size={20} color={p.corSecundaria} />
                  <Text size="10px" color="#fff">Dinheiro</Text>
               </DinheiroArea>
               {troco > 0 &&
                  <>
                     <TrocoArea>
                        <IconAwesome name="coins" size={20} color={'#ff0'} />
                        <SubtrocoArea>
                           <Text size="10px" color="#fff">Troco para</Text>
                           <Text size="10px" color="#fff">R$ {parseFloat(troco).toFixed(2)}</Text>
                        </SubtrocoArea>
                     </TrocoArea>
                  </>
               }
            </TipoPgtoArea>


            <AreaCheckoutButtom>
               <CheckoutButtom onPress={handleCheckout} activeOpacity={0.7}>
                  <IconTwo name="cart-arrow-right" size={20} color="#fff" />
                  <Text color="#fff" size="16px">Concluir Compra</Text>
               </CheckoutButtom>
            </AreaCheckoutButtom>


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
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setAddress: (list) => dispatch({ type: 'SET_ADDRESS', payload: { addressList: list } }),
      getTroco: (troco) => dispatch({ type: 'SET_TROCO', payload: { troco } }),


   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalFinalizar);