import styled from 'styled-components/native'

export const Conteiner = styled.TouchableOpacity`
    width:125px;
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
   font-size:10px;
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
export const TagArea = styled.View`
   height:60px;
   width:60px;
   margin-left: -60px;
   justify-content:center;
   align-items:center;
   margin-top:0px
`

export const TagText = styled.Text`
   color:${props => props.color || '#000'};
   font-size:${props => props.size ||'14px'};
   font-family:Ubuntu Bold Italic;
   transform: rotate(325deg);
   z-index:10;
   margin-top:-35px
   margin-left:-7px;
`
