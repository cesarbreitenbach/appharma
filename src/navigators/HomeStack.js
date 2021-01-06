import { createStackNavigator } from 'react-navigation-stack';
import Inicio from '../screens/Home'
import Login from '../screens/Login'
import ConfirmPassword from '../screens/ConfirmPassword'
import{CORSECUNDARIA} from '@env'



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
         headerShown: true,
         headerStyle:{backgroundColor:CORSECUNDARIA, height:80}
      },
});

export default HomeStack;
