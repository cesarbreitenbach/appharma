import React from 'react'
import {connect} from 'react-redux'
import Item from '../../Items'
import d from '../../../config/padroes'
import { Conteiner, Title, Preco, PrecoArea, TagArea, TagText} from './styled'
import AddDelCartButtom from '../../AddDelCartButtom'
import Icon from 'react-native-vector-icons/Entypo'

const ItemProduct = props => {


   let desconto =  Number.parseFloat(props.data.discount);



   const handleClick = (id) => {
      console.log("clicou no id: "+id)
      props.navigation.navigate('Produto', {id})
   }

   const goCart = () => {
      console.log("Vou pro carrinho...")
      props.navigation.navigate('Cart')
   }
   
   return (
         <Conteiner  activeOpacity={0.7} onPress={()=>handleClick(props.data.id)}>
               <Item style={{marginBottom:20}}  radius="50px" resizeMode='stretch' width={props.imgWidth || "100px"} height={props.imgHeight || "100px"} source={{uri:d.URL_FILES+props.data.image}}  />
               <PrecoArea>
                  <Title >{props.data.nome}</Title>
                  <Preco>R$ {parseFloat(props.data.preco_vigente).toFixed(2).replace(".", ",")}</Preco>
                  <AddDelCartButtom product={props.data} qtd={props.data.qtd}  setQtdProduto={props.setQtdProduto} goCart={goCart}/>
               </PrecoArea>
               {desconto>0 &&
               <TagArea>
                  <Icon name="price-tag" size={50} color='#19ad11'/>
                  <TagText size="12px" color="#fff" >{desconto.toFixed(0)} % </TagText>
               </TagArea>}

         </Conteiner>
   )
}

const mapStateToProps = (state) => {
   return {
      status: state.authReducer.status
   };
};

export default connect(mapStateToProps)(ItemProduct);