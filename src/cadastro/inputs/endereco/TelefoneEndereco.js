
import React, { useState } from 'react';
import Input from '../../../bases/Input';
import { celularMask } from '../../../bases/masks';

const InputTelefoneEndereco = (props) => {

    let index = props.index;
    props = props.props;

    const [telefone, setTelefone] = useState("");
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        props.cadastro.endereco[index].setTelefone = setTelefone;
        
        if (typeof props.cadastro.endereco[index].telefone !== "undefined") 
            setTelefone(props.cadastro.endereco[index].telefone);
        else props.cadastro.endereco[index].telefone = "";
    }
    
    const telefoneHandler = text => {
        
        let val = celularMask(text);

        setTelefone(val);
        props.cadastro.endereco[index].telefone = val;
    }

    return(
        <Input 
            nome={"Telefone Endereco"} 
            keyboardType='numeric'
            value={telefone}
            onChangeText={telefoneHandler}
            maxLength={14}
        />
    );
}

export default InputTelefoneEndereco;