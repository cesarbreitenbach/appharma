import React, { useState, useRef, useEffect } from 'react'
import { Modal } from "react-native";
import styled from 'styled-components/native';
import p from '../config/padroes'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TextInputMask } from 'react-native-masked-text'
import axios from 'axios'
import api from '../helpers/api'
import { showMessage } from "react-native-flash-message"
import { connect } from 'react-redux'
import {ErrorArea, Text as Text2} from '../components/ErrorArea'



const ModalArea = styled.SafeAreaView`
   width:100%;
   height:100%;
   background-color: rgba(0, 0, 0, 0.5)
   align-self:flex-end;  
`

const ModalHeader = styled.View`
   flex-direction:row;
   background-color:${p.corPrincipal || '#ddd'}
   height:50px;
`;
const AreaBack = styled.View`

`


const Buttom = styled.TouchableOpacity`
   height:50px;
   width:50px;
   margin-left:10px;
   margin-top:10px;
`
const AreaText = styled.View`
   flex:1;
   justify-content:center;
   align-items:center;
`

const Text = styled.Text`
   font-family:${props => props.family || 'Roboto Medium'};
   font-size:${props => props.size || "14px"}
   color:${props => props.color || '#000'}
`
const FormAddress = styled.View`
   height:225px
   background-color:#eee
   padding:5px
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
   margin-top:10px
`;

const TitleAddressArea = styled.View`
   padding:5px;
`

const Input = styled.TextInput`
   padding:5px;
   width: ${props => props.width || '275px'};

   border:1px solid #999
   margin:4px 2px
   border-radius:5px;
   background-color:#fff
`;

const RuaArea = styled.View`
   flex-direction:row
   justify-content:center;
   align-items:center;
   margin-top:5px
   margin-bottom:-5px
`
const NumeroArea = styled.View``
const ComplementoArea = styled.View``
const BairroArea = styled.View`
flex-direction:row;
justify-content:center;
   align-items:center;
`
const CidadeArea = styled.View``
const UfArea = styled.View``

const ButtonAddDel = styled.TouchableOpacity`
   width: 65px;
   height: 50px;
   padding:5px;
   margin: 5px;
   justify-content:center;
   align-items:center;
`
const BotaoArea = styled.View`
   flex:1;
   justify-content:center;
   align-items:center;
`


const apiCep = axios.create({
   baseURL: `https://viacep.com.br/ws/`
})


let timer;


const AddressModal = ({ visible, visibleAction, userId, token, checkoutAction, setAddressList, addressList }) => {

   const [cepUser, setCepUser] = useState('')
   const [rua, setRua] = useState('')
   const [numero, setNumero] = useState('')
   const [complemento, setComplemento] = useState('')
   const [bairro, setBairro] = useState('')
   const [cidade, setCidade] = useState('')
   const [uf, setUf] = useState('')
   const [errorMsg, setErrorMsg] = useState('')

   const ruaRef = useRef()
   const numeroRef = useRef()
   const complementoRef = useRef()
   const bairroRef = useRef()
   const cidadeRef = useRef()
   const ufRef = useRef()

   useEffect(() => {
      setTimeout(() => {
         setErrorMsg('')
      }, 1850)
   }, [errorMsg])

   useEffect(() => {
      if (cepUser.length == 9) {
         if (timer) {
            clearTimeout(timer)
         }
         timer = setTimeout(() => {
            getCep()
         }, 100)
      }

   }, [cepUser])



   const getCep = async () => {

      try {
         const result = await apiCep.get(`/${cepUser}/json/`);
         if ((!result.data.erro) || (result.status === 400)) {
            setRua(result.data.logradouro)
            setBairro(result.data.bairro)
            setCidade(result.data.localidade)
            setUf(result.data.uf)
            numeroRef.current.focus();
         } else {
            console.log(e.message)
            setErrorMsg(e.message)
            ruaRef.current.focus()
         }
      } catch (e) {
         console.log(e.message)
         setErrorMsg("Não encontrei endereço, informe manualmente.S")
         ruaRef.current.focus()
      }
   }


   const searchCep = () => {
      getCep()
   }

   const handleClose = () => {
      console.log("Fechei o modal..")
      visibleAction(false)
   }

   const handleSave = async () => {

      if (rua == '' || numero == '') {
         setErrorMsg("Você precisa informar os campos obrigatorios * ")
         return
      }


      let body = {
         cep: cepUser,
         rua,
         numero,
         complemento,
         bairro,
         cidade,
         uf,
         user_id: userId
      }
      try {
         const address = await api.post('/endereco', body, { headers: { auth: token } })
         if (address.data) {
            showMessage({
               message: "Endereço cadastrado com sucesso!",
               type: "success"
            })
            let tempList = addressList;
            tempList.push(address.data.address)
            setAddressList(tempList)
            visibleAction(false)
            checkoutAction(true)
         } else {
            setErrorMsg("Não consegui cadastrar esse endereço... ")
         }
      } catch (e) {
         console.log(e.message)
      }
   }

   return (
      <Modal
         visible={visible}
         visiblieAction={visibleAction}
         animationType="slide"
         transparent={true}
      >
         <ModalArea >
            <ModalHeader>
               <AreaBack>
                  <Buttom onPress={handleClose}>
                     <Icon name="arrow-back" size={25} color="#fff" />
                  </Buttom>
               </AreaBack>
               <AreaText>
                  <Text size="18px" color="#fff" >Cadastro de Endereço</Text>
               </AreaText>
            </ModalHeader>
            <FormAddress>
               <TitleAddressArea>
                  <Text size="16px" family="Ubuntu Medium" style={{ marginBottom: 5 }}>Você precisa cadastrar ao menos um endereço para entrega.</Text>
               </TitleAddressArea>
               <CepArea>
                  <TextInputMask
                     style={{ width: 100, height: 40 }}
                     autoFocus={true}
                     type={'zip-code'}
                     value={cepUser}
                     onChangeText={text => {
                        setCepUser(text)
                     }}
                     placeholder="Qual seu cep?"
                     onSubmitEditing={searchCep}
                  />
                  <ButtonSearch activeOpacity={0.7} onPress={() => searchCep()}>
                     <Icon name="search" size={20} style={{ marginLeft: 3, color: '#999' }} />
                  </ButtonSearch>
               </CepArea>

               <RuaArea>
                  <Input placeholder="*Nome da rua"
                     ref={ruaRef}
                     width="170px"
                     value={rua}
                     onChangeText={(t) => setRua(t)}
                     onSubmitEditing={() => {
                        numeroRef.current.focus();
                     }}
                  />
                  <NumeroArea >
                     <Input
                        ref={numeroRef}
                        width="70px"
                        placeholder="* Numero"
                        keyboardType="number-pad"
                        value={numero}
                        onChangeText={(t) => setNumero(t)}
                        onSubmitEditing={() => {
                           complementoRef.current.focus();
                        }}
                     />
                  </NumeroArea>
                  <ComplementoArea >
                     <Input
                        placeholder="apto, bloco... "
                        ref={complementoRef}
                        width="95px"
                        value={complemento}
                        onChangeText={(t) => setComplemento(t)}
                        onSubmitEditing={() => {
                           bairroRef.current.focus();
                        }}
                     />
                  </ComplementoArea>
               </RuaArea>


               <BairroArea>
                  <Input
                     placeholder="* Bairro "
                     ref={bairroRef}
                     width="80px"
                     value={bairro}
                     onChangeText={(t) => setBairro(t)}
                     onSubmitEditing={() => {
                        cidadeRef.current.focus();
                     }}
                  />
                  <CidadeArea>
                     <Input
                        placeholder="* Cidade"
                        ref={cidadeRef}
                        width="90px"
                        value={cidade}
                        onChangeText={(t) => setCidade(t)}
                        onSubmitEditing={() => {
                           ufRef.current.focus();
                        }}
                     />
                  </CidadeArea>
                  <UfArea>
                     <Input
                        placeholder="* UF"
                        autoCapitalize='characters'
                        ref={ufRef}
                        maxLength={2}
                        width="50px"
                        value={uf}
                        onChangeText={(t) => setUf(t)}
                        onSubmitEditing={() => {
                           handleSave;
                        }}
                     />
                  </UfArea>
                  <BotaoArea>
                     <ButtonAddDel onPress={handleSave}>
                        <Icon name="add-location" size={25} color={p.corPrincipal} />
                        <Text size="13px">Salvar</Text>
                     </ButtonAddDel>
                  </BotaoArea>
               </BairroArea>
               {errorMsg != '' &&
                  <ErrorArea>
                     <Text2 size="12px" color="#fff" family="Roboto Regular">{errorMsg}</Text2>
                  </ErrorArea>}

            </FormAddress>


         </ModalArea>

      </Modal>
   )

}

const mapStateToProps = (state) => {
   return {
      token: state.authReducer.token,
      status: state.authReducer.status,
      userId: state.userReducer.id,
      addressList: state.userReducer.addressList
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setAddressList: (list) => dispatch({ type: 'SET_ADDRESS', payload: { addressList: list } })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressModal);
