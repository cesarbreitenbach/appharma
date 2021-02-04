import React from 'react'
import { Conteiner, Text } from './styled'

const SubCategoria = ({ data, navigation }) => {

    const handleClick = (idsubcategoria) => {
        navigation.navigate('ProductList', { idsubcategoria, nomeSub:data.descricao })
    }

    return (
        <Conteiner onPress={() => handleClick(data.id)} activeOpacity={0.7}>
            <Text>{data.descricao}</Text>
        </Conteiner>
    )
}

export default SubCategoria;