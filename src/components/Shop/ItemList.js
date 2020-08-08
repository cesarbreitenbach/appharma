import React from 'react'
import styled from 'styled-components'
import ItemProduct from '../../components/Shop/ItemProduct'

const ContentArea = styled.View`
      flex:1;
      justify-content:center;
      height:${props => props.height || '125px'};
      width:100%;
      background-color:#fff;
      border-bottom-width:1px;
      border-bottom-color:#ddd;
      margin-top:10px;
      margin-bottom:5px;
   `

   export const Title = styled.Text`
   font-family:Ubuntu Medium;
   margin-left:5px;
   margin-right:5px;
   
`

export const List = styled.FlatList`

`

const ItemList = props => {

   <ContentArea height="285px" >
      <Title>Mais Vendidos </Title>
      <List
         horizontal={true}
         showsHorizontalScrollIndicator={false}
         data={topSellers}
         renderItem={({ item }) => <ItemProduct navigation={props.navigation} data={item} />}
         keyExtractor={(item) => item.id.toString()}
         decelerationRate="fast"
         maxToRenderPerBatch={20}
         snapToInterval={130}
      />
   </ContentArea>

}

export default ItemList;