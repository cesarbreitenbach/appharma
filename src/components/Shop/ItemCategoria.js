import React from 'react'
import styled from 'styled-components/native'
import Item from '../../components/Items'

const Conteiner = styled.TouchableOpacity`
   flex:1;
    border:1px solid #eee
    background-color: #ddd;
    width: 150px ;
    height: 125px ;
    border-radius:10px;
    justify-content:center;
    align-items:center;
    margin-left: 5px;
    margin-right:5px;
    margin-top:10px;
`;

const Titulo = styled.Text`
    font-family: Roboto Black;
    text-align: center;


`

const ItemCategoria = ({data, navigation}) => {

    const handleClick = () => {
        let id = data.id;
        console.log("vou manar o id: "+id)
        navigation.navigate('SubCategories', {id_categoria:id, nomeCat:data.descricao})
        
    }


   return (
         <Conteiner activeOpacity={0.7}  onPress={() => handleClick()}>
               <Item  width="50px" height="50px" source={{uri:data.image.url}}  />
               <Titulo>{data.descricao}</Titulo>
         </Conteiner>
   )
}



export default  ItemCategoria