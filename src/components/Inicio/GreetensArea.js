import React from 'react'
import styled from 'styled-components/native'

import { Text } from 'react-native'

export const Conteiner = styled.View`
width:100%;
height:8%;
padding:20px;
margin-bottom:20px;
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



