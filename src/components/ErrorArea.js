import styled from 'styled-components/native'

export const  ErrorArea = styled.View`
   height:25px;
   background-color: rgba(255, 0, 0, 0.8)
   justify-content:center;
   padding:5px
`

export const  SuccessArea = styled.View`
   height:25px;
   background-color:rgba(35, 176, 7, 0.7)
   justify-content:center;
   padding:5px
`

export const Text = styled.Text`
   font-family:${props => props.family || 'Roboto Medium'};
   font-size:${props => props.size || "14px"}
   color:${props => props.color || "#000"}
   margin-top:2px
`