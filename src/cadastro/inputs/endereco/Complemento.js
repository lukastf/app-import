
import React, { useState } from 'react';
import Input from '../../../bases/Input';

const InputComplemento = (props) => {

    let index = props.index;
    props = props.props;

    const [complemento , setComplemento] = useState("");
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        props.cadastro.endereco[index].setComplemento = setComplemento;
        
        if (typeof props.cadastro.endereco[index].complemento !== "undefined") 
            setComplemento(props.cadastro.endereco[index].complemento);
        else props.cadastro.endereco[index].complemento = "";
    }
    
    const handler = text => {
        
        setComplemento(text);
        props.cadastro.endereco[index].complemento = text;
    }

    const blur = () => {

        setComplemento(complemento.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());
    }

    return(
        <Input 
            nome={"Complemento"} 
            value={complemento}
            onChangeText={handler}
            onBlur={blur}
            maxLength={10}
        />
    );
}

export default InputComplemento;