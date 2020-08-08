import React, { useEffect, useState } from 'react';
import { Container, Title, ProdutoArea, ProdutoImg, ProdutoScroll, ActionArea, Price, PriceInfo, OriginalPriceArea, AreaButtom, AddToCart, Off , IconArea} from './styled.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import p from '../../config/padroes'
import api from '../../helpers/api'

const Produto = (props) => {

   const [produto, setProduto] = useState({})
   const [error, setError] = useState(false)
   const [errorMsg, setErrorMsg] = useState('')
   let idProduto = props.navigation.getParam('id')
  
   useEffect(() => {
      setError(false)
      console.log(`vou executar: /produtos/consulta?id=${idProduto}`)
      api.get(`/produtos/consulta?id=${idProduto}`).then(r => {
         console.log(r.data)
         setProduto(r.data[0])
         console.log(produto)
      }).catch(e => {
         console.log(e)
         setError(true)
         setErrorMsg(e.message)
      })
   }, [])

   let desconto =  Number.parseFloat(produto.discount);

   return (
      <Container>
         <ProdutoScroll>
            <ProdutoArea>
               <ProdutoImg resizeMode='cover' source={{ uri: p.URL_FILES + produto.image }} />
               <Title color="#000">{produto.nome}</Title>
            </ProdutoArea>
         </ProdutoScroll>

         <ActionArea>

            <PriceInfo>
               <OriginalPriceArea>
                  <Price size="10px" decoration="line-through" color="#ff0000">de R$ {produto.preco_original} </Price>
                  <Off>
                     <Price color="#fff" size="12px"  >{desconto.toFixed(0)} %</Price>
                  </Off>
               </OriginalPriceArea>
               <Price size="18px">por R$ {produto.preco_vigente}</Price>
            </PriceInfo>

            <AreaButtom>
               <AddToCart  >
                  <Title size="19px">-</Title>
               </AddToCart>
               <IconArea>
                  <Icon name="cart-arrow-down" size={25} color={p.corPrincipal} style={{ marginRight: 5 }} />
                  <Title size="12px" color="#000"> 1 </Title>
               </IconArea>
               <AddToCart >
                  <Title size="19px">+</Title>
               </AddToCart>
            </AreaButtom>



         </ActionArea>

      </Container>


   )
}

Produto.navigationOptions = {
   headerShown: false,
}

export default Produto;