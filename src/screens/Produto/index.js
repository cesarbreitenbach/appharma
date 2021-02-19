import React, { useEffect, useState } from 'react';
import {
    Container, Title, ProdutoArea, ProdutoImg, ProdutoScroll, ActionArea, Price, PriceInfo,
    OriginalPriceArea, DescricaoArea, HeaderArea, ExpandButtom,
    ContentArea, TitleProduct, ItemList, ActivityArea, FuckItem, SubtotalArea, InfoArea
} from './styled.js';
import { ActivityIndicator } from 'react-native'
import { View } from 'react-native'
import Search from '../../components/SearchBar'
import Cart from '../../components/Cart'
import AddDelCartButtom from '../../components/AddDelCartButtom'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../../helpers/api'
import useApi from '../../helpers/apiAppharma'
import { Animated } from 'react-native'
import ItemSimilar from '../../components/Shop/ItemSimilar'
import { connect, useSelector } from 'react-redux'
import { ErrorArea, Text } from '../../components/ErrorArea'
import { URL_FILES } from '@env'

const Produto = (props) => {

    const corPrincipal = useSelector(state => state.shopReducer.cor_primaria)
    const corSecundaria = useSelector(state => state.shopReducer.cor_secundaria)
    const [msgRdc, setMsgRdc] = useState([])
    const [heightAnim] = useState(new Animated.Value(40))
    const [isOpen, setIsOpen] = useState(false)
    const [similarList, setSimilarList] = useState([])
    const [qtdProduto, setQtdProduto] = useState(0)
    const [desconto, setDesconto] = useState(0)
    const [produto, setProduto] = useState({})

    const [error, setError] = useState(false)
    const [carregou, setCarregou] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    let idProduto = props.navigation.getParam('id')
    const [changeProduct, setChangeProduct] = useState(idProduto)

    const appApi = useApi();

    const [tipoProduto, setTipoProduto] = useState(props.navigation.getParam('tipo'))

    const animarBox = () => {

        if (!isOpen) {
            Animated.timing(heightAnim, {
                toValue: 300,
                duration: 200,
                useNativeDriver: false
            }).start()
        } else {
            Animated.timing(heightAnim, {
                toValue: 40,
                duration: 200,
                useNativeDriver: false
            }).start()
        }
        setIsOpen(!isOpen)
    }

    useEffect(() => {

        setError(false)

        let unmonted = false;

        api.get(`/produtos/consulta?id=${changeProduct}`).then(r => {

            setTipoProduto(r.data[0].tipo)
            let produtoEscolhido = r.data[0];

            const lista = props.cart;
            const index = lista.findIndex(p => p.id == produtoEscolhido.id)

            if (index >= 0) {

                let novoProduto = {
                    produtoEscolhido,
                    qtd: lista[index].qtd
                }
                if (!unmonted) {
                    setDesconto(Number.parseFloat(novoProduto.produtoEscolhido.discount));
                    setProduto(novoProduto)
                    setQtdProduto(novoProduto.qtd)
                    setCarregou(true)
                }
            } else {
                let novoProduto = {
                    produtoEscolhido,
                    qtd: 0
                }
                if (!unmonted) {
                    setDesconto(Number.parseFloat(novoProduto.produtoEscolhido.discount));
                    console.log("Esse é o novo produto")
                    console.log(JSON.stringify(novoProduto))
                    setProduto(novoProduto)
                    setQtdProduto(novoProduto.qtd)
                    setCarregou(true)
                }
            }

        }).catch(e => {
            console.log(e)
            if (!unmonted) {
                setError(true)
                setErrorMsg(e.message)
            }
        })

        return () => { unmonted = true }
    }, [changeProduct])

    useEffect(() => {
        carregaMsgRdc(idProduto)
    }, [idProduto])

    const carregaMsgRdc = async (id) => {
        const resp = await appApi.getMensagensRdc(id)
        setMsgRdc(resp)
    }

    const changeItem = (id) => {
        setChangeProduct(id)
    }

    const goCart = () => {
        console.log("Vou pro carrinho...")
        props.navigation.navigate('Cart')
    }

    return (
        <Container>
            {errorMsg != '' &&
                <ErrorArea>
                    <Text size="12px" color="#fff" family="Roboto Regular">{errorMsg}</Text>
                </ErrorArea>}
            {!carregou &&
                <ActivityArea>
                    <ActivityIndicator size="large" color="#999" />
                </ActivityArea>
            }
            {carregou &&
                <>
                    <ProdutoScroll>
                        <ProdutoArea>
                            <FuckItem>
                                <ProdutoImg source={{ uri: URL_FILES + produto.produtoEscolhido.path }} />
                                <Title color="#000" align="center">{carregou ? produto.produtoEscolhido.nome : 'aguarde...'}</Title>
                            </FuckItem>
                            <PriceInfo>
                                {(produto.produtoEscolhido.preco_original != produto.produtoEscolhido.preco_vigente) &&
                                    <OriginalPriceArea>
                                        <Price size="20px" decoration="line-through" color="#ff0000">de R$ {parseFloat(produto.produtoEscolhido.preco_original).toFixed(2).replace(".", ",")}  </Price>
                                        <Price color="#0000ff" size="18px" font="Roboto Bold">{desconto.toFixed(0)} % OFF</Price>
                                    </OriginalPriceArea>
                                }
                                <Price size="25px">por R$ {parseFloat(produto.produtoEscolhido.preco_vigente).toFixed(2).replace(".", ",")}</Price>
                            </PriceInfo>
                        </ProdutoArea>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5 }}>
                            <InfoArea style={{width:250}}>
                                <Title style={{ padding: 5 }}>Principio ativo</Title>
                                <Title size="14px" color="#000" style={{ fontFamily: "Roboto Regular", margin: 5 }}>{carregou ? produto.produtoEscolhido.principio : '...'}</Title>
                            </InfoArea>
                            <InfoArea>
                                <Title style={{ padding: 5 }}>Registro MS</Title>
                                <Title size="14px" color="#000" style={{ fontFamily: "Roboto Regular", margin: 5 }}>{carregou ? produto.produtoEscolhido.registroms : '...'}</Title>
                            </InfoArea>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5 }}>
                            <InfoArea>
                                <Title style={{ padding: 5 }}>Fabricante</Title>
                                <Title size="14px" color="#000" style={{ fontFamily: "Roboto Regular", margin: 5 }}>{carregou ? produto.produtoEscolhido.fabricante : '...'}</Title>
                            </InfoArea>
                        </View>

                        <DescricaoArea style={{ height: heightAnim }} >
                            <HeaderArea>
                                <Title>Mais detalhes</Title>
                                <ExpandButtom onPress={animarBox} activeOpacity={0.9}>
                                    {!isOpen ?
                                        <Icon name="chevron-down" size={25} color="#888" /> :
                                        <Icon name="chevron-up" size={25} color="#888" />
                                    }
                                </ExpandButtom>
                            </HeaderArea>
                            <Title size="16px" color="#000" style={{ fontFamily: "Roboto Regular", margin: 5, marginTop: 5, marginBottom: 5, color:"#000" }}>{carregou ? produto.produtoEscolhido.descricao : '...'}</Title>
                            {msgRdc.map((item, key) => {
                                return (
                                    <Title key={item.id} style={{ padding: 5, fontFamily: 'Roboto Regular', color:"#7a0000" }}> - {item.mensagem}</Title>
                                )
                            })}


                        </DescricaoArea>

                        <ContentArea height="235px" >
                            <TitleProduct>Você pode se interressar também por: </TitleProduct>
                            <ItemList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={similarList}
                                renderItem={({ item }) => <ItemSimilar imgWidth="70px" imgHeight="70px" navigation={props.navigation} data={item} changeItem={changeItem} />}
                                keyExtractor={(item) => item.id.toString()}
                                decelerationRate="fast"
                                maxToRenderPerBatch={20}
                                snapToInterval={130}
                            />
                        </ContentArea>



                    </ProdutoScroll>

                    <ActionArea cor={corPrincipal}>
                        <SubtotalArea>
                            <Price size="18px">Subtotal: </Price>
                            <Price size="28px">R$ {parseFloat(props.total).toFixed(2).replace(".", ",")}</Price>
                        </SubtotalArea>

                        <AddDelCartButtom goCart={goCart} product={produto.produtoEscolhido} qtd={qtdProduto} setQtdProduto={setQtdProduto} setErrorMsg={setErrorMsg} />

                    </ActionArea>
                </>
            }

        </Container>


    )
}

Produto.navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const goCart = () => {
        navigation.navigate('Cart')
    }

    return {
        headerTintColor: '#fff',
        headerTitle: () => <Search setSearch={params.setSearch} navigation={navigation} />,
        headerRight: () => <Cart goCart={goCart} />
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.carrinho,
        total: state.cartReducer.total
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Produto);