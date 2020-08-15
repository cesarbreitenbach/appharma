import React, {useState} from 'react';
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import p from '../config/padroes'
import { connect } from 'react-redux'

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

   function addProduct(product){
      let novaQtd = qtdAtual;
      novaQtd++;
      props.setQtdProduto(novaQtd)
      props.addCart(product)
      setQtdAtual(novaQtd)
      console.log(JSON.stringify(props.cart))
   }

   function delProduct(product){
      if (qtdAtual == 0) { return }
      let novaQtd = qtdAtual > 0? qtdAtual - 1 :  0;

      props.setQtdProduto(novaQtd)
      props.delCart(product)
      setQtdAtual(novaQtd)
      console.log(JSON.stringify(props.cart))
   }

   

   return (
      <AreaButtom>
         <AddToCart activeOpacity={0.7} onPress={() => delProduct(props.product)}>
            <Icon name="minus" size={25} color={p.corPrincipal} />
         </AddToCart>
         <IconArea activeOpacity={0.7} onPress={props.goCart}>
            <Icon name="cart-arrow-down" size={25} color={p.corPrincipal} />
            <Title size="13px" color="#000"> {qtdAtual} </Title>
         </IconArea>
         <AddToCart activeOpacity={0.7} onPress={() => addProduct(props.product) }>
            <Icon name="plus-thick" size={25} color={p.corPrincipal} />
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
      delCart: (carrinho) => dispatch({type: 'DEL_FROM_CART', payload: { carrinho }})
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDelCartButtom);
