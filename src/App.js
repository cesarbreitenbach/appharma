import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native'
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './store';
import MainStack from './navigators/MainStack';
import CodePush from 'react-native-code-push'
import messaging from '@react-native-firebase/messaging'

import conf from './config/configurador'

const App = () => {

    const [corPrincipal, setCorPrincipal] = useState('')
    const [corSecundaria, setCorSecundaria] = useState('')


    useEffect(() => {
        const getConfigurador = async () => {
            const resp = await conf();
            console.log(JSON.stringify(resp))
            setCorPrincipal(resp[0].cor_principal)
            setCorSecundaria(resp[0].cor_secundaria)
        }
        getConfigurador()
    }, [])

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
                console.log('Recebido com app aberto: ' + JSON.stringify(remoteMessage.data));

            });



            return unsubscribe;
        } catch (e) {
            console.log('não  estou ouvindo notificações ' + e.message)
        }


    }, [])


    return (

        <>
            <StatusBar barStyle="light-content" translucent backgroundColor={corSecundaria || "#016e66"} />
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor} >
                    <MainStack  />
                </PersistGate>
            </Provider>

        </>
    );
};

export default CodePush({
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App)  