
import React, { useState } from 'react';
import InputRamoAtividade from '../inputs/ramoAtividade/RamoAtividade';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const RamoAtividade = (props) => {

    props = props.props;

    const [ramosAtividade, setRamosAtividade] = useState([]);
    const [ramosAtividadeRender, setRamosAtividadeRender] = useState();

    const ramoAtividade = (onPress, icon, index) => {

        if (typeof props.cadastro.ramoAtividade[index] === "undefined") 
        props.cadastro.ramoAtividade[index] = {};

        return(
            <View style={styles.border}>
                <View style={styles.alignCenterContent}>
                    <Text style={styles.title}>Ramo de Atividade</Text>
                    <TouchableOpacity
                        //id={0}
                        style={styles.button}
                        onPress={onPress}
                    >
                        <FontAwesomeIcon icon={icon} />
                    </TouchableOpacity>
                </View>
                <InputRamoAtividade props={props} index={index}/>
            </View>
        );

        /*
        return (
        <View style={styles.ramoAtividadeContent}>
            <InputRamoAtividade props={props} index={index}/>
            <TouchableOpacity
                style={styles.button}
                onPress={onPress}
            >
                <FontAwesomeIcon icon={icon} />
            </TouchableOpacity>
        </View>
        );*/
    }

    const removeRamoAtividade = () => {

        let ra = ramosAtividade;

        props.cadastro.ramoAtividade.pop();
        ra.pop();

        setRamosAtividade(ra);
        setRamosAtividadeRender(<View>{ramosAtividade}</View>);
    }

    const addRamoAtividade = () => {

        let tmp = ramosAtividade;
        let index = ramosAtividade.length + 1;
        
        tmp.push(ramoAtividade(removeRamoAtividade, faTrash, index));

        setRamosAtividade(tmp);
        setRamosAtividadeRender(<View>{ramosAtividade}</View>);
    }

    /*
    const [check, setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        props.cadastro.ramoAtividade = [];
        //props.cadastro.setRamoAtividade = [];
    }*/

    const [check, setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        let hugo = props.cadastro.ramoAtividade.length -1;

        for (let index = 0; index < hugo; index++) {

            addRamoAtividade();
        }
    }

    return(
        <>
            {ramoAtividade(addRamoAtividade, faPlus, 0)}
            {ramosAtividadeRender}
        </>
    );
}

/*
const styles = StyleSheet.create({
    button: {
        width: 60,
        alignSelf: "flex-end",
        marginRight: 30,
        backgroundColor: "#2196f3",
        padding: 20,
        marginBottom:20,
        marginRight: 100
    },
    ramoAtividadeContent: {
        flex:1,
        flexDirection:"row",
        alignItems: "center",
        justifyContent: "center",
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: 60,
        marginRight: 60,
        marginBottom: 20,
        marginTop: 20
    }
  });*/

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
        marginRight: 10,
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

export default RamoAtividade;