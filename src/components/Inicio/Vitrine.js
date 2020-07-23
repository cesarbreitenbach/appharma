import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import ItemVitrine from '../../components/Inicio/ItemVitrine'
import api from '../../helpers/api'
import Items from '../Items'


const Conteiner = styled.View`
    background-color:#fff;
    width:100%;
    height:300px;
    margin-bottom:5px;
    padding:5px;
    border-bottom-left-radius: 15px
    border-bottom-right-radius: 15px
`;
export const HeaderPromo = styled.View`
   background-color:#04c2b5;
   width:100%;
   height:50px;
   justify-content:center;
   align-items:center;
   padding:10px;
   border-top-left-radius: 15px;
   border-top-right-radius: 15px;
   flex-direction:row;

`;

export const HeaderTextArea = styled.View`
justify-content:center;
align-items:center;
padding:10px;
`;
export const IconeArea = styled.View`
width:50px;
border-top-left-radius: 35px;
background-color:#04c2b5;
justify-content:center;
align-items:center;
margin-left:15px;
`;
export const HeaderArea = styled.View`
   width:100%;
   height:45px;
   background-color:#04c2b5;
   border-top-left-radius: 35px;
   flex-direction:row;
   
`;
export const HeaderText = styled.Text`r
color:#eee;
font-size:${props => props.size || '17px'};;
font-weight:bold;
text-align:center;
`;
const ProductScroll = styled.FlatList`
flex:1;
`;



const Vitrine = props => {

   const [itemsVitrine, setItemsVitrine] = useState([])
   const dataPesquisa = '2020-07-14T00:00:00-03:00'
   useEffect(() => {
      api.get(`promocoes?date=${dataPesquisa}`).then(r => {
         setItemsVitrine(r.data)
      })
   }, [])



   return (
      <>
         <HeaderPromo>
            <IconeArea><Items width="30px" height="30px" source={require('../../assets/offinicial.png')} /></IconeArea>
            <Text style={{ fontSize: 16, color: '#db3737', fontWeight:'bold' }}>Top ofertas da semana</Text>
         </HeaderPromo>
         <Conteiner>

            <ProductScroll horizontal={true}
               showsHorizontalScrollIndicator={false}
               data={itemsVitrine}
               renderItem={({ item }) => <ItemVitrine data={item} />} 
               keyExtractor={(item) => item.id.toString()}>

            </ProductScroll>

         </Conteiner>

      </>
   )
}

export default Vitrine;