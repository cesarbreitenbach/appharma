import { createStackNavigator } from 'react-navigation-stack';
import Shop from '../screens/Shop'
import Produto from '../screens/Produto'
import ProductList from '../screens/ProductList'
import Cart from '../screens/Cart'
import Search from '../screens/Search'
import SubCategories from '../screens/SubCategorias'
import { CORSECUNDARIA } from "@env";

const ShopStack = createStackNavigator({
   Shop:{
      screen: Shop,
   },
   Produto:{
      screen: Produto,
   },
   Cart:{
      screen:Cart,
   },
   Search:{
      screen:Search,
   },
   SubCategories:{
       screen:SubCategories,
   },
   ProductList:{
       screen:ProductList,
   }
}, {
      initialRouteName:'Shop',
      defaultNavigationOptions:{
         headerStyle:{backgroundColor:CORSECUNDARIA, height:80}
      },
      
});

ShopStack.navigationOptions = ({ navigation }) => {

   let tabBarVisible = true;

   let routeName = navigation.state.routes[navigation.state.index].routeName

   if ( routeName != 'Shop' ) {
       tabBarVisible = false
   }

   return {
       tabBarVisible,
   }
}

export default ShopStack;
