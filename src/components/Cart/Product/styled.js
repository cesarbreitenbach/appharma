import styled from 'styled-components/native'

export const Conteiner = styled.TouchableOpacity`
    height:200px
    background-color: #fff
    border:1px solid #ddd
    align-items:center;
    margin-top:3px;
    margin-left:3px;
    margin-right:3px;
    flex-direction:row;
`;

export const Title = styled.Text`
   color:${props => props.color || '#000'};
   font-size:${props => props.size ||'12px'};
   font-family:Roboto Bold;
`
export const Preco = styled.Text`
font-family:Roboto Black;
font-size:24px;
`

export const PrecoArea = styled.View`
   padding:5px
   width:230px

`

export const TagArea = styled.View`
   height:60px;
   width:60px;
   margin-left:-70px;
   justify-content:center;
   align-items:center;
   margin-top:-80px
`

export const TagOff = styled.ImageBackground`
   width:60px;
   height:60px;
   justify-content:center;
   align-items:center;
`
export const TagText = styled.Text`
   color:${props => props.color || '#000'};
   font-size:${props => props.size ||'14px'};
   font-family:Ubuntu Bold Italic;
   transform: rotate(325deg);
   z-index:10;
   margin-top:-27px
   margin-left:-7px;
`
