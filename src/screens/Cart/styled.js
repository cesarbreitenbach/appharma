import styled from 'styled-components/native';
import d from '../../config/padroes'

export const Container = styled.SafeAreaView`
   flex:1; 
`;

export const Header = styled.View`
   background-color:${d.corPrincipal}
   height:80px;
   padding-top:30px;
   flex-direction:row;
   justify-content:space-between;

 
`
export const IconBackArea = styled.TouchableOpacity`
   width:50px;
   height:50px
`


export const ItensOnCart = styled.FlatList`
   background-color:#ddd

` 

export const InfoArea = styled.View`
   height:70px;
   background-color:${d.corPrincipal}
   flex-direction:row;
   justify-content: space-between
   align-items:flex-start;
`

export const TotalArea = styled.View`
   margin-top:10px;
   margin-left:30px;
`

export const Buttom = styled.TouchableOpacity`
   width:140px;
   height:50px;
   align-items:center;
   justify-content:center;
   background-color:#00524f;
   margin-right:20px;
   margin-top:10px;
   border-radius:10px;
   padding:5px;
`

export const Text = styled.Text`
   font-size:${props=>props.size  || "15px"};
   font-family:Roboto Medium;
   color:#cbf7d6
   
`