import React from 'react';

import InputCnpjOuCpf from '../inputs/dados/CnpjOuCpf';
import InputTipoPessoa from '../inputs/dados/TipoPessoa';
import InputRazaoSocial from '../inputs/dados/RazaoSocial';
import InputNomeFantasia from '../inputs/dados/NomeFantasia';
import InputInscEstOuRg from '../inputs/dados/InscEstOuRg';
import InputTelefone from '../inputs/dados/Telefone';
import InputContato from '../inputs/dados/Contato';
import InputCelular from '../inputs/dados/Celular';
import InputEmail from '../inputs/dados/Email';

const Dados = (props) => {

    props = props.props;

    return (
        <>
        <InputCnpjOuCpf props={props}/>
        <InputTipoPessoa props={props}/>
        <InputRazaoSocial props={props}/>
        <InputNomeFantasia props={props}/>
        <InputInscEstOuRg props={props}/>
        <InputTelefone props={props}/>
        <InputCelular props={props}/>
        <InputContato props={props}/>
        <InputEmail props={props}/>
        </>
    )
}

export default Dados;