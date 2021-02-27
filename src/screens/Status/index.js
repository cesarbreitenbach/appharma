import React, { useState, useEffect } from 'react';
import { Conteiner, DescText, Text, Lista } from './styled'
import { useSelector } from 'react-redux'
import HeaderTitle from '../../components/HeaderTitle'
import Back from '../../components/Back'
import BarraProgresso from '../../components/status/BarraProgresso'
import useApi from '../../helpers/apiAppharma'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Page = () => {

    const [listaPedidos, setListaPedidos] = useState([])
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
            {(typeof(listaPedidos) !== 'undefined' && listaPedidos.length > 0) &&
                <>
                    <DescText size={hp('2%')} >Qualquer duvida com seu pedido entre em contato no WhatsApp!</DescText>

                    <Lista
                        showsVerticalScrollIndicator={false}
                        data={listaPedidos}
                        renderItem={({ item, index }) => <BarraProgresso key={item.id} data={item} />}
                        decelerationRate="fast"
                        maxToRenderPerBatch={20}
                        snapToInterval={130}
                        keyExtractor={(item, index) => `${item.nome}-${index}`}
                    />
                </>
            }

            {(typeof (listaPedidos) === 'undefined') &&
                <DescText size={hp('2%')} >Ops, você ainda não possui pedidos. Vamos às compras ? </DescText>
            }

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