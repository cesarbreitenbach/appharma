import React from 'react';
import styled from 'styled-components/native';

const Conteiner = styled.SafeAreaView`
    background-color:#ddd;
    width:100%;
    height:300px;
    margin-bottom:20px;


    margin-bottom:10px;
    margin-top:5px;
 
    
    border-top-left-radius: 35px
    border-bottom-right-radius: 35px
   
`;

const Vitrine = props => {

    const go = (route) => {
        props.navigation.navigate(route);
    }

    return (
      <Conteiner></Conteiner>
    )
}

export default Vitrine;