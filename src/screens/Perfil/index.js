import React, { useState } from 'react';
import { Conteiner, Text } from './styled'
import { useDispatch, useSelector } from 'react-redux'
import Cart from '../../components/Cart'

const Page = (props) => {




    const logout = async () => {
        props.setStatus(false);
        props.setActivePage('home')
        props.clearCart()
        props.clearUserReducer()
        props.clearAuth()
        props.navigation.navigate('Preload')
    }

    return (
        <Conteiner>

        </Conteiner>
    );
}

Page.navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    const goCart = () => {
        navigation.navigate('Cart')
    }
    return {
        headerRight: () => <Cart goCart={goCart} />,
        headerTitle: () => <Text> Perfil </Text>,
        headerTintColor: '#fff',
    }
}

export default Page;