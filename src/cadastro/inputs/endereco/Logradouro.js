
import React, { useState } from 'react';
import Input from '../../../bases/Input';
import { Picker } from '@react-native-community/picker';
import { StyleSheet, View, Text } from 'react-native';

const InputLogradouro = (props) => {

    let index = props.index;
    props = props.props;

    const [logradouro , setLogradouro] = useState("");
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        props.cadastro.endereco[index].setLogradouro = setLogradouro;
        
        if (typeof props.cadastro.endereco[index].logradouro !== "undefined") 
            setLogradouro(props.cadastro.endereco[index].logradouro);
        else props.cadastro.endereco[index].logradouro = "";
    }
    
    const handler = (itemValue, itemIndex) =>{
        
        setLogradouro(itemValue);
        props.cadastro.endereco[index].logradouro = itemValue;
    }

    return(
        <>
        <Text style={styles.text}> Logradouro </Text>
        <View style={styles.picker}>
            <Picker
                selectedValue={logradouro}
                //style={{marginLeft:60}}
                //itemStyle={{ fontSize:170 }}
                onValueChange={handler}>
                <Picker.Item label="" value="" />
                <Picker.Item label="R." value="R." />
                <Picker.Item label="Av." value="AV." />
                <Picker.Item label="Prc" value="PRC" />
                <Picker.Item label="Rod" value="ROD" />
                <Picker.Item label="Est" value="EST" />
                {/*<Input 
                    nome={"Logradouro"} 
                    value={logradouro}
                    onChangeText={handler}
                />*/}
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

export default InputLogradouro;