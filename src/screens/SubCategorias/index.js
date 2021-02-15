import React, { useState, useEffect } from 'react';
import { Conteiner, CatGrid, Text} from './styled'
import SubCategoria from '../../components/SubCategorias'
import useApi from '../../helpers/apiAppharma'
import Cart from '../../components/Cart'


const Page = ({navigation}) => {

    
    const [lista, setLista] = useState({})
    const [categoria, setCategoria] = useState('')
    const api = useApi()

    useEffect(() => {

        let unmonted = false;

        if (!unmonted){
            carregaSub()
        }

        return () => unmonted = true;


    }, [])

    const carregaSub = async () => {
        let idCategoria = navigation.getParam('id_categoria')
        const resp = await api.getSubCategorias(idCategoria)
        setLista(resp)
    }

    return (
        <Conteiner>
            <CatGrid 
                data={lista}
                renderItem={({ item }) => <SubCategoria navigation={navigation} data={item} />}
                keyExtractor={(item) => item.id.toString()}
            /> 
        </Conteiner>
    );
}


Page.navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    console.log('oi sou o navigation')
    const goCart = () => {
        navigation.navigate('Cart')
    }
    return {
        headerRight: () => <Cart goCart={goCart} />,
        headerTitle: () => <Text> {params.nomeCat} </Text>,
        headerTintColor: '#fff',
    }
}

 

export default Page;