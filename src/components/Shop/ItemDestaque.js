import React from 'react'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { URL_FILES } from '@env'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Conteiner = styled.TouchableOpacity`
    flex:1;
    border:1px solid #ddd
    width: ${wp('45%')}px;
    margin:${hp('0.7%')}px;;
    border-radius:10px;

`;

const ImageItem = styled.Image`
   height: ${hp('35%')}px;
`

const DestaqueArea = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
`
const NomeDestaque = styled.Text`
font-size:${hp('1.5%')}px;
font-family:Roboto Medium;
text-align:center;

`
const PrecoOriginal = styled.Text`
text-decoration: ${props => props.decoration || 'none'}
color:#ff0000;
font-size:${hp('3%')}px;
`
const PrecoPromo = styled.Text`
    font-size:${hp('4%')}px;
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