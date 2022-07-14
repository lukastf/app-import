
import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import { View, StyleSheet, Text } from 'react-native';

const InputTipoEndereco = (props) => {

    let index = props.index;
    props = props.props;

    const [endereco , setEndereco] = useState("0");
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        props.cadastro.endereco[index].setTipoEndereco = setEndereco;
        
        if (typeof props.cadastro.endereco[index].tipoEndereco !== "undefined") 
            setEndereco(props.cadastro.endereco[index].tipoEndereco);
        else props.cadastro.endereco[index].tipoEndereco = "0";
    }
    
    const handler = (itemValue, itemIndex) => {
        
        setEndereco(itemValue);
        props.cadastro.endereco[index].tipoEndereco = itemValue;
    }

    return(
        <>
        <Text style={styles.text}> Tipo </Text>
        <View style={styles.picker}>
            <Picker
                selectedValue={endereco}
                //style={{marginLeft:60}}
                //itemStyle={{ fontSize:170 }}
                onValueChange={handler}>
                <Picker.Item label="" value="0" />
                <Picker.Item label="Residencial" value="1" />
                <Picker.Item label="Comercial" value="2" />
                <Picker.Item label="Cobrança" value="3" />
                <Picker.Item label="Produção" value="4" />
                <Picker.Item label="Filial" value="5" />
                <Picker.Item label="Seguro" value="6" />
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

export default InputTipoEndereco;