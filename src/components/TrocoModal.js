import React, { useState, useEffect } from 'react'
import { Modal } from "react-native";
import styled from 'styled-components/native';
import p from '../config/padroes'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'


const ModalArea = styled.SafeAreaView`
   flex:1;
   background-color: rgba(0, 0, 0, 0.5);
   justify-content:center;
   align-items:center;
`

const TrocoArea = styled.View`
   width:280px;
   height:160px;
   background-color:${p.corModal}
   justify-content:center;
   align-items:center;
   border-radius:7px;
   
`


const Text = styled.Text`
   font-family: Roboto Medium
   font-size: ${props => props.size || '12px'};
   color:#fff
`

const IconeArea = styled.TouchableOpacity`
   margin:10px
   height:70px;
   width:80px;
   background-color:${p.corPrincipal}
   justify-content: center;
   align-items:center;
   border-radius: 5px
`

const Input = styled.TextInput`
   width:65px;
   padding:2px
   height:35px;
   background-color:#FFF
   border-radius:5px
   margin-top:5px
`

const TrocoModal = ({ visible, visibleAction, getTroco }) => {

   const [troco, setTroco] = useState('')


   const handleClick = () =>{

      getTroco(troco)
      visibleAction(false)
   }

   return (
      <Modal
         visible={visible}
         visiblieAction={visibleAction}
         animationType="fade"
         transparent={true}
      >
         <ModalArea >
            <TrocoArea>
               <Text size="19px" style={{margin:5}}>Você precisa de troco?</Text>
 
               <Input placeholder="R$ 50,00" keyboardType="number-pad" onChangeText={(t)=>setTroco(t)} value={troco} />
               <IconeArea activeOpacity={0.7} onPress={ handleClick }>
                  <Icon name="coins" size={20} color='#e3e02d'/>
                  <Text> Pronto </Text>
               </IconeArea>
            </TrocoArea>

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
      getTroco: (troco) => dispatch({ type: 'SET_TROCO', payload:{ troco} })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrocoModal);
