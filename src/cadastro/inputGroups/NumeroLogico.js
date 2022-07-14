
import React, { useState } from 'react';

import InputNumeroLogico from '../inputs/numeroLogico/NumeroLogico';
import InputOrigem from '../inputs/numeroLogico/Origem';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const NumeroLogico = (props) => {

    props = props.props;

    const [numerosLogicos, setNumerosLogicos] = useState([]);
    const [numerosLogicoRender, setNumerosLogicosRender] = useState();

    /*const [check, setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        props.cadastro.numeroLogico = [];
    }*/

    const numeroLogico = (onPress, icon, index) => {

        if (typeof props.cadastro.numeroLogico[index] === "undefined") 
        props.cadastro.numeroLogico[index] = {};

        return(
        <View style={styles.border}>
            <View style={styles.alignCenterContent}>
                <Text style={styles.title}>Numero Logico</Text>
                <TouchableOpacity
                    //id={0}
                    style={styles.button}
                    onPress={onPress}
                >
                    <FontAwesomeIcon icon={icon} />
                </TouchableOpacity>
            </View>
            <InputNumeroLogico 
                props={props}
                index={index}
            />
            <InputOrigem 
                props={props}
                index={index}
            />
        </View>
        );
    }

    const removeNumeroLogico = () => {

        let tmp = numerosLogicos;

        props.cadastro.numeroLogico.pop();
        tmp.pop();

        setNumerosLogicos(tmp);
        setNumerosLogicosRender(<View>{numerosLogicos}</View>);
    }

    const addNumeroLogico = () => {

        let tmp = numerosLogicos;
        let index = numerosLogicos.length + 1;

        tmp.push(numeroLogico(removeNumeroLogico, faTrash, index));

        setNumerosLogicos(tmp);
        setNumerosLogicosRender(<View>{numerosLogicos}</View>);
    }

    const [check, setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        let hugo = props.cadastro.numeroLogico.length -1;

        for (let index = 0; index < hugo; index++) {

            addNumeroLogico();
        }
    }

    return(
        <>
        {numeroLogico(addNumeroLogico, faPlus, 0)}
        {numerosLogicoRender}
        </>
    );
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
        //textAlign: "center", 
        marginRight: 50,
        marginTop: 18,
        //marginRight: 160,
        fontSize: 26
    },
    button: {
        width: 60,
        //alignSelf: "flex-end",
        //marginRight: 30,
        backgroundColor: "#2196f3",
        padding: 20,
        marginBottom:20,
        //marginRight: 100
    },
    alignCenterContent: {
        flex:1,
        flexDirection:"row",
        //alignItems: "flex-end",
        justifyContent: "flex-end"
    }
});

export default NumeroLogico;