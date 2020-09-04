import React, { useState, useEffect } from 'react';
import { Keyboard } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

const Conteiner = styled.View`
   justify-content:center;
   align-items:center;
`
const ButtonSearch = styled.TouchableOpacity`
   width: 20px;
   height: 20px;
   margin-right:8px;
`

const InputSearch = styled.TextInput`
   padding:5px;
   width: 225px;
   
`;

const SearchArea = styled.View`
   width:250px;
   flex-direction:row;
   border:1px solid #999;
   border-radius:10px;
   align-items:center;
   justify-content:center;
   background-color:#fff
   height:35px;
`;


let timer;
const SearchBar = (props) => {
   const [busca, setBusca] = useState('')

   useEffect(()=>{
      if(busca){
         if (timer){
            clearTimeout(timer)
         }
        timer = setTimeout( ()=>{
            goSearch()
         }, 1700)
      }
   }, [busca])

   const goSearch = () => {
      let search = busca.toUpperCase();
      props.navigation.navigate('Search', { busca: search })
      Keyboard.dismiss()
   }

   return (
      <Conteiner>
         <SearchArea>
            <InputSearch placeholder="O que você procura?" onChangeText={(t) => setBusca(t)} onSubmitEditing={() => goSearch()} />
            <ButtonSearch activeOpacity={0.7} onPress={() => goSearch()}>
               <Icon name="search" size={20} style={{ marginLeft: 3, color: '#999' }} />
            </ButtonSearch>
         </SearchArea>
      </Conteiner>
   )
}

const mapStateToProps = (state) => {
   return {
      cart: state.cartReducer.carrinho,
      activePage: state.tabReducer.activePage,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {

   }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);