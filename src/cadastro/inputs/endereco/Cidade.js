
import React, { useState } from 'react';
import Input from '../../../bases/Input';

const InputCidade = (props) => {

    let index = props.index;
    props = props.props;

    const [cidade , setCidade] = useState("");
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        props.cadastro.endereco[index].setCidade = setCidade;
        
        if (typeof props.cadastro.endereco[index].cidade !== "undefined") 
            setCidade(props.cadastro.endereco[index].cidade);
        else props.cadastro.endereco[index].cidade = "";
    }

    
    //props.cadastro.cidade = cidade;
    
    
    const handler = text => {
        
        setCidade(text);
        props.cadastro.endereco[index].cidade = text;
    }

    const blur = () => {

        setCidade(cidade.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());
    }

    return(
        <Input 
            nome={"Cidade"} 
            value={cidade}
            onChangeText={handler}
            onBlur={blur}
            maxLength={40}
        />
    );
}

export default InputCidade;