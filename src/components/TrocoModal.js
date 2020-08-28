import React, { useState, useEffect } from 'react'
import { Modal } from "react-native";
import styled from 'styled-components/native';
import p from '../config/padroes'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'
import {Picker} from '@react-native-community/picker';


const ModalArea = styled.SafeAreaView`
   flex:1;
   background-color: rgba(0, 0, 0, 0.5);
   justify-content:center;
   align-items:center;
`

const TrocoArea = styled.View`
   width:280px;
   height:175px;
   background-color:${p.corModal}
   justify-content:center;
   align-items:center;
   border-radius:10px;
   
`


const Text = styled.Text`
   font-family: Roboto Medium
   font-size: 16px;
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

const ButtomArea = styled.View`
   flex-direction:row
`

const TrocoModal = ({ visible, visibleAction, getTroco }) => {

   const [troco, setTroco] = useState(0)


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
               <Text>Você precisa de troco para quanto?</Text>
 
                  <Picker style={{height:50, width:150}} selectedValue={troco}  onValueChange={ (itemValue, itemIndex) => setTroco(itemValue)} mode="dropdown">
                       <Picker.Item key={0} value="0" label="Não precisa" />
                        <Picker.Item key={1} value="20" label="R$ 20,00" />
                        <Picker.Item key={2} value="50" label="R$ 50,00" />
                        <Picker.Item key={3} value="100" label="R$ 100,00" />
                        <Picker.Item key={4} value="200" label="R$ 200,00" />
                  </Picker>
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
