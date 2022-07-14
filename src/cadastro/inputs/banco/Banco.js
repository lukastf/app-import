
import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import Axios from 'axios';
import { serverUrl } from '../../../../server';
import AsyncStorage from '@react-native-community/async-storage';
import InputPickerGet from '../../../bases/PickerGet';
import { View, StyleSheet, Text } from 'react-native';

const InputBanco = (props) => {

    props = props.props;

    const [banco , setBanco] = useState("");
    const [opcoes , setOpcoes] = useState([]);

    //props.cadastro.banco = banco;
    //props.cadastro.setBanco = setBanco;

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
            await AsyncStorage.setItem('bancos', jsonValue);

        } catch (e) {
          // saving error
        }
    }

    const getStored = async () => {

        try {

            const jsonValue = await AsyncStorage.getItem('bancos');
            let stored = JSON.parse(jsonValue);
        
            setOpcoes(loop(stored));

        } catch (e) {
            console.log(e);
        }
    }

    const getNet = () => {

        Axios.get(serverUrl + "/bancos/" + props.usuario._id + "/0/nome/$")
        .then((pages)=> {

            pages = pages.data;

            Axios.get(serverUrl + "/bancos/" + props.usuario._id + "/0/pageId/"+ pages[0] +"/nome/$")
            .then((res)=> {

                store(res.data);
                setOpcoes(loop(res.data));
            });
        });
    }

    const [check , setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        props.cadastro.setBanco = setBanco;

        if (typeof props.cadastro.banco !== "undefined") 
            setBanco(props.cadastro.banco);
        else props.cadastro.banco = "";

        // sem internet
        getStored();

        /// com internet
        getNet();
    }

    const bancoHandler = (itemValue, itemIndex) => {

        setBanco(itemValue);
        props.cadastro.banco = itemValue;
    }

    return(
        <>
        <Text style={styles.text}> Banco </Text>
        <View style={styles.picker}>
            <Picker
                selectedValue={banco}
                //style={{marginLeft:60}}
               
                onValueChange={bancoHandler}>
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
})

export default InputBanco;