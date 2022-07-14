
import React, { useState } from 'react';

import InputEndereco from '../inputs/endereco/Endereco';
import InputCep from '../inputs/endereco/Cep';
import InputTipoEndereco from '../inputs/endereco/TipoEndereco';
import InputLogradouro from '../inputs/endereco/Logradouro';
import InputNumeroEndereco from '../inputs/endereco/NumeroEndereco';
import InputComplemento from '../inputs/endereco/Complemento';
import InputBairro from '../inputs/endereco/Bairro';
import InputCidade from '../inputs/endereco/Cidade';
import InputTelefoneEndereco from '../inputs/endereco/TelefoneEndereco';
import InputEstado from '../inputs/endereco/Estado';

import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Endereco = (props) => {

    props = props.props;

    const [enderecos, setEnderecos] = useState([]);
    const [enderecosRender, setEnderecosRender] = useState();

    /*const [check, setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        props.cadastro.endereco = [];
    }*/

    const endereco = (onPress, icon, index) => {

        if (typeof props.cadastro.endereco[index] === "undefined") 
        props.cadastro.endereco[index] = {};

        return(
        <View style={styles.border}>

            <View style={styles.alignCenterContent}>
                <Text style={styles.title}>Endereco</Text>
                <TouchableOpacity
                    //id={0}
                    style={styles.button}
                    onPress={onPress}
                >
                    <FontAwesomeIcon icon={icon} />
                </TouchableOpacity>
            </View>

            <InputTipoEndereco 
                props={props} 
                index={index}
            />
            <InputCep 
                props={props} 
                index={index}
            />
            <InputLogradouro 
                props={props} 
                index={index}
            />
            <InputEndereco 
                props={props} 
                index={index}
            />
            <InputNumeroEndereco 
                props={props} 
                index={index}
            />
            <InputComplemento 
                props={props}
                index={index}
            />
            <InputBairro 
                props={props}
                index={index}
            />
            <InputCidade 
                props={props}
                index={index}
            />
            <InputTelefoneEndereco 
                props={props}
                index={index}
            />
            <InputEstado 
                props={props}
                index={index}
            />
        </View>
        );
    }

    const removeEndereco = () => {

        let tmp = enderecos;

        props.cadastro.endereco.pop();
        tmp.pop();

        setEnderecos(tmp);
        setEnderecosRender(<View>{enderecos}</View>);
    }

    const addEndereco = () => {

        let tmp = enderecos;
        let index = enderecos.length + 1;

        tmp.push(endereco(removeEndereco, faTrash, index));

        setEnderecos(tmp);
        setEnderecosRender(<View>{enderecos}</View>);
    }

    const [check, setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        let hugo = props.cadastro.endereco.length -1;

        for (let index = 0; index < hugo; index++) {

            addEndereco();
        }
    }

    return(
        <>
        {endereco(addEndereco, faPlus, 0)}
        {enderecosRender}
        </>
    )
}

const styles = StyleSheet.create({

    border: {
        borderWidth: 2, 
        borderStyle: "solid", 
        marginRight: 20, 
        marginLeft: 20,
        marginTop: 40,
        marginBottom: 40
    },
    title: {
        marginRight: 80,
        marginTop: 18,
        fontSize: 26
    },
    button: {
        width: 60,
        backgroundColor: "#2196f3",
        padding: 20,
        marginBottom:20,
    },
    alignCenterContent: {
        flex:1,
        flexDirection:"row",
        justifyContent: "flex-end"
    }
});

export default Endereco;