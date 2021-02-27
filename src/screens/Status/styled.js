import styled from 'styled-components/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Conteiner = styled.KeyboardAvoidingView`
   flex:1; 
   justify-content:center;
   align-items:center;
`;


export  const DescText = styled.Text`
   width:${wp('80%')}px;
   text-align:center;
   font-family:${props => props.family || 'Roboto Regular'}
   font-size:${props => props.size || hp('3%')}px;
   color:${props => props.color || '#333'}; 
   height:${hp('10%')}px;
   border-bottom-width: 1px;
   border-top-width: 1px;
   border-color: #999;
   margin-top:${hp('1%')}px;
   margin-bottom:${hp('1%')}px;
   padding-top:${hp('2.5%')}px;
`;

export const BarraProgresso = styled.View`
    width: ${wp('70%')}px;
    height: 2px;
    border-width: 1px;
    border-color: #999;
`
export const Text = styled.Text`
    margin-top:20px;
    margin-bottom:10px;
    font-size: ${hp('4%')}px;
    color: #fff
    text-align:center;
    font-family:Roboto Black;
    
`

export const Lista = styled.FlatList`
   
`