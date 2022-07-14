
import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import { StyleSheet, View, Text } from 'react-native';

const InputTipoConta = (props) => {

    props = props.props;

    const [tipoConta , setTipoConta] = useState("1");
    const [check , setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        props.cadastro.setTipoConta = setTipoConta;

        if (typeof props.cadastro.tipoConta !== "undefined") 
            setTipoConta(props.cadastro.tipoConta);
        else props.cadastro.tipoConta = "1";
    }    
    
    const handler = (itemValue, itemIndex) => {
        
        setTipoConta(itemValue);
        props.cadastro.tipoConta = itemValue;
    }

    return(
        <>
        <Text style={styles.text}> Tipo de Conta </Text>
        <View style={styles.picker}>
            <Picker
                selectedValue={tipoConta}
                //style={{marginLeft:60}}
                //itemStyle={{ fontSize:170 }}
                onValueChange={handler}>
                <Picker.Item label="Conta Corrente" value="1" />
                <Picker.Item label="Conta Poupança" value="2" />
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

export default InputTipoConta;