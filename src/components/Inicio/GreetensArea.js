import React from 'react'
import styled from 'styled-components/native'

import { Text } from 'react-native'

export const Conteiner =  styled.View`
width:100%;
height:8%;
padding:20px;
`;

const GreetensArea = (props) =>{
   return (
      <Conteiner>
         <Text style={{ fontWeight: 'bold' }}>Olá!</Text>
         <Text style={{ fontWeight: 'bold' }}>Em que posso te ajudar?</Text>
      </Conteiner>
   )
}

export default GreetensArea;



