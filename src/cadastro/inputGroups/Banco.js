
import React from 'react';

import InputBanco from '../inputs/banco/Banco';
import InputAgencia from '../inputs/banco/Agencia';
import InputNumeroConta from '../inputs/banco/NumeroConta';
import InputTipoConta from '../inputs/banco/TipoConta';
import InputValorDocumento from '../inputs/banco/ValorDocumento';
import InputCnpjOuCpfConta from '../inputs/banco/CnpjOuCpfConta';
import InputNomeContaCorrente from '../inputs/banco/NomeContaCorrente';
import InputTaxaCredenciamento from '../inputs/banco/TaxaCredenciamento';
import InputObservacao from '../inputs/banco/Observacao';
import InputDiaPagamento from '../inputs/banco/DiaPagamento';

const Banco = (props) => {

    props = props.props;

    return (
        <>
        <InputBanco props={props}/>
        <InputAgencia props={props}/>
        <InputNumeroConta props={props}/>
        <InputTipoConta props={props}/>
        <InputValorDocumento props={props}/>
        <InputCnpjOuCpfConta props={props}/>
        <InputNomeContaCorrente props={props}/>
        <InputDiaPagamento props={props}/>
        <InputTaxaCredenciamento props={props}/>
        <InputObservacao props={props}/>
        </>
    );
}

export default Banco;