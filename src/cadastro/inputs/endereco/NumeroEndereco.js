
import React, { useState } from 'react';
import Input from '../../../bases/Input';
import { numberMask } from '../../../bases/masks';

const InputNumeroEndereco = (props) => {

    let index = props.index;
    props = props.props;

    const [numero , setNumero] = useState("");
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        props.cadastro.endereco[index].setNumero = setNumero;
        
        if (typeof props.cadastro.endereco[index].numero !== "undefined") 
            setNumero(props.cadastro.endereco[index].numero);
        else props.cadastro.endereco[index].numero = "";
    }
    
    
    const numeroHandler = text => {

        let val = numberMask(text);
        
        setNumero(val);
        props.cadastro.endereco[index].numero = val;
    }

    return(
        <Input 
            nome={"Numero Endereco"} 
            keyboardType='numeric'
            value={numero}
            onChangeText={numeroHandler}
            maxLength={6}
        />
    );
}

export default InputNumeroEndereco;