
import React, { useState } from 'react';
import Input from '../../../bases/Input';
import { dataMask } from '../../../bases/masks';

const InputDataInicio = (props) => {

    let index = props.index;
    props = props.props;

    const [dataInicio, setDataInicio] = useState("");
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        props.cadastro.agenda[index].setDataInicio = setDataInicio;
        if (typeof props.cadastro.agenda[index].dataInicio !== "undefined") setDataInicio(props.cadastro.agenda[index].dataInicio);
        else props.cadastro.agenda[index].dataInicio = "";
    }
    
    const handler = text => {
        
        let val = dataMask(text);
        
        setDataInicio(val);
        props.cadastro.agenda[index].dataInicio = val;
    }

    return(
        <Input 
            nome={"Data Inicio"} 
            keyboardType='numeric'
            value={dataInicio}
            onChangeText={handler}
            maxLength={10}
        />
    );
}

export default InputDataInicio;