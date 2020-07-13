import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import styled from 'styled-components/native';

const TabBarArea = styled.SafeAreaView`
    flex-direction:row;
    background-color:#FFF;
   
`;
const TabBarItem = styled.View`
    flex:1;
    height:65px;
    align-items:center;
`;
const TabImage = styled.Image`
    width:25px;
    height:25px;
    margin-top:10px;
    margin-bottom:5px;
`;
const TabRegular = styled.TouchableHighlight`
    align-items:center;
`;
const TabBall = styled.TouchableHighlight`
    width:65px;
    height:65px;
    background-color:#9d80ff;
    border-radius:45px;
    margin-top:-30px;
    justify-content:center;
    align-items:center;
    border:5px solid #FFF;
`;
const TabBallImage = styled.Image`
    width:40px;
    height:40px;
`;

const CustomTabBar = props => {

    const go = (route) => {
        props.navigation.navigate(route);
    }

    let tabs = props.items.map(item=>{
        return (
            <TabBarItem key={item.route}>
                {item.type == 'regular' &&
                    <TabRegular underlayColor="transparent" onPress={()=>go(item.route)}>
                        <>
                            <TabImage source={item.icon} />
                            <Text>{item.text}</Text>
                        </>
                    </TabRegular>
                }
                {item.type == 'big' &&
                <>
                    <TabBall underlayColor="#9d80ff" onPress={()=>go(item.route)}>
                        <TabBallImage source={item.icon} />
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

export default CustomTabBar;