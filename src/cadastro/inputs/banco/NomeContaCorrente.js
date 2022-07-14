
import React, { useState } from 'react';
import Input from '../../../bases/Input';

const InputNomeContaCorrente = (props) => {

    props = props.props;

    const [nome , setNome] = useState("");
    const [check , setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        props.cadastro.setNomeConta = setNome;

        if (typeof props.cadastro.nomeConta !== "undefined") 
            setNome(props.cadastro.nomeConta);
        else props.cadastro.nomeConta = "";
    }
    
    const nomeHandler = text => {
        
        setNome(text);
        props.cadastro.nomeConta = text;
    }

    const blur = () => {

        setNome(nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());
    }

    const focus = () => {
        if (typeof props.cadastro.setOpcoes !== "undefined") props.cadastro.setOpcoes([]);
    }

    return(
        <Input 
            nome={"Nome Conta Corrente"} 
            value={nome}
            onChangeText={nomeHandler}
            maxLength={50}
            onBlur={blur}
            onFocus={focus}
        />
    );
}

export default InputNomeContaCorrente;