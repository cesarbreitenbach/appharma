import styled from 'styled-components/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Conteiner = styled.View`
   flex:1; 
   justify-content:center;
   align-items:center;
`;

export const Text = styled.Text`
    margin-top:20px;
    margin-bottom:10px;
    font-size:${props => props.size || '19px'};
    color: ${props => props.color || '#fff'};
    text-align:center;
    font-family: ${props => props.family || 'Roboto Black'};
    
`

export const ScrollArea = styled.FlatList`
  
`;

export const Footer = styled.TouchableOpacity`
    width:${wp('80%')}px;
    height:${hp('9%')}px;
    border-top-width:1px;
    border-color:#999;

`

export const Avatar = styled.Image`
   width:${wp('20%')}px;
   height:${hp('10%')}px;
   margin-top:${hp('10%')}px;
   margin-bottom:${hp('5%')}px;
`

export const ItemMenu = styled.TouchableOpacity`

`