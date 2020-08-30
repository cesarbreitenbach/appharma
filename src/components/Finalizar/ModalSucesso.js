import React, { useState, useEffect } from 'react';
import { Modal } from "react-native";
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import p from '../../config/padroes'
import { connect } from 'react-redux'
import { addMinutes } from 'date-fns'
import { listTimeZones } from 'timezone-support'
import { parseFromTimeZone, formatToTimeZone } from 'date-fns-timezone'


const Conteiner = styled.View`
flex:1
background-color:#999
justify-content:center;
align-items:center;
`

const Text = styled.Text`
   font-family:${props => props.family || 'Roboto Medium'};
   font-size:${props => props.size || "14px"}
   color:${props => props.color || "#000"}
   margin:${props => props.margin || "0px"}
`

const SuccessArea = styled.View`

`
const Buttom = styled.TouchableOpacity`
   height:60px;
   justify-content:center;
   align-items:center;
   margin-top:20px
`

let timer;

const ModalSucesso = ({ previsao, navigation, visibleAction, visible, clearCheckout, clearCart }) => {

   const [chegada, setChegada] = useState('');

   useEffect(() => {

      const agora = new Date().getTime()
      const formatAno = 'D/M/YYYY'
      const formatHora = 'HH:mm'
      let auxPrevisao = addMinutes(agora, previsao);
      const dia = formatToTimeZone(auxPrevisao, formatAno, { timeZone: 'America/Sao_Paulo' })
      const hora = formatToTimeZone(auxPrevisao, formatHora, { timeZone: 'America/Sao_Paulo' })

      setChegada(`${dia} às ${hora}`)
   }, [])

   const handleBye = () => {
         visibleAction(false)
          clearCart()
           clearCheckout()
            navigation.navigate('Shop')
   }

   return (
      <Modal
         visible={visible}
         visiblieAction={visibleAction}
         animationType="fade"
         transparent={true}
      >
         <Conteiner>
            <SuccessArea>
               <Text margin="15px" size="22px" family="Ubuntu Bold">Obrigado pela sua compra!</Text>
               <Text style={{ textAlign: 'center' }}>Já estamos preparando o envio</Text>
               <Text style={{ textAlign: 'center' }}>previsão de entrega {chegada}</Text>
               <Buttom onPress={handleBye}>
                  <Icon name="home" size={30} />
                  <Text>Voltar</Text>
               </Buttom>
            </SuccessArea>
         </Conteiner>
      </Modal>
   );
}

const mapStateToProps = (state) => {
   return {
      previsao: state.checkoutReducer.previsaoEntrega,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      clearCheckout: () => dispatch({ type: 'CLEAR_CHECKOUT' }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSucesso);