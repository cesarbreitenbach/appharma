import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'



const Conteiner = styled.View`
   flex:1;
   width:100%;
   height:40px;
   flex-direction:row;
   padding:5px;
   justify-content:center;
`

const InputSearch = styled.TextInput`
   border:1px solid #ddd;
   width:90%;
   height:30px;
   padding:5px;
   margin-top:5px;
   background-color:#fff
   border-radius:10px;
`;

const ButtonSearch = styled.TouchableOpacity`
   width: 40px;
   height: 40px;
`

const Texto = styled.Text`
   font-size:${props => props.size || "14px"};
   color:${props => props.color || "#000"};
`



const SearchBar = props => {
   return (
      <Conteiner>
         <InputSearch />
            <ButtonSearch activeOpacity={0.7}> 
               <Icon name="search" size={35} style={{marginLeft:5, color:'#eee'}} />
            </ButtonSearch>
      </Conteiner>
   )
}
const mapStateToProps = (state) => {
   return {
      activePage: state.tabReducer.activePage,
      token: state.authReducer.token,
      cpf: state.userReducer.cpf,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setActivePage: (activePage) => dispatch({ type: 'SET_ACTIVE', payload: { activePage } }),
      setPromocoes: (promocoes) => dispatch({ type: 'SET_PROMOCOES', payload: { promocoes } })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
