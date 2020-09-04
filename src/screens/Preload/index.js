import React, { useEffect, useState } from 'react'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import api from '../../helpers/api'
import { Conteiner, Title, Logo } from './styled'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const Preload = (props) => {

   const [error, setError] = useState(false);
   const [errorMessage, setErrorMessage] = useState("")

   const go = () => {
      props.navigation.dispatch(StackActions.reset({
         index: 0,
         actions: [
            NavigationActions.navigate({ routeName: 'AppTab' }),
         ],
      }));
   }

   useEffect(() => {

      const dataPesquisa = '2020-07-14T00:00:00-03:00'

      if (!props.token) {
         console.log("enteri no best..")
         const goBest = async () => {
            try {
               const r = await api.get(`promocoes/best`);
               props.setPromocoes(r.data)
               go()
            } catch (e) {
               console.log(e)
               setErrorMessage(e.message)
               setError(true)
            }
         }
         goBest()

      } else {
         console.log(`vou chamar api do directno cpf : ${props.cpf} com o token ${props.token}`)

         const getDirect = async () => {
            try {
               const r = await api.get(`promocoes/direct?cpf=${props.cpf}`, { headers: { auth: props.token } });
               if (!r) {
                  setErrorMessage('Erro, estamos arrumando... ')
                  setError(true)
               }
               props.setPromocoes(r.data)
               const tmpList = await api.get('/endereco', { headers: { auth: props.token } })
               props.setAddressList(tmpList.data)
               go()
            } catch (e) {
               console.log(e.message)
               setErrorMessage(e.message)
               setError(true)
            };
         }
         getDirect()
      }


   }, [])


   return (
      <Conteiner>

         {!error &&
            <>
               <Title size="16px" style={{ fontFamily: "Roboto Black" }}>Approach Mobile </Title>
               <Logo source={require('../../assets/logo.png')} />
               <Title size="14px" style={{ fontFamily: "Roboto Black" }}>Solutions</Title>
            </>}

         {error &&
            <>
               <Title size="18px" color="#999" style={{ fontFamily: "Ubuntu Black" }}>Desculpe, serviço indisponivel!</Title>
               <Icon name="android-debug-bridge" color="#1b8c39" size={80} />
               <Title size="18px" color="#999" style={{ fontFamily: "Ubuntu Black", marginBottom: 0 }}>Estamos trabalhando nisso,</Title>
               <Title size="18px" color="#999" style={{ fontFamily: "Ubuntu Black" }}>volte mais tarde. </Title>
               <Title size="12px" style={{ fontFamily: "Roboto Black", marginTop: 50 }} >Erro: {errorMessage}</Title>

            </>
         }
      </Conteiner>
   );
};

const mapStateToProps = (state) => {
   return {
      promocoes: state.vitrineReducer.promocoes,
      token: state.authReducer.token,
      id: state.userReducer.id,
      cpf: state.userReducer.cpf,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      setPromocoes: (promocoes) => dispatch({ type: 'SET_PROMOCOES', payload: { promocoes } }),
      setAddressList: (list) => dispatch({ type: 'SET_ADDRESS', payload: { addressList:list } })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preload);
