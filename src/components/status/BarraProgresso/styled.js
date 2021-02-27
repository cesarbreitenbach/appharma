import styled from 'styled-components/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Conteiner = styled.View`
    height:150px;
    width: 100%
    padding:15px;
    align-items:center;
    flex-direction: column;
    border-bottom-width:1px;
    `


export const Ball = styled.View`
    background-color: ${props => props.active ? 'rgba(59, 163, 94, 1)' : '#fff'} ;
    border-color:${props => props.active ? '#000' : '#999'} ;
    border-width:2px;
    width: 30px;
    height: 30px;
    border-radius:15px;
    margin-top: -10px;
    
    `

export const Bar = styled.View`
    background-color: rgba(59, 163, 94, 0.8);
    flex-direction: row;
    width: 70%;
    height: 8px;
    border-radius:5px;
    justify-content: space-between;
    margin-bottom:15%;
 
`

export const Div = styled.View`
    align-items:center;
    
`

export const Text = styled.Text`
    font-size:${props => props.active ? '14px' : '12px'} ;
    font-family: Roboto Medium;
    max-width: 300px;
    margin-bottom:20px;
    
`