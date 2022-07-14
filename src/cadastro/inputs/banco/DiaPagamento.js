
import React, { useState } from 'react';
import Input from '../../../bases/Input';
import { dataMask } from '../../../bases/masks';

const InputDiaPagamento = (props) => {

    props = props.props;

    const [diaPagamento, setDiaPagamento] = useState("");
    const [check , setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        props.cadastro.setDiaPagamento = setDiaPagamento;

        if (typeof props.cadastro.diaPagamento !== "undefined") 
            setDiaPagamento(props.cadastro.diaPagamento);
        else props.cadastro.diaPagamento = "";
    }
    
    const diaPagamentoHandler = text => {
        
        let val = dataMask(text);

        setDiaPagamento(val);
        props.cadastro.diaPagamento = val;
    }

    const focus = () => {
        if (typeof props.cadastro.setOpcoes !== "undefined") props.cadastro.setOpcoes([]);
    }

    return(
        <Input 
            nome={"Dia do Pagamento"} 
            keyboardType='numeric'
            value={diaPagamento}
            onChangeText={diaPagamentoHandler}
            maxLength={2}
            onFocus={focus}
        />
    );
}

export default InputDiaPagamento;