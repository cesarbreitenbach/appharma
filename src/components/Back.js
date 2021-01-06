import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {useSelector} from 'react-redux'


const Conteiner = styled.View`
    background-color:${props => props.cor || '#3f9168'};
    height:40px;
    margin-left:10px;
    margin-top:5px;
`;
const Buttom = styled.TouchableOpacity`

`


const Back = props => {
    const corSecundaria = useSelector(state => state.shopReducer.cor_secundaria)
   return (
      <Conteiner cor={corSecundaria}>
         <Buttom onPress={()=>props.navigation.navigate('Shop')}>
            <Icon name="arrow-back" size={25} color="#fff" />
         </Buttom>
      </Conteiner>
   )
}

export default Back;