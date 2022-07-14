
import React, { useState } from 'react';
import Input from '../../../bases/Input';
import Axios from 'axios';
import { StyleSheet, Text } from 'react-native';
import { serverUrl } from '../../../../server';

const InputObservacao = (props) => {

    props = props.props;

    const [observacao, setObservacao] = useState("");
    const [check , setCheck] = useState(false);
    const [opcoes, setOpcoes] = useState([]);

    const sugestoesHandler = (observacao) => {

        setObservacao(observacao);
        props.cadastro.observacao = observacao;
        setOpcoes([]);
    }

    const loop = (data) => {

        let temp = [];

        data.forEach(element => {
            temp.push(
            <Text 
                onPress={() => sugestoesHandler(element.observacao)}
                style={styles.text}
            >
                {element.observacao}
            </Text>
            );
        });

        return temp;
    }

    const getSugestoes = (pesquisa) => {
        
        if (pesquisa === "") {
            setOpcoes([]);
            return;
        }

        Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/observacao/"+ pesquisa)
        .then((pages)=> {

            pages = pages.data;

            Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/pageId/"+ pages[0] +"/observacao/" + pesquisa)
            .then((res)=> {

                props.cadastro.setOpcoes = setOpcoes;
                setOpcoes(loop(res.data));
            })
            .catch(() =>{
                setOpcoes([]);
            });
        });
    }

    if (!check) {

        setCheck(true);

        props.cadastro.setObservacao = setObservacao;

        if (typeof props.cadastro.observacao !== "undefined") 
            setObservacao(props.cadastro.observacao);
        else props.cadastro.observacao = "";
    }

    
    const observacaoHandler = text => {
        
        setObservacao(text);
        props.cadastro.observacao = text;

        getSugestoes(text);
    }

    const blur = () => {
        setObservacao(observacao.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());
    }

    const focus = () => {
        if (typeof props.cadastro.setOpcoes !== "undefined") props.cadastro.setOpcoes([]);
    }

    return(
        <>
        <Input 
            nome={"Observacao"} 
            value={observacao}
            onChangeText={observacaoHandler}
            onBlur={blur}
            maxLength={500}
            onFocus={focus}
        />
        {opcoes}
        </>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        marginBottom: 20,
        marginLeft: 60
    }
});

export default InputObservacao;