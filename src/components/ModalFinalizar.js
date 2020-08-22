import React, { useState, useRef } from 'react'
import { Modal } from "react-native";
import styled from 'styled-components/native';
import p from '../config/padroes'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TextInputMask } from 'react-native-masked-text'
import axios from 'axios'

const ModalArea = styled.SafeAreaView`
   flex:1;
   background-color:#fff
`
const ModalHeader = styled.View`
   flex-direction:row;
   background-color:${p.corPrincipal || '#ddd'}
   height:50px;
`;
const AreaBack = styled.View`
   flex:1
`
const TotalArea = styled.View`
   flex:2;
   justify-content:center;
   align-items:center;

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
`
const AreaText = styled.View`
   
`
const FormAddress = styled.View`
   height:300px;
   background-color:#eee;
`

const ButtonSearch = styled.TouchableOpacity`
   width: 20px;
   height: 20px;
   margin-right:5px;
`

const CepArea = styled.View`
   width:140px;
   flex-direction:row;
   border:1px solid #999;
   border-radius:8px;
   align-items:center;
   justify-content:center;
   background-color:#fff
   height:35px;
   padding:3px;
   margin-left:5px;
`;

const TitleAddressArea = styled.View`
   padding:5px;
`

const Input = styled.TextInput`
   padding:5px;
   width: ${props => props.width || '275px'};
   height:40px;
   border:1px solid #999
   margin:5px
`;

const RuaArea = styled.View`
   flex-direction:row
`
const NumeroArea = styled.View``
const ComplementoArea = styled.View``
const BairroArea = styled.View`
flex-direction:row;
`
const CidadeArea = styled.View``
const UfArea = styled.View``

const apiCep = axios.create({
   baseURL: `https://viacep.com.br/ws/`
})


export default ({ visible, visibleAction }) => {

   const [cepUser, setCepUser] = useState('')
   const [rua, setRua] = useState('')
   const [numero, setNumero] = useState('')
   const [complemento, setComplemento] = useState('')
   const [bairro, setBairro] = useState('')
   const [cidade, setCidade] = useState('')
   const [uf, setUf] = useState('')

   const numeroRef = useRef()
   const complementoRef = useRef()
   const bairroRef = useRef()
   const cidadeRef = useRef()
   const ufRef = useRef()


   const getCep = async () => {
      const result = await apiCep.get(`/${cepUser}/json/`);
      setRua(result.data.logradouro)
      setBairro(result.data.bairro)
      setCidade(result.data.localidade)
      setUf(result.data.uf)
   }


   const searchCep = () => {
      getCep()
   }

   const handleClose = () => {
      console.log("Fechei o modal..")
      visibleAction(false)
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
               <TotalArea>
                  <AreaText>
                     <Text size="13px">Total:</Text>
                     <Text size="16px" style={{ fontWeight: 'bold' }}>R$ 1.000,00</Text>
                  </AreaText>
               </TotalArea>
            </ModalHeader>
           


         </ModalArea>

      </Modal>
   )


}
