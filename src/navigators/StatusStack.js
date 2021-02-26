import { createStackNavigator } from 'react-navigation-stack';
import{CORSECUNDARIA} from '@env'

import Status from '../screens/Status'

const StatusStack = createStackNavigator({
   Status:{
      screen: Status,
   }
}, {
      initialRouteName:'Status',
      defaultNavigationOptions:{
        headerShown: true,
        headerStyle:{backgroundColor:CORSECUNDARIA, height:80}
     },
      
});

export default StatusStack;
