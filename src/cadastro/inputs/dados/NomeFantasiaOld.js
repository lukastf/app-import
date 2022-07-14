
import React, { useState, useRef, useEffect } from 'react';
import Input from '../../../bases/Input';

const InputNomeFantasia = (props) => {

    props = props.props;

    const [nomeFantasia , setNomeFantasia] = useState("");
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        props.cadastro.setNomeFantasia = setNomeFantasia;
        if (typeof props.cadastro.nomeFantasia !== "undefined") setNomeFantasia(props.cadastro.nomeFantasia);
        else  props.cadastro.nomeFantasia = "";
    }

    
    const nomeFantasiaHandler = text => {

        //text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
        
        setNomeFantasia(text);
        props.cadastro.nomeFantasia = text;
    }

    const blur = () => {

        //let h = razaoSocial;

        setNomeFantasia(nomeFantasia.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());
    }

    return(
        <Input 
            nome={"Nome Fantasia"} 
            value={nomeFantasia}
            onChangeText={nomeFantasiaHandler}
            maxLength={30}
            onBlur={blur}
        />
    );
}

export default InputNomeFantasia;