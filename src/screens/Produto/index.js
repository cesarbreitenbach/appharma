import React, { useEffect, useState, useRef } from 'react';
import { Container, Title, ProdutoArea, ProdutoImg, ProdutoScroll, ActionArea, Price, PriceInfo, 
             OriginalPriceArea, AreaButtom, AddToCart, Off, IconArea, DescricaoArea, HeaderArea, ExpandButtom,
            ContentArea, TitleProduct,ItemList } from './styled.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import p from '../../config/padroes'
import api from '../../helpers/api'
import { Animated } from 'react-native'

import ItemSimilar from '../../components/Shop/ItemSimilar'

const Produto = (props) => {

   // const heightAnim = useRef(new Animated.Value(40)).current;

   const [heightAnim] = useState(new Animated.Value(40))
   const [isOpen, setIsOpen] = useState(false)
   const [similarList, setSimilarList] = useState([])

   const [produto, setProduto] = useState({})

   const [error, setError] = useState(false)
   const [errorMsg, setErrorMsg] = useState('')
   let idProduto = props.navigation.getParam('id')

   useEffect(()=>{
      
      api.get(`/produtos/similars?tipo=${produto.tipo}`)
      .then(r=>{
         console.log(`Produtos similares tipo ${produto.tipo}`)
         setSimilarList(r.data)
      }).catch(e =>{
         console.log(e=>console.log("Erro: "+e.message))
      })

   }, [produto.tipo])

   const animarBox = () => {

      if (!isOpen) {
         Animated.timing(heightAnim, {
            toValue: 200,
            duration: 200,
            useNativeDriver: false
         }).start()
      } else {
         Animated.timing(heightAnim, {
            toValue: 40,
            duration: 200,
            useNativeDriver: false
         }).start()
      }
      setIsOpen(!isOpen)
   }

   useEffect(() => {
      setError(false)
      api.get(`/produtos/consulta?id=${idProduto}`).then(r => {
         setProduto(r.data[0])
      }).catch(e => {
         console.log(e)
         setError(true)
         setErrorMsg(e.message)
      })
   }, [])

   let desconto = Number.parseFloat(produto.discount);

   return (
      <Container>
         <ProdutoScroll>
            <ProdutoArea>
               <ProdutoImg resizeMode='cover' source={{ uri: p.URL_FILES + produto.image }} />
               <Title color="#000">{produto.nome}</Title>
            </ProdutoArea>

            <DescricaoArea style={{ height: heightAnim }} >
               <HeaderArea>
                  <Title>Mais detalhes</Title>
                  <ExpandButtom onPress={animarBox} activeOpacity={0.9}>
                     {  !isOpen ?
                        <Icon name="chevron-down" size={25} color="#888" /> :
                        <Icon name="chevron-up" size={25} color="#888" />
                     }
                  </ExpandButtom>
               </HeaderArea>
               <Title size="16px" color="#000" style={{ fontFamily: "Ubuntu Regular", margin: 5 , marginTop:10, marginBottom:15}}>{produto.descricao}</Title>
               <Title>Principio ativo</Title>
               <Title size="16px" color="#000" style={{ fontFamily: "Ubuntu Regular", margin: 5 }}>{produto.principio}</Title>
               
            </DescricaoArea>

            <ContentArea height="235px" >
               <TitleProduct>Você pode se interressar também por: </TitleProduct>
               <ItemList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={similarList}
                  renderItem={({ item }) => <ItemSimilar imgWidth="70px" imgHeight="70px" navigation={props.navigation} data={item} />}
                  keyExtractor={(item) => item.id.toString()}
                  decelerationRate="fast"
                  maxToRenderPerBatch={20}
                  snapToInterval={130}
               />
            </ContentArea>

            

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
               <AddToCart activeOpacity={0.7} >
                  <Icon name="minus" size={25} color={p.corPrincipal} />
               </AddToCart>
               <IconArea>
                  <Icon name="cart-arrow-down" size={25} color={p.corPrincipal} />
                  <Title size="12px" color="#000"> 1 </Title>
               </IconArea>
               <AddToCart activeOpacity={0.7} >
                  <Icon name="plus-thick" size={25} color={p.corPrincipal} />
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