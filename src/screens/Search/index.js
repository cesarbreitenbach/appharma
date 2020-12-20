import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native'
import {Container, ItensOnSearch, IndicatorArea} from './styled'
import SearchBar from '../../components/Search/SearchBar'
import Cart from '../../components/Cart'
import api from '../../helpers/api'
import { connect } from 'react-redux'
import Product from '../../components/Cart/Product'
import { format } from 'date-fns'

const Search = (props) => {

   function getDate(){
      const date = new Date()
      const diaAno = format(date, 'yyyy-MM-dd');
      const hora = format(date, 'HH:mm:ss');
      const parsedDate = `${diaAno}T${hora}-03`
      return parsedDate
   }

   const [nomeProduto, setNomeProduto] = useState(props.navigation.getParam('busca'));
   const [qtdProduto, setQtdProduto] = useState(0)
   const [nrPages, setNrPages] = useState(1)
   const [listaProdutos, setListaProdutos] = useState([])
   const [carregou, setCarregou] = useState(false)

   useEffect(()=>{
      
      const getSearch = async () =>{
         setCarregou(false)
         const data = getDate()
         const res = await api.get(`/produtos/search?name=${nomeProduto}&data=${data}`)
         const {produtos, paginas} = res.data;
         
         produtos.map((item, index)=>{
            const ind = props.cart.findIndex((i) => i.id == item.id)
            if (ind >= 0) {
               item.qtd = props.cart[ind].qtd;
            }
         })

         setNrPages(paginas)
         setListaProdutos(produtos)
         setCarregou(true)
      }
      getSearch()
      props.navigation.setParams({setNomeProduto})

   }, [nomeProduto])
 

  return (
      <Container>
         {carregou &&
          <ItensOnSearch
               showsVerticalScrollIndicator={false}
               data={listaProdutos}
               renderItem={({ item, index }) => <Product data={item} navigation={props.navigation} setQtdProduto={setQtdProduto} qtd={qtdProduto}/>}
               decelerationRate="fast"
               maxToRenderPerBatch={20}
               snapToInterval={130}
               keyExtractor={(item, index) => `${item.nome}-${index}`}
            />
         }
         {!carregou &&
            <IndicatorArea>
               <ActivityIndicator size="large" color="#999" />
            </IndicatorArea>
         }
      </Container>
  );
}

Search.navigationOptions = ( {navigation} ) =>{
   const { params = {} } = navigation.state
   const goCart = () => {
      navigation.navigate('Cart')
   }
   return{
     headerRight: () => <Cart goCart={goCart} />,
     headerTitle: () => <SearchBar setNomeBusca={params.setNomeProduto} />,
     headerTintColor: '#fff'
   }
}

const mapStateToProps = (state) => {
   return {
      cart: state.cartReducer.carrinho,
      status: state.authReducer.status,
      total: state.cartReducer.total
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      addCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: { carrinho: product } }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);