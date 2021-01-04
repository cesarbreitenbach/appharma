import { createStackNavigator } from 'react-navigation-stack';

import Whats from '../screens/Whats'

const WhatsStack = createStackNavigator({
   Whats:{
      screen: Whats,
   }
}, {
      initialRouteName:'Whats',
      defaultNavigationOptions:{
         headerShown: false
      },
});

export default WhatsStack;
