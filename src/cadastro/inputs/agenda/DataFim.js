
import React, { useState } from 'react';
import Input from '../../../bases/Input';
import { dataMask } from '../../../bases/masks';

const InputDataFim = (props) => {

    let index = props.index;
    props = props.props;

    const [dataFim, setDataFim] = useState("");
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        props.cadastro.agenda[index].setDataFim = setDataFim;
        if (typeof props.cadastro.agenda[index].dataFim !== "undefined") setDataFim(props.cadastro.agenda[index].dataFim);
        else props.cadastro.agenda[index].dataFim = "";
    }

    const handler = text => {

        let val = dataMask(text);

        setDataFim(val);
        props.cadastro.agenda[index].dataFim = val;
    }

    return(
        <Input 
            nome={"Data Fim"} 
            keyboardType='numeric'
            value={dataFim}
            onChangeText={handler}
            maxLength={10}
        />
    );
}

export default InputDataFim;