
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";

import Input from '../bases/Input';
import Axios from 'axios';
import { serverUrl } from '../../server';

const Conta = (props) => {

    props = props.props;

    const [nome, setNome] = useState(props.usuario.nome);
    const [email, setEmail] = useState(props.usuario.email);
    const [senha, setSenha] = useState(props.usuario.senha);
    const [senhaNovamente, setSenhaNovamente] = useState("");
    const [telefone, setTelefone] = useState(props.usuario.telefone);
    const [cpf, setCpf] = useState(props.usuario.cpf);
    const [cepInicial, setCepInicial] = useState(props.usuario.cepInicial);
    const [cepFinal, setCepFinal] = useState(props.usuario.cepFinal);


    const [alteraResult, setAlteraResult] = useState();

    const alterarConta = () => {

        if (senha !== senhaNovamente){

            setAlteraResult(
                <Text style={styles.erroText}>Erro senhas não correspondem</Text>
            );
            return;
        }

        let obj = {
            _id: props.usuario._id,
            nome: nome,
            email: email,
            senha: senha,
            telefone: telefone,
            cpf: cpf,
            cepInicial: cepInicial,
            cepFinal: cepFinal,
            tipoUsuario : props.usuario.tipoUsuario,
            status : props.usuario.status,
            idOrg : props.usuario.idOrg,
        }

        Axios.put(serverUrl + "/usuarios/" + props.usuario._id, obj)
        .then(()=>{

            setSenhaNovamente("");

            props.setUsuario(obj);

            setAlteraResult(
                <Text style={styles.sucessoText}>Sucesso ao tentar alterar conta</Text>
            );
        })
        .catch(()=>{
            setAlteraResult(
                <Text style={styles.erroText}>Erro ao tentar alterar conta</Text>
            );
        });
    }

    return(
        <ScrollView style={styles.scroll}>
            <Text style={styles.titleText}>Conta</Text>
            <Input
                nome={"Nome"} 
                value={nome} 
                onChangeText={setNome}
            />
            <Input
                nome={"Email"} 
                value={email} 
                onChangeText={setEmail}
            />
            <Input
                nome={"Senha"} 
                value={senha} 
                onChangeText={setSenha}
                secureTextEntry={true}
            />
            <Input
                nome={"Senha Novamente"} 
                value={senhaNovamente} 
                onChangeText={setSenhaNovamente}
                secureTextEntry={true}
            />
            <Input
                nome={"Telefone"} 
                value={telefone} 
                onChangeText={setTelefone}
            />
            <Input
                nome={"Cpf"} 
                value={cpf} 
                onChangeText={setCpf}
            />
            <Input
                nome={"Cep Inicial"} 
                value={cepInicial} 
                onChangeText={setCepInicial}
            />
            <Input
                nome={"Cep Final"} 
                value={cepFinal} 
                onChangeText={setCepFinal}
            />
            <Button
                title="Alterar Conta"
                onPress={alterarConta}
            />
            {alteraResult}
        </ScrollView>
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
        color: "red",
        fontSize: 20,
        marginTop: 20,
        textAlign: "center"
    },
    sucessoText: {
        color: "green",
        fontSize: 20,
        marginTop: 20,
        textAlign: "center"
    },
    scroll: {
        marginBottom: 160,
        //paddingBottom: 220
    }
});

export default Conta;