import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import SearchBar from '../components/Shop/SearchBar'
import Shop from '../screens/Shop'
import Produto from '../screens/Produto'
import padroes from '../config/padroes'

const ShopStack = createStackNavigator({
   Shop:{
      screen: Shop,
   },
   Produto:{
      screen: Produto,
   },
}, {
      initialRouteName:'Shop',
      defaultNavigationOptions:{
         headerTitle: () =><SearchBar />,
         headerStyle:{backgroundColor:padroes.corPrincipal}
      },
      
});

export default ShopStack;
