
import React, { useState } from 'react';
import { Text, StyleSheet, Button, ScrollView, TouchableOpacity, View } from 'react-native';

import Axios from 'axios';
import { serverUrl } from '../../server';

import Dados from './inputGroups/Dados';
import Banco from './inputGroups/Banco';
import Cartao from './inputGroups/Cartao';
import Endereco from './inputGroups/Endereco';
import RamoAtividade from './inputGroups/RamoAtividade';
import Agenda from './inputGroups/Agenda';
import NumeroLogico from './inputGroups/NumeroLogico';
import AsyncStorage from '@react-native-community/async-storage';
import Sincronizar from '../sincronizar/Sincronizar';

const Cadastro = (props) => {

    props = props.props;

    //const [cads, setCads] = useState([]);

    if (typeof props.cadastro === "undefined") {

        props.cadastro = {};
        props.cadastro.ramoAtividade = [];
        props.cadastro.adminCartao = [];
        props.cadastro.agenda = [];
        props.cadastro.numeroLogico = [];
        props.cadastro.endereco = [];
    }

    const store = async (data) => {
        
        try {

            let cad = [];
            let stored = await await AsyncStorage.getItem('cadastro2');

            stored = JSON.parse(stored);

            if (Array.isArray(stored)) {

                cad = stored;
                /*
                for (let i = 0; i < stored.length; i++ ) {
    
                    cad.push(stored[i]);
                }*/
            }

            let existe = false;

            for (let i = 0; i < cad.length; i++ ) {
    
                if (i === props.cadastro.index) {

                    cad[i] = data;
                    existe = true;
                    break;
                }
            }

            if(!existe) cad.push(data);
           
            const jsonValue = JSON.stringify(cad);
            await AsyncStorage.setItem('cadastro2', jsonValue);

        } catch (e) {
          // saving error
          console.log(e);
        }
    }

    const getStored = async () => {

        try {

            const jsonValue = await AsyncStorage.getItem('cadastro2');
            let cads = JSON.parse(jsonValue);
            
            if (!cads) cads = [];

            return cads;

            //setCads(cads);
            //renderCads(cads);

        } catch (e) {
            console.log(e);
        }
    }

    const remover = async () => {

        let cads = await getStored();
        cads.pop();

        //for (let i = 0; i < cads.length; i++) {
            
            //if (index == i) cads.splice(i, 1);
        //}

        const jsonValue = JSON.stringify(cads);
        await AsyncStorage.setItem('cadastro2', jsonValue);
    }

    const [cadastroResult, setCadastroResult] = useState(<Text></Text>);

    const cadastrar = async () => {

        if (
            props.cadastro.cnpjOuCpf === "" ||
            typeof props.cadastro.cnpjOuCpf === "undefined" ||
            props.cadastro.razaoSocial === "" ||
            typeof props.cadastro.razaoSocial === "undefined" ||
            props.cadastro.numeroLogico[0].numeroLogico === "" ||
            typeof props.cadastro.numeroLogico[0].numeroLogico === "undefined" ||
            props.cadastro.endereco[0].cidade === "" ||
            typeof props.cadastro.endereco[0].cidade === "undefined"
        ) {
            setCadastroResult(
                <Text style={{textAlign: "center", color:"red", fontSize: 20, marginHorizontal: 20, marginBottom: 20}}>
                Campos Obrigatórios: Razao Social, Cnpj Ou Cpf, Numero Logico e Cidade
                </Text>
            );
            return;
        }

        props.cadastro.vendedor = props.usuario.idOrg;
        await store(props.cadastro);
        props.setRoute(<Sincronizar props={props}/>);
        return;

        Axios.post(serverUrl + "/fornecedores/" + props.usuario._id, props.cadastro)
        .then(() => {
            console.log("cadastrado com sucesso");
            remover();
        });
    }

    return(
        <ScrollView style={styles.scroll}>

            <Text style={styles.titleText}>Cadastrar</Text>

            <Dados props={props}/>
            <Banco props={props}/>
            <RamoAtividade props={props}/>
            <Cartao props={props}/>
            <Agenda props={props}/>
            <NumeroLogico props={props}/>
            <Endereco props={props}/>

            {cadastroResult}
            <Button
                title="Cadastrar Fornecedor"
                onPress={cadastrar}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    titleText: {
        fontSize: 40,
        marginTop: 20,
        marginBottom: 20,
        textAlign: "center"
    },
    scroll: {
        marginBottom: 160
    }
  });

export default Cadastro;