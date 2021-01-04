import React, { useState, useEffect } from 'react';
import { Conteiner, DescText} from './styled'


const Page = (props) => {

   return (
      <Conteiner>
         <DescText>Em breve pagina de status!</DescText>
      </Conteiner>
   );
}

Page.navigationOptions = {
   headerShown: false
}

export default  Page;