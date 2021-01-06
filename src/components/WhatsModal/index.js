import React, { useState, useEffect, useRef } from 'react'
import { Modal } from "react-native";

import { ModalArea, ModalHeader, AreaBack, Buttom, AreaText, Text, FoneArea } from './styled'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TextInputMask } from 'react-native-masked-text'
import { useDispatch, useSelector } from 'react-redux'
import useApi from '../../helpers/apiAppharma'
import { ErrorArea, Text as TextError } from '../../components/ErrorArea'

const WhatsappModal = ({ visible, visibleAction }) => {

    const [whatsapp, setWhatsapp] = useState('')
    const corPrincipal = useSelector(state => state.shopReducer.cor_primaria)

    const token = useSelector(state => state.authReducer.token)
    const idUser = useSelector(state => state.userReducer.id)
    const [errorMsg, setErrorMsg] = useState('')
    const campoNumero = useRef();
    const api = useApi()
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            setErrorMsg('')
        }, 1850)
    }, [errorMsg])


    const handleClose = () => {
        console.log("Fechei o modal..")
        visibleAction(false)
    }

    const start = async () =>{

        if(whatsapp.length < 15){
            setErrorMsg("Numero do celular obrigatório.");
            setError(true);
            return;
        }

        const body ={
            whatsapp:whatsapp.replace(/[^0-9]+/g, ""),
        }

        await api.putUser(token, body)

        dispatch({
            type:'SET_USER_WHATS',
            payload: whatsapp.replace(/[^0-9]+/g, "")
        })

       

        handleClose();

    }


    return (
        <Modal
            visible={visible}
            visiblieAction={visibleAction}
            animationType="slide"
            transparent={true}
        >
            <ModalArea >
                <ModalHeader cor={corPrincipal}>
                    <AreaBack>
                        <Buttom onPress={handleClose}>
                            <Icon name="arrow-back" size={25} color="#fff" />
                        </Buttom>
                    </AreaBack>
                    <AreaText>
                        <Text size="18px" color="#fff" >Atualizar informações</Text>
                    </AreaText>
                </ModalHeader>
                {errorMsg != '' &&
                <ErrorArea>
                    <TextError size="12px" color="#fff" family="Roboto Regular">{errorMsg}</TextError>
                </ErrorArea>}
                <FoneArea>
                         <Text  size="16px" color="#999"  >Qual o numero do seu celular?</Text>
                        <TextInputMask
                            ref={campoNumero}
                            style={{ width: '60%', height: 40, borderWidth: 1, marginTop: 5, borderRadius: 10, padding: 5 }}
                            placeholder="(45) 9999-9999"
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) '
                            }}
                            value={whatsapp}
                            onChangeText={text => {
                                setWhatsapp(text)
                            }}
                            onSubmitEditing={() => start()}
                        />

                </FoneArea>


            </ModalArea>

        </Modal>
    )

}


export default WhatsappModal;
