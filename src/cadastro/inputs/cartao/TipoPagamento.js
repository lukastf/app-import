
import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import Axios from 'axios';
import { serverUrl } from '../../../../server';
import AsyncStorage from '@react-native-community/async-storage';
import { View, StyleSheet, Text } from 'react-native';

const InputTipoPagamento = (props) => {

    let index = props.index;
    props = props.props;

    const [tipoPagamento , setTipoPagamento] = useState("");
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
            await AsyncStorage.setItem('tiposPagamento', jsonValue);

        } catch (e) {
          // saving error
        }
    }

    const getStored = async () => {

        try {

            const jsonValue = await AsyncStorage.getItem('tiposPagamento');
            let stored = JSON.parse(jsonValue);
        
            setOpcoes(loop(stored));

        } catch (e) {
            console.log(e);
        }
    }

    const getNet = () => {

        Axios.get(serverUrl + "/tiposPagamento/" + props.usuario._id + "/0/nome/$")
        .then((pages)=> {

            pages = pages.data;

            Axios.get(serverUrl + "/tiposPagamento/" + props.usuario._id + "/0/pageId/"+ pages[0] +"/nome/$")
            .then((res)=> {

                store(res.data);
                setOpcoes(loop(res.data));
            });
        });
    }

    const [check , setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        props.cadastro.adminCartao[index].setTipoPagamento = setTipoPagamento;

        if (typeof props.cadastro.adminCartao[index].tipoPagamento !== "undefined") 
            setTipoPagamento(props.cadastro.adminCartao[index].tipoPagamento);
        else props.cadastro.adminCartao[index].tipoPagamento = "";

        // sem internet
        getStored();

        /// com internet
        getNet();
    }

    const pickerHandler = (itemValue, itemIndex) => {

        setTipoPagamento(itemValue);
        props.cadastro.adminCartao[index].tipoPagamento = itemValue;
    }

    return(
        <>
        <Text style={styles.text}> Tipo de Pagamento </Text>
        <View style={styles.picker}>
            <Picker
                selectedValue={tipoPagamento}
                //style={{marginLeft:30}}
                onValueChange={pickerHandler}>
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

export default InputTipoPagamento;