import React, { useState, useEffect } from 'react';
import { Conteiner, ScrollArea, ContentArea, Title, ItemList } from './styled'
import ItemCategoria from '../../components/Shop/ItemCategoria'
import ItemDestaque from '../../components/Shop/ItemDestaque'
import ItemProduct from '../../components/Shop/ItemProduct'
import SearchBar from '../../components/SearchBar'
import Cart from '../../components/Cart'
import useApi from '../../helpers/apiAppharma'

const Page = (props) => {

    const [categorias, setCategorias] = useState([]);
    const [topSellers, setTopSellers] = useState([]);
    const [destaques, setDestaques] = useState([]);

    const appharma = useApi();

    useEffect(() => {

        const carregaDestaque = async () => {
            const respDestaques = await appharma.getDestaques();
            setDestaques(respDestaques)
        }
        carregaDestaque()
    }, [])

    useEffect(() => {
        const carregaMaisVendidos = async () => {
            const respMaisVendidos = await appharma.getMaisVendidos();
            setTopSellers(respMaisVendidos)
        }
        carregaMaisVendidos()
    }, [])

    useEffect(() => {
        const carregaCategorias = async () =>{
            const restCategorias = await appharma.getCategorias();
            setCategorias(restCategorias)
        }
        carregaCategorias()
    }, [])

    return (
        <Conteiner>
            <ScrollArea showsVerticalScrollIndicator={false}>
                <ContentArea height="300px"  >
                    <Title>Destaques </Title>
                    <ItemList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={destaques}
                        renderItem={({ item }) => <ItemDestaque navigation={props.navigation} data={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        decelerationRate="fast"
                        maxToRenderPerBatch={10}
                        snapToInterval={130}
                    />
                </ContentArea>
                <ContentArea height="145px" >
                    <Title>Busca por Categorias </Title>
                    <ItemList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={categorias}
                        renderItem={({ item }) => <ItemCategoria navigation={props.navigation} data={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        decelerationRate="fast"
                        snapToInterval={130}
                    />
                </ContentArea>
                <ContentArea height="285px" >
                    <Title>Mais Vendidos </Title>
                    <ItemList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={topSellers}
                        renderItem={({ item }) => <ItemProduct navigation={props.navigation} data={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        decelerationRate="fast"
                        maxToRenderPerBatch={20}
                        snapToInterval={130}
                    />
                </ContentArea>



            </ScrollArea>
        </Conteiner>
    );
}

Page.navigationOptions = ({ navigation }) => {
    const goCart = () => {
        navigation.navigate('Cart')
    }
    return {
        headerTintColor: '#fff',
        headerTitle: () => <SearchBar navigation={navigation} />,
        headerRight: () => <Cart goCart={goCart} />
    }
}

export default Page;