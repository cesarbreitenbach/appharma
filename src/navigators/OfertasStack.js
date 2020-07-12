import { createStackNavigator } from 'react-navigation-stack';

import Ofertas from '../screens/Ofertas'

const OfertasStack = createStackNavigator({
   Ofertas:{
      screen: Ofertas,
   }
}, {
      initialRouteName:'Ofertas',
      defaultNavigationOptions:{
         headerShown: false
      },
});

export default OfertasStack;
