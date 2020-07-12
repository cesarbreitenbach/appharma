import { createStackNavigator } from 'react-navigation-stack';

import Shop from '../screens/Shop'
import Produto from '../screens/Produto'


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
         headerShown: false
      },
});

export default ShopStack;
