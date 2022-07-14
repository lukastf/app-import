
import React, { useState } from 'react';
import Input from '../../../bases/Input';
import { numberMask } from '../../../bases/masks';

const InputNumeroLogico = (props) => {

    let index = props.index;
    props = props.props;

    const [numero , setNumero] = useState("");
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        props.cadastro.numeroLogico[index].setNumeroLogico = setNumero;
        
        if (typeof props.cadastro.numeroLogico[index].numeroLogico !== "undefined") 
            setNumero(props.cadastro.numeroLogico[index].numeroLogico);
        else props.cadastro.numeroLogico[index].numeroLogico = "";
    }
    
    const numeroHandler = text => {

        let val = numberMask(text);
        
        setNumero(val);
        props.cadastro.numeroLogico[index].numeroLogico = val;
    }

    return(
        <Input 
            nome={"Numero Logico"} 
            keyboardType='numeric'
            value={numero}
            onChangeText={numeroHandler}
            maxLength={15}
        />
    );
}

export default InputNumeroLogico;