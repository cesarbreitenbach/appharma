import React from 'react';
import styled from 'styled-components/native'

const Conteiner = styled.View`
   justify-content:center;
   align-items:center;
`
const Text = styled.Text`
   font-size: ${props => props.size || "16px"}
   color: ${props => props.color || "#fff"}
   font-family:Roboto Medium
`

const HeaderTitle = (props) => {
  return (
   <Conteiner>
      <Text>APPharma - A Farmacia Inteligênte</Text>
</Conteiner>

  )
}

export default HeaderTitle;