import styled from 'styled-components/native';
export const Conteiner = styled.KeyboardAvoidingView`
   flex:1; 
   justify-content:center;
   align-items:center;
   margin-left:30px;
   margin-right:30px;
`;
export const MsgError = styled.Text`
   font-weight:bold,
   font-size:12px;
   color:#ff0000;
   margin-top:5px;
`;
export  const WelcomeText = styled.Text`
   font-weight:bold,
   font-size:22px;
   color:#333;
   margin-bottom:40px;
`;
export  const DescText = styled.Text`
   font-size:18px;
   color:#333;
`;
export  const AddImg = styled.Text`
   font-size:12px;
   color:#fff; 
   `
   export const AvatarArea = styled.View`
   justify-content:center;
   align-items:center;
   margin-bottom:20px

`;
export const UserAvatar = styled.Image`
   width:200px;
   height:200px;
   border-radius:100px;
`;
export const TextButtom = styled.Text`
   color:#FFF
   
`;

export  const ConfigArea = styled.View`
   width:100%;
   flex:1;
   justify-content:center;
   align-items:center;
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

export const FormText  = styled.Text`
   font-size:${props => props.size || "14px"}
  color:${props => props.color || "#000"}
`;