
import React, { useState } from 'react';
import { cnpjMask, cpfMask } from '../../../bases/masks';
import { Picker } from '@react-native-community/picker';
import { Text, Button, StyleSheet, View } from 'react-native';
import Input from '../../../bases/Input';
import Axios from 'axios';
import { serverUrl } from '../../../../server';

const InputCnpjOuCpfConta = (props) => {

    props = props.props;

    const [cnpjOuCpf , setCnpjOuCpf] = useState("");
    const [cnpjOuCpfPicker , setCnpjOuCpfPicker] = useState("cnpj");
    const [check, setCheck] = useState(false);
    const [opcoes, setOpcoes] = useState([]);

    const sugestoesHandler = (cnpjOuCpfConta) => {

        setCnpjOuCpf(cnpjOuCpfConta);
        props.cadastro.cnpjOuCpf = cnpjOuCpfConta;
        setOpcoes([]);
    }

    const loop = (data) => {

        let temp = [];

        data.forEach(element => {
            temp.push(
            <Text 
                onPress={() => sugestoesHandler(element.cnpjOuCpfConta)}
                style={styles.text}
            >
                {element.cnpjOuCpfConta}
            </Text>
            );
        });

        return temp;
    }

    const getSugestoes = (pesquisa) => {
        
        if (pesquisa === "") {
            setOpcoes([]);
            return;
        }

        Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/cnpjOuCpfConta/"+ pesquisa)
        .then((pages)=> {

            pages = pages.data;

            Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/pageId/"+ pages[0] +"/cnpjOuCpfConta/" + pesquisa)
            .then((res)=> {

                props.cadastro.setOpcoes = setOpcoes;
                setOpcoes(loop(res.data));
            })
            .catch(() =>{
                setOpcoes([]);
            });
        });
    }
    
    if(!check) {
        
        setCheck(true);
        
        props.cadastro.setCnpjOuCpfConta = setCnpjOuCpf;
        if (typeof props.cadastro.cnpjOuCpfConta !== "undefined") setCnpjOuCpf(props.cadastro.cnpjOuCpfConta);
        else props.cadastro.cnpjOuCpfConta = "";

        if (typeof props.cadastro.cnpjOuCpfContaPicker !== "undefined") setCnpjOuCpfPicker(props.cadastro.cnpjOuCpfContaPicker);
        else props.cadastro.cnpjOuCpfContaPicker = "cnpj";
    }

    const cpfOuCnpjHandler = (val) => {

        if (cnpjOuCpfPicker === "cnpj") val = cnpjMask(val);
        if (cnpjOuCpfPicker === "cpf") val = cpfMask(val);

        setCnpjOuCpf(val);
        props.cadastro.cnpjOuCpfConta = val;

        getSugestoes(val);
    }

    const cpfOuCnpjPickerHandler = (itemValue, itemIndex) => {

        setCnpjOuCpfPicker(itemValue);
        props.cadastro.cnpjOuCpfContaPicker = itemValue;
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
            nome={"Cnpj ou Cpf Conta"} 
            keyboardType='numeric'
            value={cnpjOuCpf} 
            onChangeText={cpfOuCnpjHandler}
            maxLength={20}
            onFocus={focus}
        />
        {opcoes}
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
        marginBottom: 20,
        marginTop: 20
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
        marginLeft: 60
    }
})

export default InputCnpjOuCpfConta;