import React from 'react';
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
   margin-right:5px;
`

const InputSearch = styled.TextInput`
   padding:5px;
   width: 275px;
   
`;

const SearchArea = styled.View`
   width:300px;
   flex-direction:row;
   border:1px solid #999;
   border-radius:10px;
   align-items:center;
   justify-content:center;
   background-color:#fff
   height:35px;
`;



const SearchBar = (props) => {
   return (
      <Conteiner>
         <SearchArea>
            <InputSearch placeholder="O que você procura?" />
            <ButtonSearch activeOpacity={0.7}>
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