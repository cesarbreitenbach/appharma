import styled from 'styled-components/native';
import { Animated } from 'react-native'

export const Container = styled.SafeAreaView`
   flex:1; 
   background-color:#fff;
`;

export const ActivityArea = styled.View`
   align-items:center;
   justify-content:center;
   flex:1;
`


export const Title = styled.Text`
   font-family:Roboto Bold;
   max-width: 250px;
   font-size:${props=>props.size || '15px'};
   color: ${props=>props.color || '#999'};
   text-align:${props=>props.align || 'left'};
`

export const ProdutoArea = styled.View`
   justify-content:center;
   align-items:center;
   height:400px;

`
export const ProdutoImg = styled.Image`
   width:280px;
   height:280px;
   margin: 10px;
`

export const ProdutoScroll = styled.ScrollView`
background-color:#fff
`
export const ActionArea = styled.View`

   background-color:${props => props.cor || '#999'}
   flex-direction:row;
   justify-content:space-around;

`

export const PriceInfo = styled.View`
justify-content:center;
align-items:center;
border-style: solid;
width:100%;
    border-bottom-width: 1px;
    margin-bottom:10px;
    padding-bottom:10px;
    border-color:#ddd;
`

export const OriginalPriceArea = styled.View`
    flex-direction:row;
 
`

export const Price = styled.Text`
   font-family:${props=>props.font || 'Ubuntu Bold'};
   font-size:${props=>props.size || '15px'};
   color: ${props=>props.color || '#000'};
   margin:3px;
   text-decoration: ${props=>props.decoration || 'none'}
`

export const Off = styled.View`
   width:40px;
   height:40px;
   border-radius:20px;
   background-color:${props => props.cor || '#999'}
   align-items:center;
   justify-content:center;
   margin-top:-20px;
   transform: rotate(-5deg);

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
      height:${props => props.height || '200px'};
      background-color:#fff;
      border-bottom-width:1px;
      border-bottom-color:#ddd;
      margin-top:10px;
      margin-bottom:5px;
   `
export const TitleProduct = styled.Text`
   font-family:Roboto Bold;
   margin-left:5px;
   margin-right:5px;  
   margin-top:10px;
   margin-bottom:5px;
`

export const ItemList = styled.FlatList`

`
export const SubtotalArea = styled.View`
   flex:2
   align-items:center;
   justify-content:center
`

export const FuckItem = styled.View`
    width:100%;
   align-items:center;
    border-style: solid;
    border-bottom-width: 1px;
    margin-bottom:10px;
    padding-bottom:10px;
    border-color:#ddd;
`
export const InfoArea = styled.View`
`