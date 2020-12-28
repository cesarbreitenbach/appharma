import React from 'react'
import {connect} from 'react-redux'
import Item from '../../Items'
import d from '../../../config/padroes'
import { Conteiner, Title, Off, Preco, PrecoPromo } from './styled'

const ItemProduct = props => {


   let desconto =  Number.parseFloat(props.data.discount);

   const handleClick = ({id, id_tipo}) => {
      props.navigation.navigate('Produto', {id, tipo:id_tipo})
   }

   return (
         <Conteiner activeOpacity={0.7} onPress={()=>handleClick(props.data)}>
               <Item style={{marginBottom:20}}  radius="40px"  width={props.imgWidth || "80px"} height={props.imgHeight || "80px"} source={{uri:d.URL_FILES+props.data.path}}  />
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