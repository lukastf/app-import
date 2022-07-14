
import React, { useState } from 'react';
import Input from '../../../bases/Input';
import { numberMask } from '../../../bases/masks';
import Axios from 'axios';
import { StyleSheet, Text } from 'react-native';
import { serverUrl } from '../../../../server';

const InputAgencia = (props) => {

    props = props.props;

    const [agencia , setAgencia] = useState("");
    const [check, setCheck] = useState(false);
    const [opcoes, setOpcoes] = useState([]);

    const sugestoesHandler = (agencia) => {

        setAgencia(agencia);
        props.cadastro.agencia = agencia;
        setOpcoes([]);
    }

    const loop = (data) => {

        let temp = [];

        data.forEach(element => {
            temp.push(
            <Text 
                onPress={() => sugestoesHandler(element.agencia)}
                style={styles.text}
            >
                {element.agencia}
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

        Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/agencia/"+ pesquisa)
        .then((pages)=> {

            pages = pages.data;

            Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/pageId/"+ pages[0] +"/agencia/" + pesquisa)
            .then((res)=> {

                props.cadastro.setOpcoes = setOpcoes;
                setOpcoes(loop(res.data));
            })
            .catch(() =>{
                setOpcoes([]);
            });
        });
    }

    if(!check) {

        setCheck(true);

        props.cadastro.setAgencia = setAgencia;

        if (typeof props.cadastro.agencia !== "undefined") 
            setAgencia(props.cadastro.agencia);
        else props.cadastro.agencia = "";
    }

    
    const agenciaHandler = text => {
        
        let val = numberMask(text);

        setAgencia(val);
        props.cadastro.agencia = val;

        getSugestoes(val);
    }

    const focus = () => {
        if (typeof props.cadastro.setOpcoes !== "undefined") props.cadastro.setOpcoes([]);
    }

    return(
        <>
        <Input 
            nome={"Agencia"} 
            keyboardType='numeric'
            value={agencia}
            onChangeText={agenciaHandler}
            maxLength={6}
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

export default InputAgencia;