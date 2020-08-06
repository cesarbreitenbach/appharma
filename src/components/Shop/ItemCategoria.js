import React from 'react'
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import {ActivityIndicator} from 'react-native'
import Item from '../../components/Items'

const Conteiner = styled.TouchableOpacity`
   flex:1;
    background-color: #eee
    border:1px solid #ddd
    width: 70px ;
    height: 70px ;
    margin:5px;
    padding-left:5px;
    padding-right:5px;
    border-radius:10px;
    justify-content:center;
    align-items:center;
`;

const Title = styled.Text`
   color:#000;
   font-size:10px;
   text-align:center;
   font-family:Ubuntu Light Italic;
`

const ItemCategoria = props => {
   return (
         <Conteiner activeOpacity={0.7}>
               <Item style={{marginTop:5}} radius="15px" resizeMode='cover' width="30px" height="30px" source={{uri:props.data.image.url}}  />
               <Title>{props.data.descricao}</Title>
         </Conteiner>
   )
}

const mapStateToProps = (state) => {
   return {
      status: state.authReducer.status
   };
};

export default connect(mapStateToProps)(ItemCategoria);