import React, { useState, useEffect } from 'react'
import { Conteiner, Ball, Bar, Div, Text } from './styled'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/Entypo'
import { format, zonedTimeToUtc } from 'date-fns-tz'
import { parseISO } from 'date-fns'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

const StatusProgress = ({ data }) => {

    const [tipo, setAttTipo] = useState('0')
    const [entrega, setEntrega] = useState('Balcao')

    const formataData = (dt) => {
        const data = dt.split('.')
        const dataStr = data[0]+'+03'
        const parsedDate = parseISO(dataStr);
        const znDate = zonedTimeToUtc(parsedDate, 'pt-BR');
        const teste = format(znDate, 'dd/MM/yyyy HH:mm', { timeZone: 'America/Sao_Paulo' })
        return teste
    }


    const pegaStatus = () => {
         
        switch (data.status) {
            case 'Confirmado':
                setAttTipo('1')
                break;
            case 'Enviado':
                setAttTipo('2')
                break;
            case 'Finalizado':
                setAttTipo('3')
                break;
            case 'Cancelado':
                setAttTipo('4')
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

    let dt = formataData(data.data_venda);
    return (

        <Conteiner>
            <Text bottom="15px" top="5px">Numero do pedido: {data.id} </Text>
            <Bar>
                <Div>
                    <Ball active={tipo === '1' ? true : false} />
                    <Icon2 name="flash" size={tipo === '1' ? 30 : 25} color="#ffd700" />
                    <Text active={tipo === '1' ? true : false}> Recebemos</Text>
                </Div>
                <Div>
                    <Ball active={tipo === '2' ? true : false} />
                    <Icon name="truck-delivery" size={tipo === '2' ? 30 : 25} color="rgba(59, 163, 94, 1)" />
                    <Text active={tipo === '2' ? true : false}> {entrega === 'Balcao' ? 'você já pode retirar' : 'rota de entrega'}</Text>
                </Div>
                <Div>
                    <Ball active={(tipo === '3') || (tipo === '4') ? true : false} />
                    <Icon name="check-bold" size={tipo === '3' ? 30 : 25} color={tipo === '4' ? "#ff0000" : "#000080"} />
                    <Text active={(tipo === '3') || (tipo === '4') ? true : false}> {tipo === '4' ? 'Cancelado' : 'Entregue'}</Text>
                </Div>
            </Bar>
            <Text top="20px">Data/Hora do pedido: {dt} </Text>
        </Conteiner>
    )
}

export default StatusProgress;