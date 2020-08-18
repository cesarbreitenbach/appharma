import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import Shop from '../screens/Shop'
import Produto from '../screens/Produto'
import Cart from '../screens/Cart'
import padroes from '../config/padroes'
import Search from '../screens/Search'

const ShopStack = createStackNavigator({
   Shop:{
      screen: Shop,
   },
   Produto:{
      screen: Produto,
   },
   Cart:{
      screen:Cart,
   },
   Search:{
      screen:Search,
   }
}, {
      initialRouteName:'Shop',
      defaultNavigationOptions:{
         headerStyle:{backgroundColor:padroes.corPrincipal, height:80}
      },
      
});

ShopStack.navigationOptions = ({ navigation }) => {

   let tabBarVisible = true;

   let routeName = navigation.state.routes[navigation.state.index].routeName

   if ( routeName == 'Produto' || routeName == 'Cart' ) {
       tabBarVisible = false
   }

   return {
       tabBarVisible,
   }
}

export default ShopStack;
