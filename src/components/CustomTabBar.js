import React, {useState} from 'react';
import { Text, Linking } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect, useSelector } from 'react-redux'

const TabBarArea = styled.SafeAreaView`
    flex-direction:row;
    background-color:${ props => props.cor || '#3f9168'};
   
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
    background-color:${props => props.cor || '#3f9168'};
    border-radius:45px;
    justify-content:center;
    align-items:center;
    margin-top:3px
    border:4px solid #FFF;
`;


const CustomTabBar = props => {

    const whatsapp = useSelector(state => state.cartReducer.whatsapp)
    const cor_primaria = useSelector(state => state.shopReducer.cor_primaria)
    const cor_secundaria = useSelector(state => state.shopReducer.cor_secundaria)

    const go = async (route, icon) => {
        props.setActivePage(icon)

        if (icon == 'whatsapp') {
            const link = `whatsapp://send?text=Oi, estou comprando pelo APP e surgiu uma duvida.&phone=+55${whatsapp}`
            const supported = await Linking.canOpenURL(link);
            if (!supported) {
                alert("Não encontrei o aplicativo Whatsapp  para enviar mensagem!")
            } else {
                await Linking.openURL(link);
            }
        }

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
                                <Text style={{ fontSize:12, fontFamily: 'Roboto Regular', color: '#fff' }}>{item.text}</Text> :
                                <Text style={{ fontSize:12, fontFamily: 'Roboto Regular', color: "rgba(255, 255, 255, 0.6)" }}>{item.text}</Text>}
                        </>
                    </TabRegular>
                }
                {item.type == 'big' &&
                    <>
                        <TabBall underlayColor="#ddd" cor = {cor_secundaria} onPress={() => go(item.route, item.icon)}>
                            {props.activePage === item.icon ?
                                <Icon name={item.icon} size={33} color="#fff" /> :
                                <Icon name={item.icon} size={33} color="rgba(255, 255, 255, 0.6)" />}
                        </TabBall>

                    </>
                }
            </TabBarItem>
        );
    });

    return (
        <TabBarArea cor = {cor_primaria}>
            {tabs}
        </TabBarArea>
    )
}

const mapStateToProps = (state) => {
    return {
        activePage: state.tabReducer.activePage,
        token: state.authReducer.token,
        cpf: state.userReducer.cpf,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActivePage: (activePage) => dispatch({ type: 'SET_ACTIVE', payload: { activePage } }),
        setPromocoes: (promocoes) => dispatch({ type: 'SET_PROMOCOES', payload: { promocoes } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTabBar);
