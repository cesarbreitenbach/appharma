import React, { useState, useEffect } from 'react'
import { Conteiner, Ball, Bar, Div, Text } from './styled'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/Entypo'


const StatusProgress = ({ data }) => {

    console.log("Rocebi" + JSON.stringify(data))

    const [tipo, setTipo] = useState('1')
    const [entrega, setEntrega] = useState('Balcao')

    const pegaStatus = async () => {


        switch (data.status) {
            case 'Confirmado':
                setTipo('1')
                break;
            case 'Enviado':
                setTipo('2')
                break;
            case 'Finalizado':
                setTipo('3')
                break;
            case 'Cancelado':
                setTipo('4')

                break;

            default:
                break;
        }

        if (data.tipo_entrega === 'Balcao') {
            setEntrega('Balcao')
        } else {
            setEntrega('Delivery')
        }


    }

    useEffect(() => {

        pegaStatus()
    }, [])

    return (
        <Conteiner >
            <Text>Numero do pedido: {data.id}</Text>
            <Bar>
                <Div>
                    <Ball active={tipo === '1' ? true : false} />
                    <Icon2 name="flash" size={tipo === '1' ? 30 : 25} color="#ffd700" />
                    <Text active={false}> Recebemos</Text>
                </Div>
                <Div>
                    <Ball active={tipo === '2' ? true : false} />
                    <Icon name="truck-delivery" size={tipo === '2' ? 30 : 25} color="rgba(59, 163, 94, 1)" />
                    <Text active={true}> {entrega === 'Balcao' ? 'você já pode retirar' : 'rota de entrega'}</Text>
                </Div>
                <Div>
                    <Ball active={(tipo === '3') || (tipo === '4') ? true : false} />
                    <Icon name="check-bold" size={tipo === '3' ? 30 : 25} color={tipo === '4' ? "#ff0000" : "#000080"} />
                    <Text active={false}> {tipo === '4' ? 'Cancelado' : 'Entregue'}</Text>
                </Div>
            </Bar>
            <Text>Data/Hora do pedido: {data.data_venda}</Text>
        </Conteiner>
    )
}

export default StatusProgress;