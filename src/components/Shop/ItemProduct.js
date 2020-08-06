import React from 'react'
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import {ActivityIndicator} from 'react-native'
import Item from '../../components/Items'

const Conteiner = styled.TouchableOpacity`
   flex:1;
    background-color: #f2f2f2
    border:1px solid #ddd
    width: 125px ;
    height: 200px ;
    margin:5px;
    padding-left:5px;
    padding-right:5px;
    border-radius:10px;
    justify-content:center;
    align-items:center;
`;

const Title = styled.Text`
   color:#000;
   text-align:center;
   font-size:12px;
   font-family:Ubuntu Bold Italic
   margin-bottom:3px;
`
const Off = styled.Text`
   font-family:Ubuntu Bold
   color:#239636
   margin-bottom:3px;
`
const Preco = styled.Text`
font-family:Ubuntu Light
font-size:10px;
text-decoration:line-through;
`
const PrecoPromo = styled.Text`
font-family:Ubuntu Regular
margin-bottom:3px;
` 

const ItemProduct = props => {
   return (
         <Conteiner activeOpacity={0.7}>
               <Item style={{marginTop:5}} radius="50px" resizeMode='cover' width="100px" height="100px" source={{uri:"https://ioffertas.club:3333/files/4054c25c0ae8d5e6ea7e4b31823efc46.png"}}  />
               <Title>Shampo Beirute fucking</Title>
               <Off>50% OFF</Off>
               <Preco>de R$ 10,00</Preco>
               <PrecoPromo>por R$ 5,00</PrecoPromo>
         </Conteiner>
   )
}

const mapStateToProps = (state) => {
   return {
      status: state.authReducer.status
   };
};

export default connect(mapStateToProps)(ItemProduct);