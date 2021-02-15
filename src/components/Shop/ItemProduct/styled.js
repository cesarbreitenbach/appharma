import styled from 'styled-components/native'

export const Conteiner = styled.TouchableOpacity`
    width:170px;
    height:235px
    background-color: #fff
    border:1px solid #ddd
    margin:5px;
    padding-left:3px;
    padding-right:3px;
    border-radius:10px;
    justify-content:center;
    align-items:center;
`;

export const Title = styled.Text`
   color:#000;
   text-align:center;
   font-size:12px;
   font-family:Roboto Bold;
   margin-bottom:3px;
`
export const Off = styled.Text`
   font-family:Roboto Bold
   color:#239636
   font-size:16px;
   margin-bottom:3px;
`
export const Preco = styled.Text`
font-family:Roboto Medium;
font-size:14px;
color:#ff0000;
text-decoration:line-through;
`
export const PrecoPromo = styled.Text`
font-family:Roboto Medium;
font-size:20px;
margin-bottom:3px;
` 