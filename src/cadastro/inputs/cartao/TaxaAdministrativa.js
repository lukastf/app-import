
import React, { useState } from 'react';
import Input from '../../../bases/Input';
import { moneyMask } from '../../../bases/masks';

const InputTaxaAdministrativa = (props) => {

    let index = props.index;
    props = props.props;

    const [taxa , setTaxa] = useState("");
    const [check , setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        props.cadastro.adminCartao[index].setTaxaAdm = setTaxa;

        if (typeof props.cadastro.adminCartao[index].taxaAdm !== "undefined") 
            setTaxa(props.cadastro.adminCartao[index].taxaAdm);
        else props.cadastro.adminCartao[index].taxaAdm = "";
    }
    
    //props.cadastro.taxaAdmin = taxa;
    //props.cadastro.setTaxaAdmin = setTaxa;
    
    const taxaHandler = text => {

        let val = moneyMask(text);
        
        setTaxa(val);
        props.cadastro.adminCartao[index].taxaAdm = val;
    }

    return(
        <Input 
            nome={"Taxa Administrativa"} 
            keyboardType='numeric'
            value={taxa}
            onChangeText={taxaHandler}
            maxLength={11}
        />
    );
}

export default InputTaxaAdministrativa;