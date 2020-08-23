import React, { useState, useEffect } from 'react'
import { Modal } from "react-native";
import styled from 'styled-components/native';
import p from '../../config/padroes'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AddressItem from './AddressItem'
import { connect } from 'react-redux'

const ModalArea = styled.SafeAreaView`
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
`
const AreaText = styled.View`
   flex:1
   justify-content: center;
   align-items:center;
`

const EnderecoArea = styled.View`
   width:100%;
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
const ScrollAddress = styled.ScrollView`
   
`

const ErrorArea = styled.View`
   height:25px;
   background-color:#eb6c5b
   justify-content:center;
   padding:5px
`

const ModalFinalizar = ({ data, visible, visibleAction, addressAction, setAddress, delivery }) => {

   const [addressList, setAddressList] = useState(data)
   const [errorMsg, setErrorMsg] = useState('')
   const [idAddress, setIdAddress] = useState(0)

   useEffect(()=>{
      console.log('mudei o id selecionado para: '+ idAddress)
  

   },[ idAddress])

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

                  <ScrollAddress showsVerticalScrollIndicator={false}>
                     {addressList.map((i, k) => {
                        console.log('caralho: '+ JSON.stringify(i.id) )
                        return (
                           <AddressItem key={k} data={i} onDelete={handleDelete} onSelect={setIdAddress} active = {idAddress} />
                        )
                     })
                     }
                  </ScrollAddress>

               </EnderecoArea>
            }
            <Text>...</Text>
            <Text>...</Text>
            <Text>...</Text>
            <Text>...</Text>
            <Text>...</Text>
            <Text>...</Text>
            <Text>...</Text>


         </ModalArea>

      </Modal>
   )


}
const mapStateToProps = (state) => {
   return {
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setAddress: (list) => dispatch({ type: 'SET_ADDRESS', payload: { addressList: list } })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalFinalizar);