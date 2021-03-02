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


const Page = ({ data, navigation }) => {

    const [listaMenu, setListaMenu] = useState(Menu)
    const dispatch = useDispatch()
    const status = useSelector(state => state.authReducer.status)

    const handleClick = (id) => {
        
        if (id !== 3 && !status){
            alert("Usuario desconectado, faça login ou cadastre-se gratis!")
            return
        }

        switch (id) {
            case 1:
                navigation.navigate('Mydata')
                break;
            case 3:
                logout()
                break;
        
            default:
                break;
        }

    }

    const logout = async () => {

        dispatch({
            type: 'SET_STATUS',
            payload: {
                status: false
            }
        })

        dispatch({
            type: 'SET_ACTIVE',
            payload: {
                activePage: 'home'
            }
        })

        dispatch({
            type: 'CLEAR_CART',
        })

        dispatch({
            type: 'CLEAR_USERREDUCER',
        })

        dispatch({
            type: 'CLEAR_AUTH',
        })

        navigation.navigate('Preload')
    }

    return (
        <Conteiner>
            <Avatar source={require('../../assets/avatar2.png')} />
            <ScrollArea
                showsVerticalScrollIndicator={false}
                data={listaMenu}
                renderItem={({ item, index }) =>
                    <ItemMenu activeOpacity={0.7} onPress={() => handleClick(item.id)}>
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