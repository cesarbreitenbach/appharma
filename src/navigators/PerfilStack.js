import { createStackNavigator } from 'react-navigation-stack';

import Perfil from '../screens/Perfil'

const PerfilStack = createStackNavigator({
   Perfil:{
      screen: Perfil,
   },
  
}, {
      initialRouteName:'Perfil',
      defaultNavigationOptions:{
         headerShown: false
      },
});

export default PerfilStack;
