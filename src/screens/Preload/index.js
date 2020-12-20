import React, { useEffect, useState } from 'react'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect, useDispatch } from 'react-redux';
import api from '../../helpers/api'
import { Conteiner, Title, Logo } from './styled'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import messaging from '@react-native-firebase/messaging'
import TokenHandler from '../../helpers/TokenHandler'


const Preload = (props) => {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const dispatch = useDispatch();

    const go = () => {
        props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'AppTab' }),
            ],
        }));
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

    useEffect(() => {

        if (!props.token) {
            console.log("Vou pegar goBest")
            const goBest = async () => {
                try {
                    const r = await api.get(`promocoes/best`);
                    props.setPromocoes(r.data)
                    go()
                } catch (e) {
                    console.log(e)
                    setErrorMessage(e.message)
                    setError(true)
                }
            }
            goBest()

        } else {
            const validaToken = async () => {
                const validToken = await TokenHandler(props.token)
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
                    console.log(e.message)
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
                    console.log(e.message)
                }

            }
            getToken()

        } else {
            if (props.token && !props.tokenFcm) {
                const attIdUserFcmToken = async () => {
                    try {
                        const tokenAux = props.tokenFcmGuest
                        console.log(`entrei alterar dono o token ${tokenAux}`)
                        const resp = await api.put(`fcm`, { token: tokenAux }, { headers: { auth: props.token } })
                        props.setFcmToken(tokenAux)
                        console.log('Alterei dono do fcmtoken')
                    } catch (e) {
                        console.log(e.message)
                    }
                }
                attIdUserFcmToken()
            } else {
                const atualizaUltimoAcesso = async () => {
                    try{
                        await api.post('lastacess', { fcmToken: props.tokenFcmGuest })
                        console.log("Alterei a data de ultimo acesso do token: " +  props.tokenFcmGuest )
                    }catch(e){
                        console.log(e.mesage)
                    }
                }
                atualizaUltimoAcesso()
            }

        }

    }, [])


    return (
        <Conteiner>

            {!error &&
                <>
                    <Title size="16px" style={{ fontFamily: "Roboto Black" }}>Approach Mobile </Title>
                    <Logo source={require('../../assets/logo.png')} />
                    <Title size="14px" style={{ fontFamily: "Roboto Black" }}>Solutions</Title>
                </>}

            {error &&
                <>
                    <Title size="18px" color="#999" style={{ fontFamily: "Ubuntu Black" }}>Desculpe, serviço indisponivel!</Title>
                    <Icon name="android-debug-bridge" color="#1b8c39" size={80} />
                    <Title size="18px" color="#999" style={{ fontFamily: "Ubuntu Black", marginBottom: 0 }}>Estamos trabalhando nisso,</Title>
                    <Title size="18px" color="#999" style={{ fontFamily: "Ubuntu Black" }}>volte mais tarde. </Title>
                    <Title size="12px" style={{ fontFamily: "Roboto Black", marginTop: 50 }} >Erro: {errorMessage}</Title>

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
