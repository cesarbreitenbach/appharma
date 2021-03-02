import styled from 'styled-components/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Conteiner = styled.KeyboardAvoidingView`
   flex:1; 
   justify-content:center;
   align-items:center;
`;

export const Text = styled.Text`
    font-size:${props => props.size || '19px'};
    color: ${props => props.color || '#fff'};
    text-align:center;
    font-family: ${props => props.family || 'Roboto Black'};
    
`

export const Name = styled.TextInput`
   width:${wp('70%')}px;
   height:${hp('6%')}px;
   border:1px solid #999;
   border-radius:10px;
   padding:${hp('1%')}px;
   margin-top: ${hp('1%')}px;
`;

export const Email = styled.TextInput`
width:${wp('70%')}px;
height:${hp('6%')}px;
   border:1px solid #999;
   margin-top: ${hp('1%')}px;
   border-radius:10px;
   padding:${hp('1%')}px;
`;

export const Cpf = styled.Text`
    width:${wp('70%')}px;
    height:${hp('6%')}px;
    border:1px solid #999;
    margin-top: ${hp('1%')}px;
    border-radius:10px;
    padding:${hp('1.5%')}px;
    text-align:center;
`;

export const Buttom = styled.TouchableOpacity`
   width:${wp('35%')}px;
   height:${hp('6%')}px;
   flex-direction:row;
   background-color:#3f9168
   border-radius:10px;
   justify-content:center;
   align-items:center;
   padding:${hp('1.5%')}px;
   margin-top:${hp('2%')}px;
`