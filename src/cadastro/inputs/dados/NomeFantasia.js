
import React, { useState, useRef, useEffect } from 'react';
import Input from '../../../bases/Input';
import Axios from 'axios';
import { serverUrl } from '../../../../server';
import { Picker } from '@react-native-community/picker';
import { View, StyleSheet, Text } from 'react-native';

const InputNomeFantasia = (props) => {

    props = props.props;

    const [nomeFantasia , setNomeFantasia] = useState("");
    const [check, setCheck] = useState(false);
    const [opcoes, setOpcoes] = useState([]);
    //const [hideOpcoes, setHideOpcoes] = useState(styles.hideOpcoes);

    const sugestoesHandler = (nomeFantasia) => {

        //nomeFantasia = nomeFantasia.replace(/ /g, "");

        setNomeFantasia(nomeFantasia);
        props.cadastro.nomeFantasia = nomeFantasia;
        setOpcoes([]);
        //setHideOpcoes(styles.hideOpcoes);
    }

    const loop = (data) => {

        let temp = [];

        data.forEach(element => {
            temp.push(
            <Text 
                onPress={() => sugestoesHandler(element.nomeFantasia)}
                style={styles.text}
            >
                {element.nomeFantasia}
            </Text>
            );
        });

        return temp;
    }

    const getSugestoes = (pesquisa) => {
        
        if (pesquisa === "") {
            setOpcoes([]);
            //setHideOpcoes(styles.hideOpcoes);
            return;
        }

        //setHideOpcoes(styles.showOpcoes);

        Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/nomeFantasia/"+ pesquisa)
        .then((pages)=> {

            pages = pages.data;

            Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/pageId/"+ pages[0] +"/nomeFantasia/" + pesquisa)
            .then((res)=> {

                props.cadastro.setOpcoes = setOpcoes;
                setOpcoes(loop(res.data));
            })
            .catch(() =>{
                //setHideOpcoes(styles.hideOpcoes);
                setOpcoes([]);
            });
        });
    }

    if(!check) {

        setCheck(true);

        props.cadastro.setNomeFantasia = setNomeFantasia;
        if (typeof props.cadastro.nomeFantasia !== "undefined") setNomeFantasia(props.cadastro.nomeFantasia);
        else  props.cadastro.nomeFantasia = "";
    }

    
    const nomeFantasiaHandler = text => {
        
        setNomeFantasia(text);
        props.cadastro.nomeFantasia = text;

        getSugestoes(text);
    }

    const blur = () => {
        setNomeFantasia(nomeFantasia.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());
    }

    const focus = () => {
        if (typeof props.cadastro.setOpcoes !== "undefined") props.cadastro.setOpcoes([]);
    }

    return(
        <>
        <Input 
            nome={"Nome Fantasia"} 
            value={nomeFantasia}
            onChangeText={nomeFantasiaHandler}
            maxLength={30}
            onBlur={blur}
            onFocus={focus}
        />
        {opcoes}
        {/*<View style={hideOpcoes}>
        </View>*/}
        </>
    );
}

const styles = StyleSheet.create({
    /*hideOpcoes: {
        display: "none"
    },
    showOpcoes: {
        marginLeft: 60
    },*/
    text: {
        fontSize: 20,
        marginBottom: 20,
        marginLeft: 60
    }
});

export default InputNomeFantasia;