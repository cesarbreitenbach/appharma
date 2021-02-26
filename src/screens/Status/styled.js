import styled from 'styled-components/native';

export const Conteiner = styled.KeyboardAvoidingView`
   flex:1; 
   justify-content:center;
   align-items:center;
`;

export  const DescText = styled.Text`
   width:100%;
   text-align:center;
   font-family:${props => props.family || 'Roboto Regular'}
   font-size:${props => props.size || '12px'};
   color:${props => props.color || '#333'}; 
   height:50px;
   margin-top:20px;
   border-bottom-width: 1px;
   border-color: #999;
`;

export const BarraProgresso = styled.View`
    width: 70%;
    height: 2px;
    border-width: 1px;
    border-color: #999;
`
export const Text = styled.Text`
    margin-top:20px;
    margin-bottom:10px;
    font-size:19px;
    color: #fff
    text-align:center;
    font-family:Roboto Black;
    
`

export const Lista = styled.FlatList`
   background-color:#fff

`