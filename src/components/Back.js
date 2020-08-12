import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import d from '../config/padroes'


const Conteiner = styled.View`
    background-color:#fff;
    height:50px;
    padding-top:25px;
`;
const Buttom = styled.TouchableOpacity`
   margin-left:5px;
`


const Back = props => {
   return (
      <Conteiner>
         <Buttom onPress={()=>props.navigation.goBack()}>
            <Icon name="arrow-back" size={25} color={props.color || d.corPrincipal} />
         </Buttom>
      </Conteiner>
   )
}

export default Back;