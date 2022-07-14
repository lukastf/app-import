
import React, { useState } from 'react';
import Input from '../../../bases/Input';
import { moneyMask } from '../../../bases/masks';
import Axios from 'axios';
import { StyleSheet, Text } from 'react-native';
import { serverUrl } from '../../../../server';

const InputTaxaCredenciamento = (props) => {

    props = props.props;

    const [taxa , setTaxa] = useState("");
    const [check , setCheck] = useState(false);
    const [opcoes, setOpcoes] = useState([]);

    const sugestoesHandler = (taxaCred) => {

        setTaxa(taxaCred);
        props.cadastro.taxaCred = taxaCred;
        setOpcoes([]);
    }

    const loop = (data) => {

        let temp = [];

        data.forEach(element => {
            temp.push(
            <Text 
                onPress={() => sugestoesHandler(element.taxaCred)}
                style={styles.text}
            >
                {element.taxaCred}
            </Text>
            );
        });

        return temp;
    }

    const getSugestoes = (pesquisa) => {

        //pesquisa = pesquisa.replace(",", "");
        
        if (pesquisa === "") {
            setOpcoes([]);
            return;
        }

        Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/taxaCred/"+ pesquisa)
        .then((pages)=> {

            pages = pages.data;

            Axios.get(serverUrl + "/sugestoes/" + props.usuario._id + "/5/pageId/"+ pages[0] +"/taxaCred/" + pesquisa)
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

        props.cadastro.setTaxaCred = setTaxa;

        if (typeof props.cadastro.taxaCred !== "undefined") 
            setTaxa(props.cadastro.taxaCred);
        else props.cadastro.taxaCred = "";
    }
    
    const taxaHandler = text => {

        let val = moneyMask(text);
        
        setTaxa(val);
        props.cadastro.taxaCred = val;

        getSugestoes(val);
    }

    const focus = () => {
        if (typeof props.cadastro.setOpcoes !== "undefined") props.cadastro.setOpcoes([]);
    }

    return(
        <>
        <Input 
            nome={"Taxa de Credenciamento"} 
            keyboardType='numeric'
            value={taxa}
            onChangeText={taxaHandler}
            maxLength={15}
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

export default InputTaxaCredenciamento;