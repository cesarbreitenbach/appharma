import React from 'react'
import {connect} from 'react-redux'
import Item from '../../Items'
import { Conteiner, Title, Off, Preco, PrecoPromo } from './styled'
import {URL_FILES} from '@env'

const ItemProduct = props => {


   let desconto =  Number.parseFloat(props.data.discount);

   const handleClick = ({id, id_tipo}) => {
      props.navigation.navigate('Produto', {id, tipo:id_tipo})
   }

   return (
         <Conteiner activeOpacity={0.7} onPress={()=>handleClick(props.data)}>
               <Item style={{marginBottom:10}}  radius="10px"  width={props.imgWidth || "100px"} height={props.imgHeight || "100px"} source={{uri:URL_FILES+props.data.path}}  />
               <Title>{props.data.nome}</Title>
               <Off> {desconto.toFixed(0)}% OFF</Off>
               <Preco>de R$ {parseFloat(props.data.preco_original).toFixed(2).replace(".", ",")}</Preco>
               <PrecoPromo>por R$ {parseFloat(props.data.preco_vigente).toFixed(2).replace(".", ",")}</PrecoPromo>
         </Conteiner>
   )
}

const mapStateToProps = (state) => {
   return {
      status: state.authReducer.status
   };
};

export default connect(mapStateToProps)(ItemProduct);