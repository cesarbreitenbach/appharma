import React from 'react'
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import p from '../../config/padroes'
import {ActivityIndicator} from 'react-native'
import Item from '../../components/Items'

const Conteiner = styled.TouchableOpacity`
    flex:1;
    border:1px solid #ddd
    width: ${ props=> props.width ||  '165px'}  ;
    height: ${ props=> props.height ||  '270px'} ;
    margin:5px;
    padding-left:5px;
    padding-right:5px;
    border-radius:10px;

`;

const ImageItem = styled.Image`
   height: ${ props=> props.imgheight || '180px'}; 
   border-radius:10px
`

const DestaqueArea = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
`
const NomeDestaque = styled.Text`
font-size:12px;
font-family:Roboto Black;
text-align:center;

`
const PrecoOriginal = styled.Text`
text-decoration: ${props=>props.decoration || 'none'}
color:#ff0000
`
const PrecoPromo = styled.Text`

`


const ItemDestaque = props => {
    

    const handleClick = () =>{
        let id = props.data.id;
        props.navigation.navigate('Produto', {id})
    }

   return (
         <Conteiner activeOpacity={0.8} onPress={() => handleClick()}>
               <ImageItem source={{uri: p.URL_FILES+"/"+props.data.path}} />
               <DestaqueArea>
                   <NomeDestaque>{props.data.nome}</NomeDestaque>
                   <PrecoOriginal decoration="line-through">de R$ {props.data.preco_original}</PrecoOriginal>
                   <PrecoPromo>por R$ {props.data.preco_vigente}</PrecoPromo>
               </DestaqueArea>

         </Conteiner>
   )
}

const mapStateToProps = (state) => {
   return {
      status: state.authReducer.status
   };
};

export default connect(mapStateToProps)(ItemDestaque);