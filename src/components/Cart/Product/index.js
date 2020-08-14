import React from 'react'
import {connect} from 'react-redux'
import Item from '../../Items'
import d from '../../../config/padroes'
import { Conteiner, Title, Preco, PrecoArea} from './styled'
import AddDelCartButtom from '../../AddDelCartButtom'

const ItemProduct = props => {


   let desconto =  Number.parseFloat(props.data.discount);

   const handleClick = (id) => {
      console.log("clicou no id: "+id)
      props.navigation.navigate('Produto', {id})
   }

   return (
         <Conteiner key={props.data.carrinho.id} activeOpacity={0.7} onPress={()=>handleClick(props.carrinho.data.id)}>
               <Item style={{marginBottom:20}}  radius="50px" resizeMode='stretch' width={props.imgWidth || "100px"} height={props.imgHeight || "100px"} source={{uri:'https://ioffertas.club:3333/files/2ff6b01c543450dcc450a3bb194479b0.png'}}  />
               <PrecoArea>
                  <Title >{props.data.carrinho.nome}</Title>
                  <Preco>R$ {props.data.carrinho.preco_vigente}</Preco>
                  <AddDelCartButtom product={props.data} qtd={props.data.qtd}/>
               </PrecoArea>
         </Conteiner>
   )
}

const mapStateToProps = (state) => {
   return {
      status: state.authReducer.status
   };
};

export default connect(mapStateToProps)(ItemProduct);