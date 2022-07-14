
import React, { useState } from 'react';
import Input from '../../../bases/Input';

const InputRazaoSocial = (props) => {

    props = props.props;

    const [razaoSocial , setRazaoSocial] = useState("");
    const [check, setCheck] = useState(false);
    
    if(!check) {
        
        setCheck(true);
        
        props.cadastro.setRazaoSocial = setRazaoSocial;
        if (typeof props.cadastro.razaoSocial !== "undefined") setRazaoSocial(props.cadastro.razaoSocial);
        else  props.cadastro.razaoSocial = "";
    }
    
    const razaoSocialHandler = text => {

        //text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        setRazaoSocial(text);
        props.cadastro.razaoSocial = text;
    }

    const blur = () => {

        //let h = razaoSocial;

        setRazaoSocial(razaoSocial.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());
    }

    const focus = () => {
        if (typeof props.cadastro.setOpcoes !== "undefined") props.cadastro.setOpcoes([]);
    }

    return(
        <Input 
            nome={"Razao Social"} 
            value={razaoSocial}
            onChangeText={razaoSocialHandler}
            maxLength={50}
            onBlur={blur}
            onFocus={focus}
            //multiline={true}
        />
    );
}

export default InputRazaoSocial;