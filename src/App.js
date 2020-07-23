import React from 'react';
import {StatusBar} from 'react-native'
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {store, persistor} from './store';

import AppTab from './navigators/AppTab';

const App = () => {
  return (
     <>
     <StatusBar barStyle="light-content" translucent backgroundColor="#016e66"/>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppTab />
      </PersistGate>
    </Provider>
    </>
  );
};

export default App;
