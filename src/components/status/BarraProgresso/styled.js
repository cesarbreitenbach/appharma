import styled from 'styled-components/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const Conteiner = styled.View`
    height:${hp('22.7%')}px;
    width: ${wp('100%')}px;
    align-items:center;
    flex-direction: column;
    border-bottom-width:1px;
    `


export const Ball = styled.View`
    background-color: ${props => props.active ? 'rgba(59, 163, 94, 1)' : '#fff'} ;
    border-color:${props => props.active ? '#000' : '#999'} ;
    border-width:2px;
    width: ${props => props.active ? '30px' : '20px'} ;
    height: ${props => props.active ? '30px' : '20px'} ;
    border-radius:15px;
    margin-top: ${props => props.active ? '-10px' : '-5px'} ;
    
    `

export const Bar = styled.View`
    background-color: rgba(59, 163, 94, 0.8);
    flex-direction: row;
    width: ${wp('80%')}px;
    height: 8px;
    border-radius:5px;
    justify-content: space-between;
    margin-bottom:20%;
 
`

export const Div = styled.View`
    align-items:center;
    
`

export const Text = styled.Text`
    font-size:${props => props.active ? wp('4.25%')+'px' : wp('4%')+'px'} ;
    font-family: Roboto Medium;
    margin-bottom:${props => props.bottom || '10px'};
    margin-top:${props => props.top || '10px'};
    
`