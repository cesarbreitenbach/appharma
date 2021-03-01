import React, { useState } from 'react';
import { Conteiner, Text, ScrollArea, Footer, Avatar, ItemMenu } from './styled'
import { useDispatch, useSelector } from 'react-redux'
import Back from '../../components/Back'
import Cart from '../../components/Cart'

const Menu = [
    { id: 1, desc: "Meus Dados" },
    { id: 5, desc: "Historico de Compras" },
    { id: 4, desc: "Opções" },
    { id: 2, desc: "Excluir Conta" },
    { id: 3, desc: "Sair" },
]


const Page = ({ data }) => {

    const [listaMenu, setListaMenu] = useState(Menu)

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
            <Avatar source={require('../../assets/avatar2.png')} />
            <ScrollArea
                showsVerticalScrollIndicator={false}
                data={listaMenu}
                renderItem={({ item, index }) =>
                    <ItemMenu opacity={0.7}>
                        <Text key={index} color="#000" family="Roboto Light" >{item.desc}</Text>
                    </ItemMenu>}
                decelerationRate="fast"
                maxToRenderPerBatch={20}
                snapToInterval={130}
                keyExtractor={(item, index) => item.id.toString()}
            />
            <Footer >
                <Text size="12px" color="#888">Desenvolvido por Approach Mobile Company</Text>
            </Footer>

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
        headerLeft: () => <Back navigation={navigation} />,
        headerTintColor: '#fff',
    }
}

export default Page;