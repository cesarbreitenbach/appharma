import { createStackNavigator } from 'react-navigation-stack';

import Inicio from '../screens/Inicio'

const HomeStack = createStackNavigator({
   Inicio:{
      screen: Inicio,
   },
}, {
      initialRouteName:'Inicio',
      defaultNavigationOptions:{
         headerShown: false
      },
});

export default HomeStack;
