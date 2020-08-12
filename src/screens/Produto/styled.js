import styled from 'styled-components/native';
import { Animated } from 'react-native'

export const Container = styled.SafeAreaView`
   flex:1; 
`;

export const Title = styled.Text`
   font-family:Roboto Black;
   font-size:${props=>props.size || '15px'};
   color: ${props=>props.color || '#999'};
`

export const ProdutoArea = styled.View`
   justify-content:center;
   align-items:center;
   height:240px;
   background-color:#fff

`
export const ProdutoImg = styled.Image`
   width:175px;
   height:175px;
   margin-top:10px;
`

export const ProdutoScroll = styled.ScrollView`
background-color:#eee
`
export const ActionArea = styled.View`
   height:90px;
   background-color:#fff;;
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

export const Off = styled.View`
   width:40px;
   height:40px;
   border-radius:20px;
   background-color:#0dbf16;
   align-items:center;
   justify-content:center;
   margin-top:-20px;
   transform: rotate(-15deg);

`


export const DescricaoArea = styled(Animated.View) `
   background-color:#fff
   padding:5px;
`

export const HeaderArea = styled.View`
   height:40px;
   background-color:#fff
   border-bottom-width:1px;
   border-bottom-color:#eee;
   flex-direction:row;
   justify-content:space-between;
   align-items:center;
   margin-top:5px;
`

export const ExpandButtom = styled.TouchableOpacity`
   width:30px;
   height:30px;
`

export const ContentArea = styled.View`
      
      justify-content:center;
      height:${props => props.height || '125px'};
      background-color:#fff;
      border-bottom-width:1px;
      border-bottom-color:#ddd;
      margin-top:10px;
      margin-bottom:5px;
   `
export const TitleProduct = styled.Text`
   font-family:Ubuntu Medium;
   margin-left:5px;
   margin-right:5px;  
   margin-top:10px;
   margin-bottom:5px;
`

export const ItemList = styled.FlatList`

`
