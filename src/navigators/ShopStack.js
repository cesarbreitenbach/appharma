import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import SearchBar from '../components/Shop/SearchBar'
import Shop from '../screens/Shop'
import Produto from '../screens/Produto'
import Cart from '../screens/Cart'
import padroes from '../config/padroes'

const ShopStack = createStackNavigator({
   Shop:{
      screen: Shop,
   },
   Produto:{
      screen: Produto,
   },
   Cart:{
      screen:Cart,
   }
}, {
      initialRouteName:'Shop',
      defaultNavigationOptions:{
         headerTitle: () =><SearchBar />,
         headerStyle:{backgroundColor:padroes.corPrincipal}
      },
      
});

ShopStack.navigationOptions = ({ navigation }) => {

   let tabBarVisible = true;

   let routeName = navigation.state.routes[navigation.state.index].routeName

   if ( routeName == 'Cart' ) {
       tabBarVisible = false
   }

   return {
       tabBarVisible,
   }
}

export default ShopStack;
