import styled from 'styled-components/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Conteiner = styled.KeyboardAvoidingView`
   flex:1; 
   justify-content:center;
   align-items:center;
   margin-left:30px;
   margin-right:30px;
`;

export const Text = styled.Text`
    margin-top:20px;
    margin-bottom:10px;
    font-size:19px;
    color: #fff
    text-align:center;
    font-family:Roboto Black;
    
`