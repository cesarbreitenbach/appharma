import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native'
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {store, persistor} from './store';
import  padrao  from './config/padroes'
import MainStack from './navigators/MainStack';
import CodePush from 'react-native-code-push'
import messaging from '@react-native-firebase/messaging'

const App = () => {

   useEffect(()=>{
      //permissao
      const reqNotifPerm = async () =>{
         const authStatus = await messaging().requestPermission()
         console.log('Permissão: '+authStatus)
      }
      reqNotifPerm()

      //recebendo notificação app aberto
      const unsubscribe = messaging().onMessage(async remoteMessage => {
         console.log('Recebido com app aberto: '+ JSON.stringify(remoteMessage.notification.body) );
      });
     
      return unsubscribe;
      
   }, [])

   
  return (
     <>
     <StatusBar barStyle="light-content" translucent backgroundColor= {padrao.corPrincipal || "#016e66"}   />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainStack />
      </PersistGate>
    </Provider>
    
    </>
  );
};

export default CodePush({
   checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
