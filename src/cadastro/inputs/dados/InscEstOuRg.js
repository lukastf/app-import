import React, { useState } from "react";
import { Text, StyleSheet, View } from 'react-native';
import { Picker } from "@react-native-community/picker";
import Input from "../../../bases/Input";


const InputInscEstOuRg = (props) => {
    
    props = props.props;

    const [inscEstOuRg , setInscEstOuRg] = useState("");
    const [inscEstOuRgPicker , setInscEstOuRgPicker] = useState("isncricaoEstadual");
    //const inscEstOuRgHandler = text => setInscEstOuRg(text);
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        props.cadastro.setInscEstOuRg = setInscEstOuRg;
        if (typeof props.cadastro.inscEstOuRg !== "undefined") setInscEstOuRg(props.cadastro.inscEstOuRg);
        else  props.cadastro.inscEstOuRg = "";

        if (typeof props.cadastro.inscEstOuRgPicker !== "undefined") setInscEstOuRgPicker(props.cadastro.inscEstOuRgPicker);
        else  props.cadastro.inscEstOuRgPicker = "isncricaoEstadual";
    }

    
    const inscEstOuRgHandler = (text) => {
        
        //if (cnpjOuCpfPicker === "inscricaoEstadual") val = val;
        if (inscEstOuRgPicker === "rg") text = rgMask(text);
        
        setInscEstOuRg(text);
        props.cadastro.inscEstOuRg = text;
    }

    const inscEstOuRgPickerHandler = (itemValue, itemIndex) => {

        setInscEstOuRgPicker(itemValue);
        props.cadastro.inscEstOuRgPicker = itemValue;
    }

    const focus = () => {
        if (typeof props.cadastro.setOpcoes !== "undefined") props.cadastro.setOpcoes([]);
    }

    return(
        <>
        <View style={styles.picker}>
            <Text style={{textAlign:"center"}}>Selecione o formato da entrada:</Text>
            <Picker
                selectedValue={inscEstOuRgPicker}
                //style={{textAlign:60}}
                onValueChange={inscEstOuRgPickerHandler}>
                <Picker.Item label="Inscricao Estadual" value="isncricaoEstadual" />
                <Picker.Item label="Rg" value="rg" />
            </Picker>
        </View>

        <Input 
            nome={"Inscricao Estadual ou Rg"} 
            value={inscEstOuRg}
            onChangeText={inscEstOuRgHandler}
            maxLength={20}
            onFocus={focus}
        />
        </>
    )
}

const styles = StyleSheet.create({
    picker: {
        fontSize: 20,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: 60,
        marginRight: 60,
        marginBottom: 20,
        marginTop: 20
    }
})

export default InputInscEstOuRg;