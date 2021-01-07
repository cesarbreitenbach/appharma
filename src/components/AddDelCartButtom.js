import React, { useState } from 'react';
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect, useSelector } from 'react-redux'
import useApi from '../helpers/apiAppharma'
import LoadingModal from '../components/LoadingModal'


export const AreaButtom = styled.View`
padding:25px;
width:200px;
flex-direction:row
justify-content:space-between;
align-items:center;
`

export const AddToCart = styled.TouchableOpacity`
   background-color:#ddd
   border-radius:10px;
   width:50px;
   height:50px;
   justify-content:center;
   align-items:center;
`

export const IconArea = styled.TouchableOpacity`
   padding:2px;
   justify-content:center;
   align-items:center;
`

export const Title = styled.Text`
   color:#000;
   text-align:center;
   font-size:14px;
   font-family:Ubuntu Bold Italic
   margin-bottom:3px;
`

const AddDelCartButtom = (props) => {

    const [qtdAtual, setQtdAtual] = useState(props.qtd)
    const [idProduto, setIdProduto] = useState(props.product.id)
    const [qtdEstoque, setQtdEstoque] = useState(props.product.qtd_estoque)
    const api = useApi();
    const corPrincipal = useSelector(state => state.shopReducer.cor_primaria)
    const [loading, setLoading] = useState(false)
    const [acao, setAcao] = useState('')



    const addProduct = async (product) => {

        console.log("Cliquei em adicionar")
        let novaQtd = qtdAtual;
        novaQtd++;

        setLoading(true)
        setAcao('Adicionando ao carrinho')
        const reserva = await api.getReservas(idProduto)
        setLoading(false)
        setAcao('')

        let disponivel = qtdEstoque - reserva;



        if (novaQtd > disponivel) {
            props.setErrorMsg("Não existe saldo suficiente!");
            return
        }
        props.setQtdProduto(novaQtd)
        props.addCart(product)
        setQtdAtual(novaQtd)
        console.log(JSON.stringify(product))
    }

    function delProduct(product) {
        if (qtdAtual == 0) { return }
        let novaQtd = qtdAtual > 0 ? qtdAtual - 1 : 0;

        props.setQtdProduto(novaQtd)
        props.delCart(product)
        setQtdAtual(novaQtd)
        console.log(JSON.stringify(props.cart))
    }



    return (
        <AreaButtom>
            <LoadingModal visible={loading} visibleAction={setLoading} descAcao={acao} />
            <AddToCart activeOpacity={0.7} onPress={() => delProduct(props.product)}>
                <Icon name="minus" size={25} color={corPrincipal} />
            </AddToCart>
            <IconArea activeOpacity={0.7} onPress={props.goCart}>
                <Icon name="cart-arrow-down" size={25} style={{ marginBottom: 3 }} color='#999' />
                <Title size="13px" color="#000"> {qtdAtual} </Title>
            </IconArea>
            <AddToCart activeOpacity={0.7} onPress={() => addProduct(props.product)}>
                <Icon name="plus-thick" size={25} color={corPrincipal} />
            </AddToCart>
        </AreaButtom>
    );

}

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.carrinho
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCart: (carrinho) => dispatch({ type: 'ADD_TO_CART', payload: { carrinho } }),
        delCart: (carrinho) => dispatch({ type: 'DEL_FROM_CART', payload: { carrinho } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDelCartButtom);
