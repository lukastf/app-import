
import React, { useState } from 'react';
import { cnpjMask, cpfMask } from '../../../bases/masks';
import { Picker } from '@react-native-community/picker';
import { Text, Button, StyleSheet, View } from 'react-native';
import Input from '../../../bases/Input';
import Axios from 'axios';

const limitarTamanho = (str, tamanho) => {
    return str.substring(0, tamanho);
}

const InputCnpjOuCpf = (props) => {

    props = props.props;

    const buscarDados = () => {

        let cnpj = cnpjOuCpf.replace(".", "");
        cnpj = cnpj.replace("/", "");
        cnpj = cnpj.replace("-", "");
        cnpj = cnpj.replace(".", "");

        Axios.get("https://www.receitaws.com.br/v1/cnpj/"+ cnpj)
        .then((res) => {

            let atvSecResp = "";

            for(let i = 0; i < res.data.atividades_secundarias.length; i++) {

                atvSecResp += " " + res.data.atividades_secundarias[i].text;
            }

            let sociosResp = "";

            for(let i = 0; i < res.data.qsa.length; i++) {

                sociosResp += " " + res.data.qsa[i].nome;
            }

            //setAtividadePrincipal(res.data.atividade_principal[0].text);
            //setDataSituacao(res.data.data_situacao);
            let cnpj = limitarTamanho(res.data.cnpj, 20);
            props.cadastro.setCnpjOuCpf(cnpj);
            props.cadastro.cnpjOuCpf = cnpj;

            let nome = limitarTamanho(res.data.nome, 50);
            props.cadastro.setRazaoSocial(nome);
            props.cadastro.razaoSocial = nome;

            let fantasia = limitarTamanho(res.data.fantasia, 30);
            //let fantasia = res.data.fantasia;
            props.cadastro.setNomeFantasia(fantasia);
            props.cadastro.nomeFantasia = fantasia;
            
            let telefone = res.data.telefone.replace("/", "");
            telefone = limitarTamanho(telefone, 15);
            props.cadastro.setTelefone(telefone);
            props.cadastro.telefone = telefone;

            let email = limitarTamanho(res.data.email, 60);
            props.cadastro.setEmail(email);
            props.cadastro.email = email;
            //setAtividadesSecundarias(atvSecResp);
            //setSocios(sociosResp);
            //setSituacao(res.data.situacao);
            let bairro = limitarTamanho(res.data.bairro, 40);
            props.cadastro.endereco[0].setBairro(bairro);
            props.cadastro.endereco[0].bairro = bairro;

            let logradouro = limitarTamanho(res.data.logradouro, 40);
            props.cadastro.endereco[0].setEndereco(logradouro);
            props.cadastro.endereco[0].endereco = logradouro;

            let numero = limitarTamanho(res.data.numero, 6);
            props.cadastro.endereco[0].setNumero(numero);
            props.cadastro.endereco[0].numero = numero;

            let cep = res.data.cep.replace(".", "");
            cep = limitarTamanho(cep, 9);
            props.cadastro.endereco[0].setCep(cep);
            props.cadastro.endereco[0].cep = cep;

            let municipio = limitarTamanho(res.data.municipio, 40);
            props.cadastro.endereco[0].setCidade(municipio);
            props.cadastro.endereco[0].cidade = municipio;

            let uf = limitarTamanho(res.data.uf, 2);
            props.cadastro.endereco[0].setEstado(uf);
            props.cadastro.endereco[0].estado = uf;

            let complemento = limitarTamanho(res.data.complemento, 10);
            props.cadastro.endereco[0].setComplemento(complemento);
            props.cadastro.endereco[0].complemento = complemento;
            //setPorte(res.data.porte);
            //setAbertura(res.data.abertura);
            //setNaturezaJuridica(res.data.natureza_juridica);
            
            
            //setUltimaAtualizacao(res.data.ultima_atualizacao);
            //setTipo(res.data.tipo);
            //setEfr(res.data.efr);
            //setMotivoSituacao(res.data.motivo_situacao);
            //setSituacaoEspecial(res.data.situacao_especial);
            //setDataSituacaoEspecial(res.data.data_situacao_especial);
            //setCapitalSocial(res.data);
        })
        .catch((err) =>{
            console.log(err);
        });
    }

    const [cnpjOuCpf , setCnpjOuCpf] = useState("");
    const [cnpjOuCpfPicker , setCnpjOuCpfPicker] = useState("cnpj");
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        props.cadastro.setCnpjOuCpf = setCnpjOuCpf;
        if (typeof props.cadastro.cnpjOuCpf !== "undefined") setCnpjOuCpf(props.cadastro.cnpjOuCpf);
        else  props.cadastro.cnpjOuCpf = "";

        if (typeof props.cadastro.cnpjOuCpfPicker !== "undefined") setCnpjOuCpfPicker(props.cadastro.cnpjOuCpfPicker);
        else  props.cadastro.cnpjOuCpfPicker = "cnpj";
    }

    const cpfOuCnpjHandler = (val) => {

        if (cnpjOuCpfPicker === "cnpj") val = cnpjMask(val);
        if (cnpjOuCpfPicker === "cpf") val = cpfMask(val);

        setCnpjOuCpf(val);
        props.cadastro.cnpjOuCpf = val;
    }

    const cpfOuCnpjPickerHandler = (itemValue, itemIndex) => {

        setCnpjOuCpfPicker(itemValue);
        props.cadastro.cnpjOuCpfPicker = itemValue;
    }

    const focus = () => {
        if (typeof props.cadastro.setOpcoes !== "undefined") props.cadastro.setOpcoes([]);
    }

    return(
        <>

        <View style={styles.picker}>    
            <Text style={{textAlign:"center"}}>Selecione o formato da entrada:</Text>
            <Picker
                selectedValue={cnpjOuCpfPicker}
                //style={{marginLeft:100}}
                onValueChange={cpfOuCnpjPickerHandler}>
                <Picker.Item label="Cnpj" value="cnpj" />
                <Picker.Item label="Cpf" value="cpf" />
            </Picker>
        </View>

        <Input
            nome={"Cnpj ou Cpf"} 
            keyboardType='numeric'
            value={cnpjOuCpf} 
            onChangeText={cpfOuCnpjHandler}
            maxLength={20}
            onFocus={focus}
        />

        <Button
            title={"Buscar Cnpj"}
            onPress={buscarDados} 
        />
        </>
    )
}

const styles = StyleSheet.create({
    picker: {
        fontSize: 20,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: 60,
        marginRight: 60,
        marginBottom: 20
    }
})

export default InputCnpjOuCpf;