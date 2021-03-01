import styled from 'styled-components/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Conteiner = styled.KeyboardAvoidingView`
   flex:1; 
   justify-content:center;
   align-items:center;
`;

export const ScrollArea = styled.ScrollView`
   background-color:#eee;
`;


export const ContentArea = styled.View`
      height:${props => props.height || '150px'};
      width:${wp('98%')}px;
      background-color:#fff;
      border-bottom-width:1px;
      border-bottom-color:#999;
      padding:${hp('1%')}px;

   `

export const Title = styled.Text`
   font-family:Ubuntu Medium;
   margin-left:5px;
   margin-right:5px;
   
`

export const ItemList = styled.FlatList`

`


