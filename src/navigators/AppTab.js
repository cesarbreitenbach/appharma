import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import CustomTabBar from '../components/CustomTabBar'
const TabBarComponent = props => <CustomTabBar {...props} />
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
         {type:'regular', text:'Inicio', icon:"home", route:'HomeStack'},
       // {type:'big', text:'Ofertas', icon:"local-offer", route:'OfertasStack'},
         {type:'big', text:'Compras', icon:"shopping-cart", route:'Shop'},
         {type:'regular', text:'Perfil', icon:"account-circle", route:'PerfilStack'}
      ]} />
    ),
})

export default createAppContainer(AppTab)