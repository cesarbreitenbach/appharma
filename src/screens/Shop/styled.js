import styled from 'styled-components/native';

export const Conteiner = styled.KeyboardAvoidingView`
   flex:1; 
   justify-content:center;
   align-items:center;
`;

export const ScrollArea = styled.ScrollView`
   width:100%;
   height:100%;
   background-color:#fff;
`;

export const ProdutosArea = styled.FlatList`
   width:100%;
   height:150px;
   background-color:#aaa;
   margin-bottom:10px;
   padding:5px;
   `

export const ContentArea = styled.View`
      flex:1;
      justify-content:center;
      height:${props => props.height || '125px'};
      width:100%;
      background-color:#fff;
      border-bottom-width:1px;
      border-bottom-color:#ddd;
      margin-top:10px;
   `
export const CategoriasArea = styled.View`
      width:100%;
      height: 100%;
      padding:5px;
      justify-content:center;
      align-items:center;
   `
export const Title = styled.Text`
   font-family:Ubuntu Medium;
   margin-left:5px;
   margin-right:5px;
   
`

export const ItemList = styled.FlatList`

`


