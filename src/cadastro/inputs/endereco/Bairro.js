
import React, { useState } from 'react';
import Input from '../../../bases/Input';

const InputBairro = (props) => {

    let index = props.index;
    props = props.props;

    const [bairro , setBairro] = useState("");
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        props.cadastro.endereco[index].setBairro = setBairro;
        if (typeof props.cadastro.endereco[index].bairro !== "undefined") setBairro(props.cadastro.endereco[index].bairro);
        else props.cadastro.endereco[index].bairro = "";
    }

    
    const handler = text => {
        
        setBairro(text);
        props.cadastro.endereco[index].bairro = text;
    }

    const blur = () => {

        setBairro(bairro.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());
    }

    return(
        <Input 
            nome={"Bairro"} 
            value={bairro}
            onChangeText={handler}
            onBlur={blur}
            maxLength={40}
        />
    );
}

export default InputBairro;