import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
   flex:1; 
`;

export const Title = styled.Text`
   font-family:Roboto Black;
   font-size:${props=>props.size || '15px'};
   color: ${props=>props.color || '#999'};
`

export const ProdutoArea = styled.View`
   height:250px;
   background-color:#fff
`
export const ProdutoImg = styled.Image`
   width:150px;
   height:150px;
`

export const ProdutoScroll = styled.ScrollView`
background-color:#eee
`
export const ActionArea = styled.View`
   height:80px;
   background-color:#fff;
   flex:1;
   flex-direction:row;
   justify-content:space-between;

`

export const PriceInfo = styled.View`
width:200px;
justify-content:center;
align-items:center;
margin-top:10px;

`

export const OriginalPriceArea = styled.View`
   flex-direction:row;

`

export const Price = styled.Text`
   font-family:Ubuntu Bold;
   font-size:${props=>props.size || '15px'};
   color: ${props=>props.color || '#000'};
   margin:5px;
   text-decoration: ${props=>props.decoration || 'none'}
`
export const AreaButtom = styled.View`
padding:25px;
width:200px;
flex-direction:row
justify-content:space-between;
align-items:center;
`

export const AddToCart = styled.TouchableOpacity`
   background-color:#ddd
   border-radius:25px;
   width:50px;
   height:50px;
   align-items:center;
   justify-content:center;
`
export const Off = styled.View`
   width:50px;
   height:50px;
   border-radius:25px;
   background-color:#0dbf16;
   align-items:center;
   justify-content:center;
   margin-top:-35px;

`

export const IconArea = styled.View`
   padding:2px;
   justify-content:center;
   align-items:center;
`