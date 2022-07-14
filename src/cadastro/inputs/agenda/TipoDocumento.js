
import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import Axios from 'axios';
import { serverUrl } from '../../../../server';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, View, Text } from 'react-native';

const InputTipoDocumento = (props) => {

    let index = props.index;
    props = props.props;

    const [tipoDocumento , setTipoDocumento] = useState("");
    const [opcoes , setOpcoes] = useState([]);

    const loop = (data) => {

        let temp = [<Picker.Item label="" value="" />];

        data.forEach(element => {
            temp.push(<Picker.Item label={element.nome} value={element.idOrg} />);
        });

        return temp;
    }

    const store = async (data) => {

        try {
            const jsonValue = JSON.stringify(data);
            await AsyncStorage.setItem('tiposDocumento', jsonValue);

        } catch (e) {
          // saving error
        }
    }

    const getStored = async () => {

        try {

            const jsonValue = await AsyncStorage.getItem('tiposDocumento');
            let stored = JSON.parse(jsonValue);
        
            setOpcoes(loop(stored));

        } catch (e) {
            console.log(e);
        }
    }

    const getNet = () => {

        Axios.get(serverUrl + "/tiposDocumento/" + props.usuario._id + "/0/nome/$")
        .then((pages)=> {

            pages = pages.data;

            Axios.get(serverUrl + "/tiposDocumento/" + props.usuario._id + "/0/pageId/"+ pages[0] +"/nome/$")
            .then((res)=> {

                store(res.data);
                setOpcoes(loop(res.data));
            });
        });
    }

    const [check , setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        //props.cadastro.setObservacaoAgenda = setObservacaoAgenda;
        props.cadastro.agenda[index].setTipoDocumento = setTipoDocumento;

        if (typeof props.cadastro.agenda[index].tipoDocumento !== "undefined") 
            setTipoDocumento(props.cadastro.agenda[index].tipoDocumento);
        else props.cadastro.agenda[index].tipoDocumento = "";

        // sem internet
        getStored();

        /// com internet
        getNet();
    }

    const changePicker = (itemValue, itemIndex) => {

        setTipoDocumento(itemValue);
        props.cadastro.agenda[index].tipoDocumento = itemValue;
    }

    return(
        <>
        <Text style={styles.text}> Tipo de Documento </Text>
        <View style={styles.picker}>
            <Picker
                selectedValue={tipoDocumento}
                //style={{marginLeft:30}}
                //itemStyle={{ fontSize:170 }}
                onValueChange={changePicker}>
                {opcoes}
            </Picker>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: "center"
    },
    picker: {
        fontSize: 20,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: 60,
        marginRight: 60,
        marginBottom: 20,
        //marginTop: 20
    }
});

export default InputTipoDocumento;