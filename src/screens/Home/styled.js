import styled from 'styled-components/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Conteiner = styled.SafeAreaView`
   flex:1; 
   justify-content:center;
   align-items:center;
`;

export const ConteinerArea = styled.View`
    margin:${hp('0.4%')}px;
    margin-top:0px;
   
`
export const ScrollArea = styled.ScrollView`
  
`;
