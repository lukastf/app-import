
import React, { useState } from 'react';
import Input from '../../../bases/Input';

const InputObservacaoAgenda = (props) => {

    let index = props.index;
    props = props.props;

    const [observacaoAgenda, setObservacaoAgenda] = useState("");
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        //props.cadastro.setObservacaoAgenda = setObservacaoAgenda;
        props.cadastro.agenda[index].setObservacao = setObservacaoAgenda;

        if (typeof props.cadastro.agenda[index].observacao !== "undefined") 
            setObservacaoAgenda(props.cadastro.agenda[index].observacao);
        else props.cadastro.agenda[index].observacao = "";
    }
    
    const observacaoAgendaHandler = text => {
        
        setObservacaoAgenda(text);
        props.cadastro.agenda[index].observacao = text;
    }

    const blur = () => {

        setObservacaoAgenda(observacaoAgenda.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());
    }

    return(
        <Input 
            nome={"Observacao Agenda"} 
            value={observacaoAgenda}
            onChangeText={observacaoAgendaHandler}
            onBlur={blur}
            maxLength={200}
        />
    );
}

export default InputObservacaoAgenda;