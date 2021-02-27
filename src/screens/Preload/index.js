import React, { useEffect, useState } from 'react'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect, useDispatch, useSelector } from 'react-redux';
import api from '../../helpers/api'
import useApi from '../../helpers/apiAppharma'
import { Conteiner, Title, Logo } from './styled'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import messaging from '@react-native-firebase/messaging'
import useTokenHandler from '../../helpers/TokenHandler'
import { getVersion } from 'react-native-device-info'


const Preload = (props, { idvenda, tipo }) => {

    const descricao = useSelector(state => state.shopReducer.descricao)
    const cor_primaria = useSelector(state => state.shopReducer.cor_primaria)
    const logo = useSelector(state => state.shopReducer.logo)
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const dispatch = useDispatch();
    const appharma = useApi()
    const tokenHandler = useTokenHandler()



    const go = () => {

        setTimeout(() => {
            props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'AppTab' }),
                ],
            }));
        }, 2000)
    }

    const goMsg = (remoteMessage) => {
        dispatch({
            type: 'SET_REMOTEMESSAGE',
            payload: remoteMessage
        })
        console.log("Coloquei o remote message no reducer")
    }

    const login = () => {
        dispatch({
            type: 'CLEAR_AUTH',
        })

        props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'AppTab' }),
            ],
        }));
    }


    const handleOpenMgm = (remoteMessage) => {


        if (remoteMessage) {

            switch (remoteMessage.data.tipo) {
                case 'Broadcast':
                    console.log("Recebi um broadcast e não vou fazer nada")
                    break;
                default:
                    console.log('Mandou outro tipo de mensagem')
                    goMsg(remoteMessage)
                    break;
            }

        }


    }

    useEffect(() => {
        //permissao
        const reqNotifPerm = async () => {
            const authStatus = await messaging().requestPermission()
            const token = await messaging().getToken()
        }

        reqNotifPerm()

        //recebendo notificação app aberto
        try {

            const unsubscribe = messaging().onMessage(async remoteMessage => {
                console.log("Mudando o tipo do reducer")
                dispatch({
                    type: 'SET_MSGTIPO',
                    payload: remoteMessage.data.tipo
                })

            });

            messaging().onNotificationOpenedApp(handleOpenMgm);

            messaging().getInitialNotification().then(handleOpenMgm)

        

        } catch (e) {
            console.log('não  estou ouvindo notificações ' + e.message)
        }


    }, [])



    useEffect(() => {

        const getConfigs = async () => {
            const configs = await appharma.getConf()

            dispatch({
                type: 'TAXA_ENTREGA',
                payload: configs[0].taxa_entrega
            })

            dispatch({
                type: 'WHATSAPP',
                payload: configs[0].whatsapp
            })

            dispatch({
                type: 'SET_LOGO',
                payload: configs[0].logo
            })

            dispatch({
                type: 'SET_DESCRICAO',
                payload: configs[0].descricao
            })

            dispatch({
                type: 'SET_COR_PRIMARIA',
                payload: configs[0].cor_primaria
            })

            dispatch({
                type: 'SET_COR_SECUNDARIA',
                payload: configs[0].cor_secundaria
            })

        }
        getConfigs()

    }, [])

    const getAppVersion = async () => {
        const versionAtual = await appharma.getAppVersion()
        const versionUser = getVersion()

        if (versionAtual[0].version !== versionUser) {
            setError(true)
            setErrorMessage("Atualize o aplicativo na loja!")
            throw "erro de versão"
        }
    }

    useEffect(() => {

        getAppVersion().then(resp => {

            if (!props.token) {
                const goBest = async () => {
                    try {
                        const r = await api.get(`promocoes/best`);
                        props.setPromocoes(r.data)
                        go()
                    } catch (e) {
                        console.log("Catch do promocoes/best" + JSON.stringify(e))
                        setErrorMessage(e.message)
                        setError(true)
                    }
                }
                goBest()

            } else {
                const validaToken = async () => {
                    const validToken = await tokenHandler.testaToken(props.token)
                    if (validToken.expirou) {
                        login();
                    }

                }
                validaToken()
                const getDirect = async () => {
                    try {
                        const r = await api.get(`promocoes/direct?cpf=${props.cpf}`, { headers: { auth: props.token } });
                        if (!r) {
                            setErrorMessage('Erro, estamos arrumando... ')
                            setError(true)
                        }
                        props.setPromocoes(r.data)
                        const tmpList = await api.get('/endereco', { headers: { auth: props.token } })
                        props.setAddressList(tmpList.data)
                        go()
                    } catch (e) {
                        setErrorMessage(e.message)
                        setError(true)
                    };
                }
                getDirect()
            }

            //Coloca token fcm no reducer
            if (!props.tokenFcmGuest) {
                const getToken = async () => {
                    const token = await messaging().getToken()
                    props.setFcmTokenGuest(token)

                    try {
                        const resp = await api.post(`fcm`, { token })
                    } catch (e) {
                        console.log(e.response.data.error)
                    }

                }
                getToken()

            } else {
                if (props.token && !props.tokenFcm) {
                    const attIdUserFcmToken = async () => {
                        try {
                            const tokenAux = props.tokenFcmGuest
                            const resp = await api.put(`fcm`, { token: tokenAux }, { headers: { auth: props.token } })
                            props.setFcmToken(tokenAux)
                        } catch (e) {
                            console.log(e.message)
                        }
                    }
                    attIdUserFcmToken()
                } else {
                    const atualizaUltimoAcesso = async () => {
                        try {
                            await api.post('lastacess', { fcmToken: props.tokenFcmGuest })
                        } catch (e) {
                            console.log(e.mesage)
                        }
                    }
                    atualizaUltimoAcesso()
                }

            }

        })



    }, [])

    useEffect(() => {
        if (!tipo) {
            return;
        }
        if (!idvenda) {
            return;
        }

        console.log(`Esse é o tipo: ${tipo} e essa é a venda: ${idvenda}`)

    }, [])

    return (
        <Conteiner>

            {!error &&
                <>
                    <Title size="17px" color={cor_primaria} style={{ fontFamily: "Roboto Black" }}> {descricao} </Title>
                    <Logo source={require('../../assets/logo.png')} />
                    <Title size="12px" style={{ fontFamily: "Roboto Black" }}> Approach Mobile Company</Title>
                </>}

            {error &&
                <>
                    <Title size="18px" color="#999" style={{ fontFamily: "Ubuntu Black" }}>Desculpe, serviço indisponivel!</Title>
                    <Icon name="android-debug-bridge" color="#1b8c39" size={80} />
                    <Title size="18px" color="#999" style={{ fontFamily: "Ubuntu Black", marginBottom: 0 }}>Estamos trabalhando nisso,</Title>
                    <Title size="18px" color="#999" style={{ fontFamily: "Ubuntu Black" }}>volte mais tarde. </Title>
                    <Title size="16px" style={{ fontFamily: "Roboto Black", marginTop: 50 }} >Erro: {errorMessage}</Title>

                </>
            }
        </Conteiner>
    );
};

const mapStateToProps = (state) => {
    return {
        promocoes: state.vitrineReducer.promocoes,
        token: state.authReducer.token,
        tokenFcm: state.userReducer.tokenFcm,
        tokenFcmGuest: state.userReducer.tokenFcmGuest,
        id: state.userReducer.id,
        cpf: state.userReducer.cpf,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPromocoes: (promocoes) => dispatch({ type: 'SET_PROMOCOES', payload: { promocoes } }),
        setAddressList: (list) => dispatch({ type: 'SET_ADDRESS', payload: { addressList: list } }),
        setFcmToken: (tokenFcm) => dispatch({ type: 'SET_FCMTOKEN', payload: { tokenFcm } }),
        setFcmTokenGuest: (tokenFcmGuest) => dispatch({ type: 'SET_FCMTOKENGUEST', payload: { tokenFcmGuest } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preload);
