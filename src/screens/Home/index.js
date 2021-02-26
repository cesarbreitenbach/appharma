import React, { useEffect } from 'react';
import { Conteiner, ConteinerArea, ScrollArea } from './styled'
import Vitrine from '../../components/Inicio/Vitrine'
import BuyNow from '../../components/Inicio/BuyNow'
import LoginArea from '../../components/Inicio/LoginArea'
import GreetensArea from '../../components/Inicio/GreetensArea'
import Cart from '../../components/Cart'
import SearchBar from '../../components/SearchBar'
import { connect, useSelector } from 'react-redux'

const Page = (props) => {

    const remoteMessage = useSelector(state => state.messageReducer.remoteMessage);

    useEffect(() => {
        console.log("Esse é o remote no home", remoteMessage)
        if (remoteMessage) {
            props.navigation.navigate("StatusStack", {idvenda:remoteMessage.data.idvenda})
        }
    }, [])



    return (
        <Conteiner>
            <ConteinerArea>
                <ScrollArea showsVerticalScrollIndicator={false}>
                    <GreetensArea nome={props.nome} />
                    <Vitrine navigation={props.navigation} />
                    <BuyNow navigation={props.navigation} />
                    {!props.token && <LoginArea navigation={props.navigation} />}
                    <ConteinerArea style={{ marginTop: 10 }} />

                </ScrollArea>

            </ConteinerArea>
        </Conteiner>
    );
}

Page.navigationOptions = ({ navigation }) => {
    const goCart = () => {
        navigation.navigate('Cart')
    }
    return {
        headerRight: () => <Cart goCart={goCart} />,
        headerTitle: () => <SearchBar navigation={navigation} />
    }
}


const mapStateToProps = (state) => {
    return {
        cpf: state.userReducer.cpf,
        nome: state.userReducer.name,
        token: state.authReducer.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCpf: (cpf) => dispatch({ type: 'SET_CPF', payload: { cpf } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);