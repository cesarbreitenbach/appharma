import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import d from '../config/padroes'


const Conteiner = styled.View`
    background-color:${d.corSecundaria};
    height:40px;
    margin-left:10px;
    margin-top:5px;
`;
const Buttom = styled.TouchableOpacity`

`


const Back = props => {
   return (
      <Conteiner>
         <Buttom onPress={()=>props.navigation.navigate('Shop')}>
            <Icon name="arrow-back" size={25} color="#fff" />
         </Buttom>
      </Conteiner>
   )
}

export default Back;