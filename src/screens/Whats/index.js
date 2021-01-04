import React, { useState, useEffect } from 'react';
import {Linking} from 'react-native';
import { Conteiner} from './styled'
import LoadingModal from '../../components/LoadingModal'
import {useSelector} from 'react-redux'

const Page = (props) => {

    const whatsapp = useSelector(state => state.cartReducer.whatsapp)
    const [loading, setLoading] = useState(false)


    useEffect(()=>{

        setLoading(true)


        const carregarWhats = async () =>{
            const link = `whatsapp://send?text=Oi, estou comprando pelo APP e surgiu uma duvida.&phone=+55${whatsapp}`
            const supported = await Linking.canOpenURL(link);
            if (!supported) {
                alert("Não encontrei o aplicativo Whatsapp  para enviar mensagem!")
                setLoading(false)
            } else {
                await Linking.openURL(link);
                setLoading(false)
            }
        }

        carregarWhats();


    }, [])

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