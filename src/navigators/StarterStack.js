import {createStackNavigator} from 'react-navigation-stack'
import StarterIntro from '../screens/StarterIntro'
import StarterName from '../screens/StarterName'
import StarterDias from '../screens/StarterDias'

export default createStackNavigator({
   StarterIntro:{
      screen:StarterIntro,
      header:null,
   },
   StarterName:{
      screen:StarterName,
      header:null
   },
   StarterDias:{
      screen:StarterDias,
      header:null
   }
})