
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import Input from '../bases/Input';
import Axios from 'axios';
import { serverUrl } from '../../server';
import Cadastro from '../cadastro/Cadastro';

import AsyncStorage from '@react-native-community/async-storage';

const Login = (props) => {

    props = props.props;

    const [email , setEmail] = useState("");
    const emailHandler = text => setEmail(text);

    const [senha, setSenha] = useState("");
    const senhaHandler = text => setSenha(text);

    const [loginResult, setLoginResult] = useState();

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('usuario', jsonValue);
        } catch (e) {
          // saving error
        }
    }

    const entrar = (e) => {

        e.preventDefault();

        let obj = {
            email: email,
            senha: senha
        }

        Axios.post(serverUrl + '/login', obj)
        .then((response) => {
            
            props.setIsLogado(true);
            props.setUsuario(response.data);

            props.usuario = response.data;
            
            props.setRoute(<Cadastro props={props}/>);

            storeData(response.data);

            setLoginResult(
                <Text>Sucesso tentar entrar</Text>
            );
        })
        .catch((error) => {

            console.log(error);

            setLoginResult(
                <Text style={styles.erroText}>Erro ao tentar entrar</Text>
            );
        });
    }

    return(
        <View>
            <Text style={styles.titleText}>Entrar</Text>
            <Input
                nome={"Email"} 
                value={email} 
                onChangeText={emailHandler}
            />
            <Input
                nome={"Senha"}
                value={senha}
                onChangeText={senhaHandler}
                secureTextEntry={true}

            />
            <Button
                title="Entrar"
                onPress={entrar}
            />
            {loginResult}
        </View>
    );
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 40,
        marginTop: 20,
        marginBottom: 20,
        textAlign: "center"
    },
    erroText: {
        marginTop: 20,
        textAlign: "center",
        color: "red",
        fontSize: 20
    }
});

export default Login;