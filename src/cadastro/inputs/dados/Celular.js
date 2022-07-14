
import React, { useState } from 'react';
import Input from '../../../bases/Input';
import { celularMask } from '../../../bases/masks';
import Axios from 'axios';
import { StyleSheet, Text } from 'react-native';
import { serverUrl } from '../../../../server';

const InputCelular = (props) => {

    props = props.props;

    const [celular, setCelular] = useState("");
    const [check, setCheck] = useState(false);
    const [opcoes, setOpcoes] = useState([]);

    const sugestoesHandler = (celular) => {

        setCelular(celular);
        props.cadastro.celular = celular;
        setOpcoes([]);
    }

    const loop = (data) => {

        let temp = [];

        data.forEach(element => {
            temp.push(
            <Text 
                onPress={() => sugestoesHandler(element.celular)}
                style={styles.text}
            >
                {element.celular}
            </Text>
            );
        });

        return temp;
    }

    const getSugestoes = (pesquisa) => {

        pesquisa = pesquisa.substring(4, 14);
        
        if (pesquisa === "") {
            setOpcoes([]);
            return;
        }

        Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/celular/"+ pesquisa)
        .then((pages)=> {

            pages = pages.data;

            Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/pageId/"+ pages[0] +"/celular/" + pesquisa)
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
        
        props.cadastro.setCelular = setCelular;
        if (typeof props.cadastro.celular !== "undefined") setCelular(props.cadastro.celular);
        else  props.cadastro.celular = "";
    }

    
    const celularHandler = text => {

        let val = celularMask(text);
        
        props.cadastro.celular = val;
        setCelular(val);

        getSugestoes(val);
    }

    const focus = () => {
        if (typeof props.cadastro.setOpcoes !== "undefined") props.cadastro.setOpcoes([]);
    }

    return(
        <>
        <Input 
            nome={"Celular"}
            keyboardType='numeric'
            value={celular}
            onChangeText={celularHandler}
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

export default InputCelular;