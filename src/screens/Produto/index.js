import React, { useEffect, useState } from 'react';
import {
    Container, Title, ProdutoArea, ProdutoImg, ProdutoScroll, ActionArea, Price, PriceInfo, 
    OriginalPriceArea, Off, DescricaoArea, HeaderArea, ExpandButtom,
    ContentArea, TitleProduct, ItemList, ActivityArea, FuckItem, SubtotalArea
} from './styled.js';
import { ActivityIndicator } from 'react-native'
import Search from '../../components/SearchBar'
import Cart from '../../components/Cart'
import AddDelCartButtom from '../../components/AddDelCartButtom'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import p from '../../config/padroes'
import api from '../../helpers/api'
import { Animated } from 'react-native'
import ItemSimilar from '../../components/Shop/ItemSimilar'
import { connect } from 'react-redux'
import { ErrorArea, Text } from '../../components/ErrorArea'

const Produto = (props) => {

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

    const [tipoProduto, setTipoProduto] = useState(props.navigation.getParam('tipo'))


    const animarBox = () => {

        if (!isOpen) {
            Animated.timing(heightAnim, {
                toValue: 200,
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

        api.get(`/produtos/consulta?id=${changeProduct}`).then(r => {
            console.log("id produto: " + r.data[0].id)
            setTipoProduto(r.data[0].tipo)
            console.log("Tipo: " + tipoProduto)
            let produtoEscolhido = r.data[0];

            const lista = props.cart;
            const index = lista.findIndex(p => p.id == produtoEscolhido.id)

            if (index >= 0) {

                let novoProduto = {
                    produtoEscolhido,
                    qtd: lista[index].qtd
                }
                setDesconto(Number.parseFloat(novoProduto.produtoEscolhido.discount));
                setProduto(novoProduto)
                setQtdProduto(novoProduto.qtd)
                setCarregou(true)
            } else {
                let novoProduto = {
                    produtoEscolhido,
                    qtd: 0
                }
                setDesconto(Number.parseFloat(novoProduto.produtoEscolhido.discount));
                console.log("Esse é o novo produto")
                console.log(JSON.stringify(novoProduto))
                console.log("esse é o tipo: " + novoProduto.produtoEscolhido.tipo)
                setProduto(novoProduto)
                setQtdProduto(novoProduto.qtd)
                setCarregou(true)
            }

        }).catch(e => {
            console.log(e)
            setError(true)
            setErrorMsg(e.message)
        })
    }, [changeProduct])

    useEffect(() => {
        if (!tipoProduto) { return }

        const carregaSimilar = async () => {
            const result = await api.get(`/produtos/similars?tipo=${tipoProduto}&id=${idProduto}`);
            setSimilarList(result.data)
        }
        carregaSimilar()
    }, [tipoProduto])

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
                                <ProdutoImg resizeMode='cover' source={{ uri: p.URL_FILES + produto.produtoEscolhido.image }} />
                                <Title color="#000">{carregou ? produto.produtoEscolhido.nome : 'aguarde...'}</Title>
                            </FuckItem>
                            <PriceInfo>
                                {(produto.produtoEscolhido.preco_original != produto.produtoEscolhido.preco_vigente) &&
                                    <OriginalPriceArea>
                                        <Price size="10px" decoration="line-through" color="#ff0000">de R$ {parseFloat(produto.produtoEscolhido.preco_original).toFixed(2).replace(".", ",")}  </Price>
                                        <Off>
                                            <Price color="#fff" size="9px"  >{desconto.toFixed(0)} %</Price>
                                        </Off>
                                    </OriginalPriceArea>
                                }
                                <Price size="14px">por R$ {parseFloat(produto.produtoEscolhido.preco_vigente).toFixed(2).replace(".", ",")}</Price>
                            </PriceInfo>
                        </ProdutoArea>

                        <Title style={{padding:5}}>Principio ativo</Title>
                        <Title size="16px" color="#000" style={{ fontFamily: "Ubuntu Regular", margin: 5 }}>{carregou ? produto.produtoEscolhido.principio : '...'}</Title>
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
                            <Title size="16px" color="#000" style={{ fontFamily: "Ubuntu Regular", margin: 5, marginTop: 10, marginBottom: 15 }}>{carregou ? produto.produtoEscolhido.descricao : '...'}</Title>


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

                    <ActionArea>
                        <SubtotalArea>
                            <Price size="14px">Subtotal: </Price>
                            <Price size="18px">R$ {parseFloat(props.total).toFixed(2).replace(".", ",")}</Price>
                        </SubtotalArea>

                        <AddDelCartButtom goCart={goCart} product={produto.produtoEscolhido} qtd={qtdProduto} setQtdProduto={setQtdProduto} setErrorMsg={setErrorMsg}/>

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