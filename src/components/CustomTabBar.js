import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'


const TabBarArea = styled.SafeAreaView`
    flex-direction:row;
    background-color:#016e66;
   
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
    background-color:#016e66;
    border-radius:45px;
    margin-top:-30px;
    justify-content:center;
    align-items:center;
    border:5px solid #FFF;
`;


const CustomTabBar = props => {

   const go = (route, icon) => {
      console.log(`Clicou em: ${icon}`)
      props.setActivePage(icon)

      console.log(`active page: ${props.activePage}`)
      props.navigation.navigate(route);
   }

   let tabs = props.items.map(item => {
      return (
         <TabBarItem key={item.route}>
            {item.type == 'regular' &&
               <TabRegular underlayColor="#ddd" onPress={() => go(item.route, item.icon)}>
                  <>
                     <TabImage>
                        {props.activePage === item.icon ?
                           <Icon name={item.icon} size={25} color="#18c9bc" /> :
                           <Icon name={item.icon} size={25} color="rgba(255, 255, 255, 0.6)" />}
                     </TabImage>
                        <Text>{item.text}</Text>
                  </>
               </TabRegular>
            }
            {item.type == 'big' &&
               <>
                  <TabBall underlayColor="#ddd" onPress={() => go(item.route, item.icon)}>
                  {props.activePage === item.icon ?
                           <Icon name={item.icon} size={33} color="#18c9bc" /> :
                           <Icon name={item.icon} size={33}  color="rgba(255, 255, 255, 0.6)" />}
                  </TabBall>
                  <Text>{item.text}</Text>
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
      activePage: state.tabReducer.activePage
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setActivePage: (activePage) => dispatch({ type: 'SET_ACTIVE', payload: { activePage } })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTabBar);
