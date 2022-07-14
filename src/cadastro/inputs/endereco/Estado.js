
import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import { View, StyleSheet, Text } from 'react-native';

const InputEstado = (props) => {

    let index = props.index;
    props = props.props;

    const [estado , setEstado] = useState("");
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        props.cadastro.endereco[index].setEstado = setEstado;
        
        if (typeof props.cadastro.endereco[index].estado !== "undefined") 
            setEstado(props.cadastro.endereco[index].estado);
        else props.cadastro.endereco[index].estado = "";
    }
    
    const handler = (itemValue, itemIndex) => {
        
        setEstado(itemValue);
        props.cadastro.endereco[index].estado = itemValue;
    }

    return(
        <>
        <Text style={styles.text}> Estado </Text>
        <View style={styles.picker}>
            <Picker
                selectedValue={estado}
                //style={{marginLeft:60}}
                //itemStyle={{ fontSize:170 }}
                onValueChange={handler}>
                <Picker.Item label="" value="" />
                <Picker.Item label="Acre" value="AC" />
                <Picker.Item label="Alagoas" value="AL" />
                <Picker.Item label="Amapá" value="AP" />
                <Picker.Item label="Amazonas" value="AM" />
                <Picker.Item label="Bahia" value="BA" />
                <Picker.Item label="Ceará" value="CE" />
                <Picker.Item label="Distrito Federal" value="DF" />
                <Picker.Item label="Espírito Santo" value="ES" />
                <Picker.Item label="Goiás" value="GO" />
                <Picker.Item label="Maranhão" value="MA" />
                <Picker.Item label="Mato Grosso" value="MT" />
                <Picker.Item label="Mato Grosso do Sul" value="MS" />
                <Picker.Item label="Minas Gerais" value="MG" />
                <Picker.Item label="Pará" value="PA" />
                <Picker.Item label="Paraíba" value="PB" />
                <Picker.Item label="Paraná" value="PR" />
                <Picker.Item label="Pernambuco" value="PE" />
                <Picker.Item label="Piauí" value="PI" />
                <Picker.Item label="Rio de Janeiro" value="RJ" />
                <Picker.Item label="Rio Grande do Norte" value="RN" />
                <Picker.Item label="Rio Grande do Sul" value="RS" />
                <Picker.Item label="Rondônia" value="RO" />
                <Picker.Item label="Roraima" value="RR" />
                <Picker.Item label="Santa Catarina" value="SC" />
                <Picker.Item label="São Paulo" value="SP" />
                <Picker.Item label="Sergipe" value="SE" />
                <Picker.Item label="Tocantins" value="TO" />
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

export default InputEstado;