import React, { useState, useRef } from 'react';
import { Conteiner, FormArea, InputArea, FormText, ButtomArea, Buttom, LogoText, ItemInput, LogoArea, Logo, MsgError, InternalButtom } from './styled'
import { TextInputMask } from 'react-native-masked-text'
import { connect, useSelector } from 'react-redux'
import useApi from '../../helpers/apiAppharma'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ConfirmPassword = (props) => {

    const logo = useSelector(state => state.shopReducer.logo)
    const telefone = useSelector(state => state.userReducer.whatsapp)
    const [password, setPassword] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [name, setName] = useState(props.nome);
    const appharma = useApi()
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    console.log("Este é o telefone: "+ JSON.stringify(telefone))

    const start = async () => {
        setError(false)

        if (password !== confirmPassword && !props.id) {
            setErrorMsg("Senhas são diferentes. Tente de novo.");
            setError(true);
            return;
        }

    if (whatsapp == '' && !telefone.whatsapp) {
            setErrorMsg("Numero do celular obrigatório.");
            setError(true);
            return;
        }

        if (whatsapp.length < 15 && !telefone.whatsapp) {
            setErrorMsg("Numero do celular obrigatório.");
            setError(true);
            return;
        }



        let parsedWhats = whatsapp;
        parsedWhats = parsedWhats.replace(/[^0-9]+/g, "")

        //Se não tiver ID cadastra se não faz login, pede apenas a senha
        if (!props.id) {

            const body = {
                name, cpf: props.cpf, password, confirmPassword, whatsapp: parsedWhats
            }
            const novoUser = await appharma.postUser(body)

            if (typeof (novoUser.data) !== 'undefined' && novoUser.data.error) {
                let msgErro = novoUser.data.messages[0].errors;
                if (msgErro[0].includes('at least 6')) {
                    setErrorMsg(`Senha tem que ter pelo menos 6 caracteres`);
                } else {
                    setErrorMsg(`${novoUser.data.error} ${novoUser.data.messages[0].errors}`);
                }
                setError(true);
                return
            }

            props.setId(novoUser.id);
            props.setToken(`Bearer ${novoUser.token}`);
            props.setStatus(true);
            props.setName(name);
            props.setDtNasc(novoUser.dt_nasc)
            props.navigation.navigate('Preload');

        } else {
            const body = {
                cpf: props.cpf,
                password: password
            }
            const session = await appharma.getSession(body)

            if (typeof (session.data) !== 'undefined') {
                setErrorMsg("Usuário ou senha invalidos!")
                setError(true)
                return
            }
            props.setStatus(true);
            props.setToken(`Bearer ${session.token}`);
            props.navigation.navigate('Preload');

        }

    }

    return (
        <Conteiner>
            <LogoArea>
                <LogoText size="12px" >Farmácias Online</LogoText>
                <Logo source={require('../../assets/logo.png')} />
            </LogoArea>
            {error && <MsgError>  {errorMsg} </MsgError>}
            <FormArea>
                <InputArea>


                    {props.id ? <LogoText>Bem vindo de volta {props.nome} !  </LogoText> : <LogoText>Cadastre uma senha de acesso no nosso App.  </LogoText>}
                    {!props.nome && <ItemInput
                        placeholder="Digite seu nome"
                        onChangeText={(e) => setName(e)}
                        blurOnSubmit={false}
                        returnKeyType="go"
                        autoFocus={true}
                    />}



                    {!telefone.whatsapp &&
                        <TextInputMask
                            style={{ width: '100%', height: 40, borderWidth: 1, marginTop: 5, borderRadius: 10, padding: 5 }}
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
                            onSubmitEditing={() => {
                                passwordRef.current.focus();
                            }}
                        />}

                    <ItemInput
                        ref={passwordRef}
                        placeholder="Digite sua senha secreta"
                        secureTextEntry
                        onChangeText={(e) => setPassword(e)}
                        returnKeyType={!props.id ? "go" : "done"}
                        autoFocus={props.id ? true : false}
                        onSubmitEditing={() => {
                            !props.id ? confirmPasswordRef.current.focus() : start()
                                ;
                        }}
                    />

                    {!props.id &&
                        <ItemInput
                            ref={confirmPasswordRef}
                            secureTextEntry
                            placeholder="Confirme sua senha"
                            onChangeText={(e) => setConfirmPassword(e)}
                            returnKeyType="done"
                            onSubmitEditing={() => start()}
                        />}
                </InputArea>

                <ButtomArea>
                    <Buttom onPress={start}>
                        <InternalButtom>
                            <Icon name="login" size={25} color="#fff" style={{ marginRight: 5 }} />
                            <FormText size="15px" color="#fff">{props.id ? "Entrar" : "Cadastrar"} </FormText>
                        </InternalButtom>
                    </Buttom>
                </ButtomArea>

            </FormArea>

        </Conteiner>
    );
}

ConfirmPassword.navigationOptions = {
    headerShown: false
}

const mapStateToProps = (state) => {
    return {
        cpf: state.userReducer.cpf,
        token: state.authReducer.token,
        id: state.userReducer.id,
        nome: state.userReducer.name,
        admin: state.authReducer.admin,
        status: state.authReducer.status,
        whatsapp: state.userReducer.status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => dispatch({ type: 'SET_NAME', payload: { name } }),
        setToken: (token) => dispatch({ type: 'SET_TOKEN', payload: { token } }),
        setAdmin: (admin) => dispatch({ type: 'SET_ADMIN', payload: { admin } }),
        setStatus: (status) => dispatch({ type: 'SET_STATUS', payload: { status } }),
        setWhats: (whatsapp) => dispatch({ type: 'SET_USER_WHATS', payload: { whatsapp } }),
        setDtNasc: (dtNasc) => dispatch({ type: 'SET_USER_NASC', payload: { dtNasc } }),
        setId: (id) => dispatch({ type: 'SET_ID', payload: { id } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPassword);