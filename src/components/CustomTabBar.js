import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import padrao from '../config/padroes'
import {promoRandom} from '../services/PromoService'


const TabBarArea = styled.SafeAreaView`
    flex-direction:row;
    background-color:${padrao.corPrincipal || '#3f9168'};
   
`;
const TabBarItem = styled.View`
    flex:1;
    height:65px;
    align-items:center;
`;
const TabImage = styled.View`
    width:25px;
    height:25px;
    margin-top:10px;
    margin-bottom:5px;
`;
const TabRegular = styled.TouchableHighlight`
    align-items:center;
`;
const TabBall = styled.TouchableHighlight`
    width:57px;
    height:57px;
    background-color:${padrao.corPrincipal || '#3f9168'};
    border-radius:45px;
    margin-top:-30px;
    justify-content:center;
    align-items:center;
    border:5px solid #FFF;
`;


const CustomTabBar = props => {

   const go = async (route, icon) => {
      console.log(`Clicou em: ${icon}`)
      props.setActivePage(icon)

      if(icon=='home'){
         await promoRandom(props);
      }

      console.log(`active page: ${props.activePage}`)
      props.navigation.navigate(route);
   }

   let tabs = props.items.map(item => {
      return (
         <TabBarItem key={item.route}>
            {item.type == 'regular' &&
               <TabRegular underlayColor="transparent" onPress={() => go(item.route, item.icon)}>
                  <>
                     <TabImage>
                        {props.activePage === item.icon ?
                           <Icon name={item.icon} size={25} color="#fff" /> :
                           <Icon name={item.icon} size={25} color="rgba(255, 255, 255, 0.6)" />}
                     </TabImage>
                     {props.activePage === item.icon ?
                        <Text style={{ fontFamily: 'Roboto Regular', color: '#fff' }}>{item.text}</Text> :
                        <Text style={{ fontFamily: 'Roboto Regular', color: "rgba(255, 255, 255, 0.6)" }}>{item.text}</Text>}
                  </>
               </TabRegular>
            }
            {item.type == 'big' &&
               <>
                  <TabBall underlayColor="#ddd" onPress={() => go(item.route, item.icon)}>
                     {props.activePage === item.icon ?
                        <Icon name={item.icon} size={33} color="#fff" /> :
                        <Icon name={item.icon} size={33} color="rgba(255, 255, 255, 0.6)" />}
                  </TabBall>
                  {props.activePage === item.icon ?
                     <Text style={{ fontFamily: 'Roboto Regular', color: '#fff' }}>{item.text}</Text> :
                     <Text style={{ fontFamily: 'Roboto Regular', color: "rgba(255, 255, 255, 0.6)" }}>{item.text}</Text>}
               </>
            }
         </TabBarItem>
      );
   });

   return (
      <TabBarArea>
         {tabs}
      </TabBarArea>
   )
}

const mapStateToProps = (state) => {
   return {
      activePage: state.tabReducer.activePage,
      token: state.authReducer.token,
      cpf:state.userReducer.cpf,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setActivePage: (activePage) => dispatch({ type: 'SET_ACTIVE', payload: { activePage } }),
      setPromocoes: (promocoes) => dispatch({ type: 'SET_PROMOCOES', payload: { promocoes } })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTabBar);
