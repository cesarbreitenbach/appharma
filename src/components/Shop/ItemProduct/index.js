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
               <Item style={{marginBottom:20}}  radius="50px" resizeMode='stretch' width={props.imgWidth || "100px"} height={props.imgHeight || "100px"} source={{uri:d.URL_FILES+props.data.image}}  />
               <Title>{props.data.nome}</Title>
               <Off> {desconto.toFixed(0)}% OFF</Off>
               <Preco>de R$ {props.data.preco_original}</Preco>
               <PrecoPromo>por R$ {props.data.preco_vigente}</PrecoPromo>
         </Conteiner>
   )
}

const mapStateToProps = (state) => {
   return {
      status: state.authReducer.status
   };
};

export default connect(mapStateToProps)(ItemProduct);