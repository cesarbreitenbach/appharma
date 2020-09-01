import styled from 'styled-components/native'

export const Conteiner = styled.TouchableOpacity`
    width:100px;
    height:180px
    background-color: #f2f2f2
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
   font-size:8px;
   font-family:Ubuntu Bold Italic
   margin-bottom:3px;
`
export const Off = styled.Text`
   font-family:Ubuntu Bold
   color:#239636
   font-size:10px;
   margin-bottom:3px;
`
export const Preco = styled.Text`
font-family:Ubuntu Light
font-size:9px;
text-decoration:line-through;
`
export const PrecoPromo = styled.Text`
font-family:Ubuntu Regular
margin-bottom:3px;
` 