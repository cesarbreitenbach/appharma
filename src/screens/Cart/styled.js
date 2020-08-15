import styled from 'styled-components/native';
import d from '../../config/padroes'

export const Container = styled.SafeAreaView`
   flex:1; 
`;

export const Header = styled.View`
   background-color:${d.corPrincipal}
   margin-top:20px;
   padding-top: 8px;
   padding-bottom: 5px;
   height:50px;
   flex-direction:row;
   justify-content: space-between


`
export const IconBackArea = styled.TouchableOpacity`
   width:50px;
   height:50px
`
export const IconCartArea = styled.View`
   width:80px;
   height:80px
`

export const ItensOnCart = styled.FlatList`
   background-color:#ddd

` 

export const InfoArea = styled.View`
   height:70px;
   background-color:${d.corPrincipal}
   flex-direction:row;
   justify-content: center
   align-items:flex-start;
`

export const TotalArea = styled.View`
   margin-top:10px;
   margin-left:30px;
   margin-right:10px;
   flex:1;
`

export const Buttom = styled.TouchableOpacity`
   width:100px;
   height:40px;
   align-items:center;
   justify-content:center;
   background-color:#00524f;
   margin-right:20px;
   margin-top:10px;
   border-radius:5px;
   padding:5px;
`

export const Text = styled.Text`
   font-size:${props=>props.size  || "15px"};
   font-family:${ props=> props.family || 'Roboto Medium'};
   color:#cbf7d6
   
`

export const Empty = styled.View`
   flex:1;
`