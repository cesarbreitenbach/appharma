import React from 'react'
import {connect} from 'react-redux'
import Item from '../../Items'
import d from '../../../config/padroes'
import { Conteiner, Title, Preco, PrecoArea} from './styled'
import AddDelCartButtom from '../../AddDelCartButtom'

const ItemProduct = props => {


   let desconto =  Number.parseFloat(props.data.discount);

   const handleClick = (id) => {
      props.navigation.navigate('Produto', {id})
   }

   return (
         <Conteiner activeOpacity={0.7} onPress={()=>handleClick(props.data.id)}>
               <Item style={{marginBottom:20}}  radius="50px" resizeMode='stretch' width={props.imgWidth || "100px"} height={props.imgHeight || "100px"} source={{uri:'https://ioffertas.club:3333/files/2ff6b01c543450dcc450a3bb194479b0.png'}}  />
               <PrecoArea>
                  <Title>Algum Produto {props.data.nome}</Title>
                  <Preco>R$ 50,00 {props.data.preco_vigente}</Preco>
               </PrecoArea>
               <AddDelCartButtom />
         </Conteiner>
   )
}

const mapStateToProps = (state) => {
   return {
      status: state.authReducer.status
   };
};

export default connect(mapStateToProps)(ItemProduct);