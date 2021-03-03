import React, { useState, useEffect } from 'react';
import { Conteiner, Text, Name, Email, Celular, DataAniver, Cpf, Buttom } from './styled'
import { useDispatch, useSelector } from 'react-redux'
import Back from '../../components/perfil/Back'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Cart from '../../components/Cart'
import { TextInputMask, TextMask } from 'react-native-masked-text'
import { ErrorArea, Text as Text2, SuccessArea } from '../../components/ErrorArea'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker'
import useApi from '../../helpers/apiAppharma'

const Page = ({ data, navigation }) => {

    const nomeAux = useSelector(state => state.userReducer.name)
    const emailAux = useSelector(state => state.userReducer.email)
    const whats = useSelector(state => state.userReducer.whatsapp)
    const token = useSelector(state => state.authReducer.token)
    const cpf = useSelector(state => state.userReducer.cpf)
    const [whatsapp, setWhatsapp] = useState(whats.whatsapp)
    const [date, setDate] = useState(new Date())
    const [nome, setNome] = useState(nomeAux)
    const [email, setEmail] = useState(emailAux)
    const api = useApi()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const dispatch = useDispatch()

    const carregaRedux = async () => {
        let parsedCpf = cpf;

        parsedCpf = parsedCpf.replace('.', '').replace('.', '').replace('-', '');

        const infoUser = await api.getUser(parsedCpf)

        console.log(JSON.stringify(infoUser))
        setEmail(infoUser.user.email)
        setNome(infoUser.user.nome)
        setWhatsapp(infoUser.user.whatsapp)
        let nasc = infoUser.user.dt_nasc;
        if (typeof(nasc) !== 'undefined'){
            console.log('nasc: '+nasc)
            let novaData = new Date(nasc)
            setDate(novaData)
        } 

    }

    useEffect(() => {
        carregaRedux()
    }, [])

    useEffect(() => {
        if (error === '' && success === '') return
        setTimeout(() => {
            setError('')
            setSuccess('')
        }, 2000)
    }, [error, success])

    const handleSave = async () => {

        const body = {
            name: nome,
            whatsapp,
            email,
            dt_nasc: date
        }

        const resp = await api.putUser(token, body)

        if (resp.error) {
            setError("Erro ao salvar!")
            return
        }

        setSuccess("Dados salvos com sucesso!")


        navigation.goBack();

    }

    return (
        <Conteiner>
            {error != '' &&
                <ErrorArea style={{ width: 250 }}>
                    <Text2 size="12px" color="#fff" family="Roboto Regular">{error}</Text2>
                </ErrorArea>}

            {success != '' &&
                <SuccessArea style={{ width: 250 }}>
                    <Text2 size="12px" color="#fff" family="Roboto Regular">{success}</Text2>
                </SuccessArea>}

            <Text color="#000"> Meus Dados </Text>
            <TextMask
                style={{ textAlign: 'center', borderColor: '#999', width: wp('70%'), height: hp('6%'), borderWidth: 1, marginTop: 5, borderRadius: 10, padding: 15 }}
                autoFocus={false}
                type={'cpf'}
                value={cpf}
            />
            <Name placeholder="Nome" value={nome} onChangeText={text => setNome(text)} />
            <Email keyboardType="email-address" placeholder="seu@email.com" value={email} onChangeText={text => setEmail(text)} />
            <TextInputMask
                style={{ borderColor: '#999', width: wp('70%'), height: hp('6%'), borderWidth: 1, marginTop: 5, borderRadius: 10, padding: 5 }}
                placeholder="(45) 9999-9999"
                type={'cel-phone'}
                options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                }}
                value={whatsapp}
                onChangeText={text => {
                    setWhatsapp(text)
                }}
            />
            <Text color="#000" family="Roboto Medium" size="15px" style={{ marginTop: hp('1.5%') }}>Data de Nascimento:</Text>
            <DatePicker
                date={date}
                onDateChange={setDate}
                androidVariant='nativeAndroid'
                mode='date'
                maximumDate={new Date()}
                style={{ borderColor: '#999', borderWidth: 1 }}
            />
            <Buttom onPress={handleSave} activeOpacity={0.7}>
                <Icon name="content-save" size={20} color="#fff" />
                <Text color="#fff" size="16px" style={{ marginLeft: 5 }}>Salvar</Text>
            </Buttom>
        </Conteiner>
    );
}

Page.navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    const goCart = () => {
        navigation.navigate('Cart')
    }
    return {
        headerRight: () => <Cart goCart={goCart} />,
        headerTitle: () => <Text>  </Text>,
        headerLeft: () => <Back navigation={navigation} />,
        headerTintColor: '#fff',
    }
}

export default Page;