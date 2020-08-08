import React from 'react'
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import {ActivityIndicator} from 'react-native'
import Item from '../../components/Items'

const Conteiner = styled.TouchableOpacity`
    flex:1;
    border:1px solid #ddd
    width: ${ props=> props.width ||  '175px'}  ;
    height: ${ props=> props.height ||  '225px'} ;
    margin:5px;
    padding-left:5px;
    padding-right:5px;
    border-radius:10px;
    justify-content:center;
    align-items:center;
`;

const ImageItem = styled.Image`
   width: ${ props=> props.imgwidth || '170px'};
   height: ${ props=> props.imgheight || '220px'}; 
   border-radius:10px
`


const ItemDestaque = props => {
   return (
         <Conteiner activeOpacity={0.8}>
               <ImageItem resizeMode='cover' source={{uri:"https://ioffertas.club:3333/files/53841e0fba81aac609647b4997a1c2ca.png"}} />
         </Conteiner>
   )
}

const mapStateToProps = (state) => {
   return {
      status: state.authReducer.status
   };
};

export default connect(mapStateToProps)(ItemDestaque);