
import React, { useState } from 'react';
import Input from '../../../bases/Input';

const InputEndereco = (props) => {

    let index = props.index;
    props = props.props;

    const [endereco , setEndereco] = useState("");
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        props.cadastro.endereco[index].setEndereco = setEndereco;
        
        if (typeof props.cadastro.endereco[index].endereco !== "undefined") 
            setEndereco(props.cadastro.endereco[index].endereco);
        else props.cadastro.endereco[index].endereco = "";
    }
    
    const handler = text => {
        
        setEndereco(text);
        props.cadastro.endereco[index].endereco = text;
    }

    const blur = () => {

        setEndereco(endereco.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());
    }

    return(
        <Input 
            nome={"Endereco"} 
            value={endereco}
            onChangeText={handler}
            onBlur={blur}
            maxLength={40}
        />
    );
}

export default InputEndereco;