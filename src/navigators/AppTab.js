import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import CustomTabBar from '../components/CustomTabBar'
const TabBarComponent = props => <CustomTabBar {...props} />
import HomeStack from './HomeStack'
import WhatsAppStack from './WhatsStack'
import StatusStack from './StatusStack'
import ShopStack from './ShopStack'
import PerfilStack from './PerfilStack'
import OfertasStack from './OfertasStack'

const AppTab = createBottomTabNavigator({
   HomeStack,
   OfertasStack,
   ShopStack,
   PerfilStack,
   WhatsAppStack,
   StatusStack
},
 {
   tabBarComponent: props => (
      <TabBarComponent {...props}
      items={[
         {type:'regular', text:'Inicio', icon:"home", route:'HomeStack'},
         {type:'regular', text:'Whatsapp', icon:"whatsapp", route:'WhatsAppStack'},
         {type:'big', text:'Compras', icon:"cart", route:'Shop'},
         {type:'regular', text:'Status', icon:"truck-delivery", route:'StatusStack'},
         {type:'regular', text:'Perfil', icon:"account-circle", route:'PerfilStack'}
      ]} />
    ),
})

export default createAppContainer(AppTab)