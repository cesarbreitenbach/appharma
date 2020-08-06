import React from 'react'
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import {ActivityIndicator} from 'react-native'
import Item from '../../components/Items'

const Conteiner = styled.View`
   flex:1;
    background-color: #fff
    border:1px solid #ddd
    width: 80px ;
    height: 80px ;
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
`

const ItemProduct = props => {
   return (
         <Conteiner>
               <Item style={{marginTop:5}} radius="60px" resizeMode='cover' width="40px" height="40px" source={{uri:props.data.image.url}}  />
               <Title>{props.data.descricao}</Title>
         </Conteiner>
   )
}

const mapStateToProps = (state) => {
   return {
      status: state.authReducer.status
   };
};

export default connect(mapStateToProps)(ItemProduct);