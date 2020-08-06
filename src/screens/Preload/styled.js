import styled from 'styled-components/native'

export const Conteiner = styled.SafeAreaView`
   flex:1;
   justify-content:center;
   align-items:center;
`

export const Title = styled.Text`
   font-size:${props=>props.size||"20px"};
   color:${props=> props.color || '#ff0000'};
   margin-bottom:10px;
   margin-top:10px;
`

export const Logo = styled.Image`
   width:80px;
   height:80px;
`
