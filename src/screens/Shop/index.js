import React, { useState, useEffect } from 'react';
import { Conteiner, ScrollArea, ContentArea, Title, ItemList } from './styled'
import { useSelector } from 'react-redux'
import api from '../../helpers/api'
import ItemCategoria from '../../components/Shop/ItemCategoria'
import ItemDestaque from '../../components/Shop/ItemDestaque'
import ItemProduct from '../../components/Shop/ItemProduct'


const Page = () => {

   const [categorias, setCategorias] = useState([])

   const nome = useSelector(state => state.userReducer.name)

   useEffect(() => {

      api.get('categorias').then(r => {
         console.log(r.data)
         setCategorias(r.data)
      }).catch(e => console.log(e))

   }, [])

   return (
      <Conteiner>
         <ScrollArea showsVerticalScrollIndicator={false}>
            <ContentArea height="255px"  >
               <Title>Destaques </Title>
               <ItemList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={categorias}
                  renderItem={({ item }) => <ItemDestaque data={item} /> }
                  keyExtractor={(item) => item.id.toString()}
                  decelerationRate="fast"
                  maxToRenderPerBatch={10}
                  snapToInterval={130}
               />
            </ContentArea>

            <ContentArea  height="100px" >
               <Title>Categorias </Title>
               <ItemList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={categorias}
                  renderItem={({ item }) => <ItemCategoria data={item} />}
                  keyExtractor={(item) => item.id.toString()}
                  decelerationRate="fast"
                  maxToRenderPerBatch={10}
                  snapToInterval={130}
               />
            </ContentArea>

            <ContentArea  height="265px" >
               <Title>Mais Vendidos </Title>
               <ItemList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={categorias}
                  renderItem={({ item }) => <ItemProduct data={item} />}
                  keyExtractor={(item) => item.id.toString()}
                  decelerationRate="fast"
                  maxToRenderPerBatch={20}
                  snapToInterval={130}
               />
            </ContentArea>

         </ScrollArea>
      </Conteiner>
   );
}


export default Page;