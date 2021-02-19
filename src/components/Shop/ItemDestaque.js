import React from 'react'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { URL_FILES } from '@env'

const Conteiner = styled.TouchableOpacity`
    flex:1;
    border:1px solid #ddd
    width: ${props => props.width || '190px'}  ;
    height: ${props => props.height || '310px'} ;
    margin:5px;
    padding-left:5px;
    padding-right:5px;
    border-radius:10px;

`;

const ImageItem = styled.Image`
   height: ${props => props.imgheight || '200px'}; 
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
text-decoration: ${props => props.decoration || 'none'}
color:#ff0000;
font-size:20px;
`
const PrecoPromo = styled.Text`
    font-size:26px;
`
const Area = styled.View`
`


const ItemDestaque = props => {


    const handleClick = () => {
        let id = props.data.id;
        props.navigation.navigate('Produto', { id })
    }

    return (
        <Conteiner activeOpacity={0.8} onPress={() => handleClick()}>
            <ImageItem source={{ uri: URL_FILES + "/" + props.data.path }} />
            <DestaqueArea>
                <NomeDestaque>{props.data.nome}</NomeDestaque>
                <Area style={{ flexDirection: 'row' }}>
                    <PrecoOriginal >de </PrecoOriginal>
                    <PrecoOriginal decoration="line-through">R$ {props.data.preco_original}</PrecoOriginal>
                </Area>
                <Area style={{ flexDirection: 'row' }}>
                    <PrecoPromo style={{fontFamily:"Roboto Regular"}}>por </PrecoPromo>
                    <PrecoPromo style={{color:"#000",fontFamily:"Roboto Bold"}}>R$ {props.data.preco_vigente}</PrecoPromo>
                </Area>
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