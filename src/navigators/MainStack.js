import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Preload from '../screens/Preload';
import AppTab from '../navigators/AppTab';

const config = {
   animation: 'spring',
   config: {
     stiffness: 1000,
     damping: 10,
     mass: 3,
     overshootClamping: true,
     restDisplacementThreshold: 0.01,
     restSpeedThreshold: 0.01,
   },
 };

const MainStack = createStackNavigator({
   Preload:{
      screen: Preload,
   },
   AppTab:{
      screen:AppTab,
   },
}, {
      initialRouteName:'Preload',
      navigationOptions:{
         transitionSpec: {
            open: config,
            close: config,
          },
      },
      defaultNavigationOptions:{
         headerShown: false
      },
});

export default createAppContainer(MainStack);
