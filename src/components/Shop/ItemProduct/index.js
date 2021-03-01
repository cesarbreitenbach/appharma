import React from 'react'
import {connect} from 'react-redux'
import Item from '../../Items'
import { Conteiner, Title, Off, Preco, PrecoPromo, TagArea, TagText } from './styled'
import Icon from 'react-native-vector-icons/Entypo'
import {URL_FILES} from '@env'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ItemProduct = props => {


   let desconto =  Number.parseFloat(props.data.discount);

   const handleClick = ({id, id_tipo}) => {
      props.navigation.navigate('Produto', {id, tipo:id_tipo})
   }

   return (
       <>
         <Conteiner activeOpacity={0.7} onPress={()=>handleClick(props.data)}>
               <Item style={{marginBottom:10}}  radius="10px"  width={props.imgWidth || "100px"} height={props.imgHeight || "100px"} source={{uri:URL_FILES+props.data.path}}  />
               <Title>{props.data.nome}</Title>
               <Preco>R$ {parseFloat(props.data.preco_original).toFixed(2).replace(".", ",")}</Preco>
               <Title>por</Title>
               <PrecoPromo>R$ {parseFloat(props.data.preco_vigente).toFixed(2).replace(".", ",")}</PrecoPromo>
         </Conteiner>
         {desconto > 0 &&
            <TagArea>
                <Icon name="price-tag" size={60} color='rgba(25, 173, 17, 0.5)' />
                <TagText size="15px" color="#fff" >{desconto.toFixed(0)} % </TagText>
            </TagArea>}
        </>
   )
}

const mapStateToProps = (state) => {
   return {
      status: state.authReducer.status
   };
};

export default connect(mapStateToProps)(ItemProduct);