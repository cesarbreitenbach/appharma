import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native'
import { Container, ItensOnSearch, IndicatorArea, Texto } from './styled'
import api from '../../helpers/api'
import Product from '../../components/Cart/Product'
import { format } from 'date-fns'
import {useSelector} from 'react-redux'
import { ErrorArea, Text } from '../../components/ErrorArea'
import Cart from '../../components/Cart'

const Page = ({navigation}) => {

    function getDate() {
        const date = new Date()
        const diaAno = format(date, 'yyyy-MM-dd');
        const hora = format(date, 'HH:mm:ss');
        const parsedDate = `${diaAno}T${hora}-03`
        return parsedDate
    }

    const [qtdProduto, setQtdProduto] = useState(0)
    const [nrPages, setNrPages] = useState(1)
    const [listaProdutos, setListaProdutos] = useState([])
    const [carregou, setCarregou] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const cart = useSelector(state => state.cartReducer.carrinho)
    
  

    useEffect(() => {

        let idSubCategoria = navigation.getParam('idsubcategoria') ;

        const getProducts = async () => {
            setCarregou(false)
            const data = getDate()
            const res = await api.get(`/produtos/subcategorias?id=${idSubCategoria}&data=${data}`)
            const { produtos, paginas } = res.data;

            produtos.map((item, index) => {
                const ind = cart.findIndex((i) => i.id == item.id)
                if (ind >= 0) {
                    item.qtd = cart[ind].qtd;
                }
            })

            setNrPages(paginas)
            setListaProdutos(produtos)
            setCarregou(true)
        }



        getProducts()


    }, [])


    return (
        <Container>
             {errorMsg != '' &&
                    <ErrorArea>
                        <Text size="12px" color="#fff" family="Roboto Regular">{errorMsg}</Text>
                    </ErrorArea>}
            {carregou &&
                <ItensOnSearch
                    showsVerticalScrollIndicator={false}
                    data={listaProdutos}
                    renderItem={({ item, index }) => <Product data={item} navigation={navigation} setQtdProduto={setQtdProduto} qtd={qtdProduto} setErrorMsg={setErrorMsg} />}
                    decelerationRate="fast"
                    maxToRenderPerBatch={20}
                    snapToInterval={130}
                    keyExtractor={(item, index) => `${item.nome}-${index}`}
                />
            }
            {!carregou &&
                <IndicatorArea>
                    <ActivityIndicator size="large" color="#999" />
                </IndicatorArea>
            }
        </Container>
    );
}

Page.navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    const goCart = () => {
        navigation.navigate('Cart')
    }
    return {
        headerRight: () => <Cart goCart={goCart} />,
        headerTitle: () => <Texto> {params.nomeSub} </Texto>,
        headerTintColor: '#fff',
    }
}


export default Page;