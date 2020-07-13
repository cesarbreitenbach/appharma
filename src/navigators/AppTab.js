import React from 'react'

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import CustomTabBar from '../components/CustomTabBar'
const TabBarComponent = props => <CustomTabBar {...props} />;
import HomeStack from './HomeStack'
import ShopStack from './ShopStack'
import PerfilStack from './PerfilStack'
import OfertasStack from './OfertasStack'

const AppTab = createBottomTabNavigator({
   HomeStack,
   OfertasStack,
   ShopStack,
   PerfilStack
},
 {
   tabBarComponent: props => (
      <TabBarComponent {...props}
      items={[
         {type:'regular', text:'Inicio', icon:require('../assets/home.png'), route:'HomeStack'},
         {type:'big', text:'Ofertas', icon:require('../assets/off.png'), route:'OfertasStack'},
         {type:'big', text:'Compras', icon:require('../assets/buy.png'), route:'ShopStack'},
         {type:'regular', text:'Perfil', icon:require('../assets/perfil.png'), route:'PerfilStack'}
      ]} />
    ),
})

export default createAppContainer(AppTab)