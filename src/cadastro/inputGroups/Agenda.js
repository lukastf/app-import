
import React, { useState } from 'react';

import InputTipoOperacao from '../inputs/agenda/TipoOperacao';
import InputTipoDocumento from '../inputs/agenda/TipoDocumento';
import InputDataInicio from '../inputs/agenda/DataInicio';
import InputDataFim from '../inputs/agenda/DataFim';
import InputValor from '../inputs/agenda/Valor';
import InputFrequencia from '../inputs/agenda/Frequencia';
import InputObservacaoAgenda from '../inputs/agenda/ObservacaoAgenda';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const Agenda = (props) => {

    props = props.props;

    const [agendas, setAgendas] = useState([]);
    const [agendasRender, setAgendasRender] = useState();

    //if (typeof props.cadastro.agenda[index] === "undefined") 
    //props.cadastro.agenda[index] = {};

    /*const [check, setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        props.cadastro.agenda = [];
    }*/

    const agenda = (onPress, icon, index) => {

        if (typeof props.cadastro.agenda[index] === "undefined") 
        props.cadastro.agenda[index] = {};

        return(
        <View style={styles.border}>

            <View style={styles.alignCenterContent}>
                <Text style={styles.title}>Agenda</Text>
                <TouchableOpacity
                    //id={0}
                    style={styles.button}
                    onPress={onPress}
                >
                    <FontAwesomeIcon icon={icon} />
                </TouchableOpacity>
            </View>

            <InputTipoOperacao 
                props={props} 
                index={index}
            />
            <InputTipoDocumento 
                props={props} 
                index={index}
            />
            <InputDataInicio 
                props={props} 
                index={index}
            />
            <InputDataFim 
                props={props} 
                index={index}
            />
            <InputValor 
                props={props} 
                index={index}
            />
            <InputFrequencia 
                props={props} 
                index={index}
            />
            <InputObservacaoAgenda 
                props={props} 
                index={index}
            />
        </View>
        );
    }

    const removeAgenda = () => {

        let tmp = agendas;

        props.cadastro.agenda.pop();
        tmp.pop();

        setAgendas(tmp);
        setAgendasRender(<View>{agendas}</View>);
    }

    const addAgenda = () => {

        let tmp = agendas;
        let index = agendas.length + 1;

        tmp.push(agenda(removeAgenda, faTrash, index));

        setAgendasRender(tmp);
        setAgendasRender(<View>{agendas}</View>);
    }

    const [check, setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        let hugo = props.cadastro.agenda.length -1;

        for (let index = 0; index < hugo; index++) {

            addAgenda();
        }
    }

    return (
        <>    
            {agenda(addAgenda, faPlus, 0)}
            {agendasRender}
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
        marginBottom: 40,
        paddingBottom: 20
    },
    title: {
        //textAlign: "center", 
        marginRight: 80,
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

export default Agenda;