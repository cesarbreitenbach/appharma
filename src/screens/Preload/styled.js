import styled from 'styled-components/native'

export const Conteiner = styled.SafeAreaView`
   flex:1;
   justify-content:center;
   align-items:center;
`

export const Title = styled.Text`
   font-size:${props=>props.size||"20px"};
   color:#ff0000;
   font-weight:bold;
`

export const Logo = styled.Image`
   width:80px;
   height:80px;
`
