
import React, { useState } from 'react';
import Input from '../../../bases/Input';
import Axios from 'axios';
import { StyleSheet, Text } from 'react-native';
import { serverUrl } from '../../../../server';

const InputContato = (props) => {

    props = props.props;

    const [contato , setContato] = useState("");
    const [check, setCheck] = useState(false);
    const [opcoes, setOpcoes] = useState([]);

    const sugestoesHandler = (contato) => {

        setContato(contato);
        props.cadastro.contato = contato;
        setOpcoes([]);
    }

    const loop = (data) => {

        let temp = [];

        data.forEach(element => {
            temp.push(
            <Text 
                onPress={() => sugestoesHandler(element.contato)}
                style={styles.text}
            >
                {element.contato}
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

        Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/contato/"+ pesquisa)
        .then((pages)=> {

            pages = pages.data;

            Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/pageId/"+ pages[0] +"/contato/" + pesquisa)
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
        
        props.cadastro.setContato = setContato;
        if (typeof props.cadastro.contato !== "undefined") setContato(props.cadastro.contato);
        else props.cadastro.contato = "";
    }

    const contatoHandler = text => {

        //text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

        setContato(text);
        props.cadastro.contato = text;

        getSugestoes(text);
    }

    const blur = () => {
        setContato(contato.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());
    }

    const focus = () => {
        if (typeof props.cadastro.setOpcoes !== "undefined") props.cadastro.setOpcoes([]);
    }

    return(
        <>
        <Input 
            nome={"Contato"} 
            value={contato}
            onChangeText={contatoHandler}
            maxLength={64}
            onBlur={blur}
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

export default InputContato;