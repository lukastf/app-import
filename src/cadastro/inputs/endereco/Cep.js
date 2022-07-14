
import React, { useState } from 'react';
import Input from '../../../bases/Input';
import { cepMask } from '../../../bases/masks';
import Axios from 'axios';

const InputCep = (props) => {

    let index = props.index;
    props = props.props;

    const [cep, setCep] = useState("");
    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);

        props.cadastro.endereco[index].setCep = setCep;
        
        if (typeof props.cadastro.endereco[index].cep !== "undefined") 
            setCep(props.cadastro.endereco[index].cep);
        else props.cadastro.endereco[index].cep = "";
    }

    //props.cadastro.cep = cep;

    const cepHandler = text => 
    {

        let val = cepMask(text);

        setCep(val);
        props.cadastro.endereco[index].cep = val;
        
        if (text.length > 7) {

            Axios.get("https://viacep.com.br/ws/"+text+"/json/unicode/")
            .then((res) => {

                let enderecoCompleto = res.data.logradouro.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
                //let tempArr = endereco.split(/([0-9]+)/)[1];
                let endereco = enderecoCompleto.split(/([0-9]+)/)[0];
                let numero = enderecoCompleto.split(/([0-9]+)/)[1];
                let complemento = res.data.complemento.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
                let bairro = res.data.bairro.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
                let cidade = res.data.localidade.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
                let estado = res.data.uf.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

                //setCep(res.data.cep);
                props.cadastro.endereco[index].setEndereco(endereco);
                props.cadastro.endereco[index].setNumero(numero);
                props.cadastro.endereco[index].setComplemento(complemento);
                props.cadastro.endereco[index].setBairro(bairro);
                props.cadastro.endereco[index].setCidade(cidade);
                props.cadastro.endereco[index].setEstado(estado);

                props.cadastro.endereco[index].endereco = endereco;
                props.cadastro.endereco[index].numero = numero;
                props.cadastro.endereco[index].complemento = complemento;
                props.cadastro.endereco[index].bairro = bairro;
                props.cadastro.endereco[index].cidade = cidade;
                props.cadastro.endereco[index].estado = estado;

            }).catch(() => {

            })
        }
    }

    return(
        <Input 
            nome={"Cep"}
            keyboardType='numeric'
            value={cep}
            onChangeText={cepHandler}
            maxLength={9}
        />
    );
}

export default InputCep;