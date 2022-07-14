
import React, { useState } from 'react';
import Input from '../../../bases/Input';
import { celularMask } from '../../../bases/masks';
import Axios from 'axios';
import { StyleSheet, Text } from 'react-native';
import { serverUrl } from '../../../../server';

const InputTelefone = (props) => {

    props = props.props;

    const [telefone, setTelefone] = useState("");
    const [check, setCheck] = useState(false);
    const [opcoes, setOpcoes] = useState([]);

    const sugestoesHandler = (telefone) => {

        setTelefone(telefone);
        props.cadastro.telefone = telefone;
        setOpcoes([]);
    }

    const loop = (data) => {

        let temp = [];

        data.forEach(element => {
            temp.push(
            <Text 
                onPress={() => sugestoesHandler(element.telefone)}
                style={styles.text}
            >
                {element.telefone}
            </Text>
            );
        });

        return temp;
    }

    const getSugestoes = (pesquisa) => {

        //pesquisa = pesquisa.replace("(", "");
        //pesquisa = pesquisa.replace(")", "");
        //pesquisa = pesquisa.replace(" ", "");

        pesquisa = pesquisa.substring(4, 14);

        //console.log(pesquisa);
        
        if (pesquisa === "") {
            setOpcoes([]);
            return;
        }

        Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/telefone/"+ pesquisa)
        .then((pages)=> {

            pages = pages.data;

            Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/pageId/"+ pages[0] +"/telefone/" + pesquisa)
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
        
        props.cadastro.setTelefone = setTelefone;
        if (typeof props.cadastro.telefone !== "undefined") setTelefone(props.cadastro.telefone);
        else props.cadastro.telefone = "";
    }
    
    const telefoneHandler = text => {

        let val = celularMask(text);

        setTelefone(val);
        props.cadastro.telefone = val;

        getSugestoes(val);
    }

    const focus = () => {
        if (typeof props.cadastro.setOpcoes !== "undefined") props.cadastro.setOpcoes([]);
    }

    return(
        <>
        <Input 
            nome={"Telefone"} 
            keyboardType='numeric'
            value={telefone}
            onChangeText={telefoneHandler}
            maxLength={14}
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

export default InputTelefone;