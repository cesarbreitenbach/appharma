import { createStackNavigator } from 'react-navigation-stack';

import Perfil from '../screens/Perfil'
import Mydata from '../screens/MyData'
import { CORSECUNDARIA } from "@env";

const PerfilStack = createStackNavigator({
   Perfil:{
      screen: Perfil,
   },
   Mydata:{
       screen: Mydata,
   }
  
}, {
      initialRouteName:'Perfil',
      defaultNavigationOptions:{
        headerStyle:{backgroundColor:CORSECUNDARIA, height:80}
     },
});

export default PerfilStack;
