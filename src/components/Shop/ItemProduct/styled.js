import styled from 'styled-components/native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Conteiner = styled.TouchableOpacity`
    width:${wp('29.7%')}px; 
    background-color: #fff
    border:1px solid #ddd
    margin:${hp('0.5%')}px;
    border-radius:10px;
    padding-top:${hp('3%')}px;
    justify-content:center;
    align-items:center;
`;

export const Title = styled.Text`
   color:#000;
   text-align:center;
   font-size:10px;
   font-family:Roboto Medium;
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
font-size:${hp('2.5%')}px;
color:#ff0000;
text-decoration:line-through;
`
export const PrecoPromo = styled.Text`
font-family:Roboto Bold;
font-size:${hp('3.0%')}px;
color:${props => props.color || '#185424'};
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
