
import React, { useState } from 'react';
import Input from '../../../bases/Input';
import { numberMask } from '../../../bases/masks';
import Axios from 'axios';
import { StyleSheet, Text } from 'react-native';
import { serverUrl } from '../../../../server';

const InputNumeroConta = (props) => {

    props = props.props;

    const [numero , setNumero] = useState("");
    const [check , setCheck] = useState(false);
    const [opcoes, setOpcoes] = useState([]);

    const sugestoesHandler = (numeroConta) => {

        setNumero(numeroConta);
        props.cadastro.numeroConta = numeroConta;
        setOpcoes([]);
    }

    const loop = (data) => {

        let temp = [];

        data.forEach(element => {
            temp.push(
            <Text 
                onPress={() => sugestoesHandler(element.numeroConta)}
                style={styles.text}
            >
                {element.numeroConta}
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

        Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/numeroConta/"+ pesquisa)
        .then((pages)=> {

            pages = pages.data;

            Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/pageId/"+ pages[0] +"/numeroConta/" + pesquisa)
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

        props.cadastro.setNumeroConta = setNumero;

        if (typeof props.cadastro.numeroConta !== "undefined") 
            setNumero(props.cadastro.numeroConta);
        else props.cadastro.numeroConta = "";
    }

    
    const numeroHandler = text => {
        
        let val = numberMask(text);

        setNumero(val);
        props.cadastro.numeroConta = val;

        getSugestoes(val);
    }

    const focus = () => {
        if (typeof props.cadastro.setOpcoes !== "undefined") props.cadastro.setOpcoes([]);
    }

    return(
        <>
        <Input 
            nome={"Numero da Conta"} 
            keyboardType='numeric'
            value={numero}
            onChangeText={numeroHandler}
            maxLength={20}
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

export default InputNumeroConta;