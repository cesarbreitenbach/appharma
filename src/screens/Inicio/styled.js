import styled from 'styled-components/native';

export const Conteiner = styled.KeyboardAvoidingView`
   flex:1; 
   justify-content:center;
   align-items:center;
   margin-left:30px;
   margin-right:30px;
`;
export const BuyNowArea = styled.View`
   width:350px;
   height:200px;
   background-color:#FFF;

   margin-bottom:10px;
   margin-top:5px;

   
   border-top-left-radius: 35px
   border-bottom-right-radius: 35px
   
`;
export const HeaderTextArea = styled.View`
justify-content:center;
align-items:center;
padding:10px;
`;

export const IconeArea = styled.View`
width:50px;
border-top-left-radius: 35px;
background-color:#9d80ff;
justify-content:center;
align-items:center;
margin-left:15px;
`;

export const HeaderArea = styled.View`
   width:100%;
   height:65px;
   background-color:#9d80ff;
   border-top-left-radius: 35px;
   flex-direction:row;
   
`;
export const FooterArea = styled.View`
   width:100%; 
   height:15px;
   border-bottom-right-radius: 35px;
   background-color:#9d80ff;
   `

export const ButtomArea = styled.View`
justify-content:center;
align-items:center;

`


export const BuyNowItems = styled.View`
   flex-direction:row;
   justify-content:center;
   align-items:center;
   padding:10px;
`;
export const Items = styled.Image`
   width:${props=>props.width || '35px'};
   height:${props=>props.height || '35px'};
   margin:5px 10px;
`;

export const BuyNowButtom = styled.TouchableHighlight`
   width:200px;
   height:50px;
   background-color:#47ad7a;
   justify-content:center;
   align-items:center;
   border-radius:15px;
`;

export const HeaderText = styled.Text`
color:#eee;
font-size:${props=>props.size || '17px'};;
font-weight:bold;
text-align:center;
`;

export const ScollArea = styled.ScrollView`
   width:100%;
   height:100%;
`;

export const ViewButtom = styled.View`
   flex-direction:row;
   justify-content:center;
   align-items:center;
`;

export const GreetensArea = styled.View`
   width:100%;
   height:80px;
   padding:20px;

`

export const ImageArea = styled.ImageBackground`
flex:1;
justify-content: center;
`

export const LoginArea = styled.View`
width:350px;
height:200px;
background-color:#fff;

margin-bottom:10px;
margin-top:5px;


border-top-left-radius: 35px

border-bottom-right-radius: 35px
`;

export const FormArea = styled.View`
width:100%;
height:120px;
justify-content:center;
align-items:center;
`
