import React from 'react'
import styled from 'styled-components/native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { Text } from 'react-native'

export const Conteiner = styled.View`
margin-top: ${hp('1.5%')}px;
margin-bottom: ${hp('1.5%')}px;
`;

const GreetensArea = (props) => {
   function getFirstName(str) {
      var pieces = str.split(" ");
       return pieces[0].charAt(0).toUpperCase() + pieces[0].slice(1).toLowerCase();
   }


   return (
      <Conteiner>
         <Text style={{ fontFamily:'Ubuntu Medium', textAlign: 'center' }}>Olá, {getFirstName(props.nome)} em que posso te ajudar hoje?</Text>
      </Conteiner>
   )
}

export default GreetensArea;



