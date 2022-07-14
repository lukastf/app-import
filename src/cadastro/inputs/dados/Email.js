
import React, { useState } from 'react';
import Input from '../../../bases/Input';
import Axios from 'axios';
import { StyleSheet, Text } from 'react-native';
import { serverUrl } from '../../../../server';

const InputEmail = (props) => {

    props = props.props;

    const [email, setEmail] = useState("");
    const [check, setCheck] = useState(false);
    const [opcoes, setOpcoes] = useState([]);

    const sugestoesHandler = (email) => {

        setEmail(email);
        props.cadastro.email = email;
        setOpcoes([]);
    }

    const loop = (data) => {

        let temp = [];

        data.forEach(element => {
            temp.push(
            <Text 
                onPress={() => sugestoesHandler(element.email)}
                style={styles.text}
            >
                {element.email}
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

        Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/email/"+ pesquisa)
        .then((pages)=> {

            pages = pages.data;

            Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/pageId/"+ pages[0] +"/email/" + pesquisa)
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

        props.cadastro.setEmail = setEmail;
        if (typeof props.cadastro.email !== "undefined") setEmail(props.cadastro.email);
        else props.cadastro.email = "";
    }
    
    const emailHandler = text => {
        
        props.cadastro.email = text;
        setEmail(text);

        getSugestoes(text);
    }

    const blur = () => {

        setEmail(email.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    }

    const focus = () => {
        if (typeof props.cadastro.setOpcoes !== "undefined") props.cadastro.setOpcoes([]);
    }

    return(
        <>
        <Input 
            nome={"Email"}
            value={email}
            onChangeText={emailHandler}
            maxLength={60}
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

export default InputEmail;