
import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import { StyleSheet, View, Text } from 'react-native';

const InputFrequencia = (props) => {

    let index = props.index;
    props = props.props;

    const [frequencia , setFrequencia] = useState("0");
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        props.cadastro.agenda[index].setFrequencia = setFrequencia;
        if (typeof props.cadastro.agenda[index].frequencia !== "undefined") setFrequencia(props.cadastro.agenda[index].frequencia);
        else props.cadastro.agenda[index].frequencia = "0";
    }

    
    const changeHandlerPicker = (itemValue, itemIndex) => {
        
        setFrequencia(itemValue)
        props.cadastro.agenda[index].frequencia = itemValue;
    }

    return(
        <>
        <Text style={styles.text}> Frequencia </Text>
        <View style={styles.picker}>
            <Picker
                selectedValue={frequencia}
                //style={{marginLeft:60}}
                //itemStyle={{ fontSize:170 }}
                onValueChange={changeHandlerPicker}>
                <Picker.Item label="" value="0" />
                <Picker.Item label="Fechamento" value="1" />
                <Picker.Item label="Mensal" value="2" />
                <Picker.Item label="Bimestral" value="3" />
                <Picker.Item label="Semestral" value="4" />
                <Picker.Item label="Anual" value="5" />
                <Picker.Item label="Unica" value="6" />
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

export default InputFrequencia;