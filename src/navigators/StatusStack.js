import { createStackNavigator } from 'react-navigation-stack';

import Status from '../screens/Status'

const StatusStack = createStackNavigator({
   Status:{
      screen: Status,
   }
}, {
      initialRouteName:'Status',
      defaultNavigationOptions:{
         headerShown: false
      },
});

export default StatusStack;
