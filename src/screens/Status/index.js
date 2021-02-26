import React, { useState, useEffect } from 'react';
import { Conteiner, DescText, Text, Lista } from './styled'
import { useSelector } from 'react-redux'
import HeaderTitle from '../../components/HeaderTitle'
import Back from '../../components/Back'
import BarraProgresso from '../../components/status/BarraProgresso'
import useApi from '../../helpers/apiAppharma'

const Page = () => {

    const [listaPedidos, setListaPedidos] = useState([0])
    const token = useSelector(state => state.authReducer.token);
    const idUser = useSelector(state => state.userReducer.id);
    const api = useApi()

    const getStatus = async () => {
        const resp = await api.getStatus(idUser, token)
        setListaPedidos(resp)
    }

    useEffect(() => {
        getStatus()
    }, [])

    const remoteMessage = useSelector(state => state.messageReducer.remoteMessage)
    let chave = '';
    if (remoteMessage) {
        chave = remoteMessage.data.idvenda;
    }
    return (
        <Conteiner>
            <DescText size="14px" color="#ff0000">Qualquer duvida com seu pedido entre em contato no WhatsApp!</DescText>

            <Lista
                showsVerticalScrollIndicator={false}
                data={listaPedidos}
                renderItem={({ item, index }) => <BarraProgresso key={item.id} data={item} /> }
                decelerationRate="fast"
                maxToRenderPerBatch={20}
                snapToInterval={130}
                keyExtractor={(item, index) => `${item.nome}-${index}`}
            />


            
        </Conteiner>
    );
}

Page.navigationOptions = ({ navigation }) => {

    return {
        headerTitle: () => <HeaderTitle title="Acompanhe seus pedidos" />,
        headerLeft: () => <Back navigation={navigation} />
    }
}

export default Page;