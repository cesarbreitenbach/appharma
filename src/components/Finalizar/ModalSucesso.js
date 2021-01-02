import React, { useState, useEffect } from 'react';
import { Modal } from "react-native";
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import useApi from '../../helpers/apiAppharma'


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

const ModalSucesso = ({ navigation, visibleAction, visible, clearCheckout, clearCart }) => {

    const [chegada, setChegada] = useState('');

    const api = useApi()

    useEffect(() => {

        let unmonted = false;

        const getPrazo = async () => {
            const prazo = await api.getPrazoEntrega();
            let data = prazo.split(' ')
            let dia = data[0];
            dia = dia.split('-');
            let diaAux = dia[2]+'/'+dia[1]+'/'+dia[0]
            
            let time = data[1];
            time = time.split(':');
            let hora = time[0];
            let minuto = time[1];
          
            if(!unmonted){
                setChegada(`${diaAux} às ${hora}:${minuto}`)
            }
        }
        getPrazo()

        return () => {unmonted = true}
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