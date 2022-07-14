
import React, { useState } from 'react';
import Input from '../../../bases/Input';
import { moneyMask } from '../../../bases/masks';

const InputValorDocumento = (props) => {

    props = props.props;

    const [valorDoc , setValorDoc] = useState("");
    const [check , setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        props.cadastro.setValorDoc = setValorDoc;

        if (typeof props.cadastro.valorDoc !== "undefined") 
            setValorDoc(props.cadastro.valorDoc);
        else props.cadastro.valorDoc = "";
    }

    const numeroHandler = text => {
        
        let val = moneyMask(text);

        setValorDoc(val);
        props.cadastro.valorDoc = val;
    }

    const focus = () => {
        if (typeof props.cadastro.setOpcoes !== "undefined") props.cadastro.setOpcoes([]);
    }

    return(
        <Input 
            nome={"Valor do Documento"} 
            keyboardType='numeric'
            value={valorDoc}
            onChangeText={numeroHandler}
            maxLength={11}
            onFocus={focus}
        />
    );
}

export default InputValorDocumento;