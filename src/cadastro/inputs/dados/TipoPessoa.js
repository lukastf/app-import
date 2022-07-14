
import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import { View, StyleSheet, Text } from 'react-native';

const InputTipoPessoa = (props) => {

    props = props.props;

    const [tipoPessoa , setTipoPessoa] = useState("1");
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        props.cadastro.setTipoPessoa = setTipoPessoa;
        if (typeof props.cadastro.tipoPessoa !== "undefined") setTipoPessoa(props.cadastro.tipoPessoa);
        else props.cadastro.tipoPessoa = "1";
    }
    
    const changeHandlerPicker = (itemValue, itemIndex) => {
        
        setTipoPessoa(itemValue);
        props.cadastro.tipoPessoa = itemValue;
    }

    return(
        <>
        <Text style={styles.text}> Tipo de Pessoa </Text>
        <View style={styles.picker}>
            <Picker
                selectedValue={tipoPessoa}
                //style={{marginLeft:10}}
                onValueChange={changeHandlerPicker}>
                <Picker.Item label="Pessoa Juridica" value="1" />
                <Picker.Item label="Pessoa Fisica" value="2" />
            </Picker>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    text: {
        marginTop: 20,
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

export default InputTipoPessoa;