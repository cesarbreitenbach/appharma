import styled from 'styled-components/native';

export const ModalArea = styled.SafeAreaView`
   width:100%;
   height:100%;
   background-color: rgba(0, 0, 0, 0.5)
   align-self:flex-end;  
`

export const ModalHeader = styled.View`
   flex-direction:row;
   background-color:${props => props.cor  || '#ddd'}
   height:50px;
`;
export const AreaBack = styled.View`

`


export const Buttom = styled.TouchableOpacity`
   height:50px;
   width:50px;
   margin-left:10px;
   margin-top:10px;
`
export const AreaText = styled.View`
   flex:1;
   justify-content:center;
   align-items:center;
`

export const Text = styled.Text`
   font-family:${props => props.family || 'Roboto Medium'};
   font-size:${props => props.size || "14px"}
   color:${props => props.color || '#000'}
   margin-bottom:5px;
`

export const FoneArea = styled.View `
    height:200px;
    background-color:#fff
    display:flex;
    justify-content:center;
    align-items:center;

`