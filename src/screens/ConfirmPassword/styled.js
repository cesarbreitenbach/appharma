import styled from 'styled-components/native';

export const Conteiner = styled.KeyboardAvoidingView`
   flex:1; 
   justify-content:center;
   align-items:center;
   margin-left:30px;
   margin-right:30px;
`;

export const LogoArea = styled.View`
   width:100%;
   justify-content:center;
   align-items:center;
   margin-bottom:20px;
   
`;

export const LogoText  = styled.Text`
   font-size:${props => props.size || "14px"};
   margin-bottom:10px;

`;

export const FormText  = styled.Text`
   font-size:${props => props.size || "14px"}
  color:${props => props.color || "#000"}
`;

export const Logo = styled.Image`
   width:80px;
   height:80px;
`

export const FormArea = styled.View`
   width:100%;
   justify-content:center;
   align-items:center;
   background-color:#fff;
   padding:10px;
   border-radius:10px;
   margin-bottom:70px;
  
`;

export const InputArea = styled.View`
   width:100%;
   background-color:transparent;
   margin-bottom:5px;
   margin-top:5px;
   padding:7px;
`;

export const ItemInput = styled.TextInput`
   width:100%;
   height:40px;
   border:1px solid #000;
   border-radius:10px;
   margin-top:5px;
   padding:5px
`;

export const ButtomArea = styled.View`
justify-content:center;
align-items:center;
`;
export const ViewButtom = styled.View`
   flex-direction:row;
   justify-content:center;
   align-items:center;
`;

export const Buttom = styled.TouchableHighlight`
   width:200px;
   height:50px;
   background-color:#3f9168;
   justify-content:center;
   align-items:center;
   border-radius:15px;
`;

export const MsgError = styled.Text`
   font-weight:bold,
   font-size:12px;
   color:#ff0000;
   margin-top:10px;
   margin-bottom:10px;
`;

export const AreaInsdeInput = styled.View`
   width:100%;
   flex-direction:row;
`

export const InternalButtom = styled.View`
   flex-direction:row;
   justify-content:center;
   align-items:center;
`