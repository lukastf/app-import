
import React, { useState } from 'react';
import Input from '../../../bases/Input';
import { moneyMask } from '../../../bases/masks';

const InputValor = (props) => {

    let index = props.index;
    props = props.props;

    const [valor , setValor] = useState("");
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        props.cadastro.agenda[index].setValor = setValor;

        if (typeof props.cadastro.agenda[index].valor !== "undefined") 
            setValor(props.cadastro.agenda[index].valor);
        else props.cadastro.agenda[index].valor = "";
    }
    
    const valorHandler = text => {

        let val = moneyMask(text);
        
        setValor(val);
        props.cadastro.agenda[index].valor = val;
    }

    return(
        <Input 
            nome={"Valor"} 
            keyboardType='numeric'
            value={valor}
            onChangeText={valorHandler}
            maxLength={15}
        />
    );
}

export default InputValor;