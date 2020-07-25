import { createStackNavigator } from 'react-navigation-stack';

import Inicio from '../screens/Inicio'
import Login from '../screens/Login'
import ConfirmPassword from '../screens/ConfirmPassword'

const HomeStack = createStackNavigator({
   Inicio:{
      screen: Inicio,
   },
   Login:{
      screen: Login,
   },
   ConfirmPassword:{
      screen:ConfirmPassword
   }
}, {
      initialRouteName:'Inicio',
      defaultNavigationOptions:{
         headerShown: true
      },
});

export default HomeStack;
