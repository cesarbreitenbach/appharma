import React, { useState, useEffect } from 'react';
import {Linking} from 'react-native';
import { Conteiner} from './styled'
import LoadingModal from '../../components/LoadingModal'
import { useSelector } from 'react-redux'

const Page = (props) => {

    const whatsapp = useSelector(state => state.cartReducer.whatsapp)
    const [loading, setLoading] = useState(false)


   return (
      <Conteiner>
          <LoadingModal visible={loading} />
      </Conteiner>
   );
}

Page.navigationOptions = {
   headerShown: false
}

export default Page