import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import p from '../../config/padroes'
import { connect } from 'react-redux'
import api from '../../helpers/api'

const ContentAddressArea = styled.View`

flex-direction:row
background-color:#fff
border-bottom-width:1px
border-bottom-color:#ddd
padding:5px


`

const Text = styled.Text`
   font-family:${props => props.family || 'Roboto Medium'};
   font-size:${props => props.size || "14px"}
   color:${props => props.color || "#000"}
`

const TextArea = styled.TouchableOpacity`
   flex-direction:row
   flex:1
   align-items:center;
`
const SubTextArea = styled.View`
`
const AreaButtom = styled.TouchableOpacity`

   width:45px;
   justify-content:center;
   align-items:center;
`

const RadioArea = styled.View`

`
const RadioButtom = styled.View`
   width:15px;
   height:15px;
   margin-right:5px;
   border-radius:8px
   border: 2px solid ${p.corPrincipal}
   background-color: ${props => props.enabled ? p.corPrincipal : '#fff'}
`
const AddressItem = ({ data, token, onDelete, onSelect, active, setEndereco }) => {

   const [radioEnable, setRadioEnable] = useState(false)

   useEffect(() => {
      if (data.id == active) {
         setRadioEnable(true)
      } else {
         setRadioEnable(false)
      }
   }, [active])

   const handleDeleteAddress = () => {
      Alert.alert(
         'Deletar endereço',
         'Seu endereço será excluido, tem certeza?',
         [
            {
               text: 'Confirmar',
               onPress: async () => {
                  console.log('Confirmou')
                  try {
                     const r = await api.delete(`/endereco/${data.id}`, { headers: { auth: token } });
                     if (r.data.success) {
                        onDelete(data.id);

                     } else {
                        Alert.alert('Erro', 'Não consegui deletar.')
                     }
                  } catch (e) {
                     console.log(e.message)
                  }

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
   const handleSelect = () => {
      setRadioEnable(!radioEnable)
      if (!radioEnable) {
         console.log("vou selecinar: " + JSON.stringify(data))
         onSelect(data.id)
         setEndereco(data)
      } else {
         onSelect('')
      }

   }

   return (
      <ContentAddressArea>
         <TextArea onPress={handleSelect}>
            <RadioArea>
               <RadioButtom  enabled={radioEnable} />
            </RadioArea>
            <SubTextArea>
               <Text size="12px" >Rua {data.rua} nº {data.numero} {data.complemento}, {data.bairro} </Text>
               <Text size="11px" >{data.cidade} - {data.uf}</Text>
               <Text size="10px" >{data.cep}</Text>
            </SubTextArea>
         </TextArea>
         <AreaButtom onPress={handleDeleteAddress}>
            <Icon name="delete" size={15} color={p.corPrincipal} />
            <Text size="9px" family="Roboto Regular">Remover</Text>
         </AreaButtom>
      </ContentAddressArea>
   );
}

const mapStateToProps = (state) => {
   return {
      token: state.authReducer.token,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setEndereco: (endereco) => dispatch({ type: 'SET_ENDERECO', payload: {endereco}})
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressItem);