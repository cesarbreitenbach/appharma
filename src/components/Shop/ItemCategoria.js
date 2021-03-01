import React from 'react'
import styled from 'styled-components/native'
import Item from '../../components/Items'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Conteiner = styled.TouchableOpacity`
   flex:1;
    border:1px solid #eee
    background-color: rgba(173, 199, 183, 0.6);
    width: ${wp('35%')}px;
    height: ${hp('17%')}px;
    border-radius:10px;
    padding: ${hp('0.5%')}px;
    justify-content:center;
    align-items:center;
`;

const Titulo = styled.Text`
    font-family: Roboto Medium;
    text-align: center;
    font-size:${hp('2%')}px;

`

const ItemCategoria = ({data, navigation}) => {

    const handleClick = () => {
        let id = data.id;
        console.log("vou manar o id: "+id)
        navigation.navigate('SubCategories', {id_categoria:id, nomeCat:data.descricao})
        
    }


   return (
         <Conteiner activeOpacity={0.7}  onPress={() => handleClick()}>
               <Item  width="40px" height="40px" source={{uri:data.image.url}}  />
               <Titulo>{data.descricao}</Titulo>
         </Conteiner>
   )
}



export default  ItemCategoria