
import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { faTrash, faPeace, faPencilAlt, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Cadastro from '../cadastro/Cadastro';
import Axios from 'axios';
import { serverUrl } from '../../server';

const Sincronizar = (props) => {

    props = props.props;

    const [cads, setCads] = useState([]);
    const [cadastros, setCadastros] = useState(<Text style={styles.text}> Carregando... </Text>);

    const renderCads = (cads) => {

        let cadsRender = [];

        for (let i = 0; i < cads.length; i++) {

            cadsRender.push(
                <View style={styles.border}>

                    <View style={styles.alignCenterContent}>
                        
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={() => remover(i, cads)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button2}
                            onPress={() => editar(i, cads)}
                        >
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => sincronizar(i, cads)}
                        >
                            <FontAwesomeIcon icon={faUpload} />
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.text2}> Cnpj ou Cpf: {cads[i].cnpjOuCpf} </Text>
                    <Text style={styles.text2}> Nome Fantasia: {cads[i].nomeFantasia} </Text>
                    <Text style={styles.text2}> Celular: {cads[i].celular} </Text>
                </View>
            );

        }

        setCadastros(cadsRender);
    }

    const remover = async (index, cads) => {

        for (let i = 0; i < cads.length; i++) {
            
            if (index == i) cads.splice(i, 1);
        }

        const jsonValue = JSON.stringify(cads);
        await AsyncStorage.setItem('cadastro2', jsonValue);

        setCads(cads);
        renderCads(cads);
    }

    const editar = (index, cads) => {
        
        props.cadastro = cads[index];
        props.cadastro.index = index;

        props.setRoute(<Cadastro props={props}/>);
    }

    const sincronizar = (index, cads) => {

        props.cadastro = cads[index];

        Axios.post(serverUrl + "/fornecedores/" + props.usuario._id, props.cadastro)
        .then(() => {

            console.log("sincronizado com sucesso");
           // remover(index, cads);

        });
    }

    const sincronizarTudo = () => {

        let cadsLeng = cads.length;

        for (let i = 0; i < cadsLeng; i++) {

            Axios.post(serverUrl + "/fornecedores/" + props.usuario._id, cads[i])
            .then(() => {
                
                //remover(i, cads[i]);
            });
        }
    }

    const getStored = async () => {

        try {

            const jsonValue = await AsyncStorage.getItem('cadastro2');
            let cads = JSON.parse(jsonValue);
            
            if (!cads) setCadastros([]);

            setCads(cads);
            renderCads(cads);

        } catch (e) {
            console.log(e);
        }
    }

    const [check, setCheck] = useState(false);

    if(!check) {

        setCheck(true);
        getStored();
    }


    return(
        <>
        <View>
            <Text style={styles.titleText}> Sincronizar </Text>
            <Button
                title="Sincronizar Tudo"
                onPress={sincronizarTudo}
            />
            <Text style={styles.text}> Não Sincronizados</Text>
        </View>
       
        <ScrollView style={styles.scroll}>
            {cadastros}
        </ScrollView>
        
        </>
    );
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 40,
        marginTop: 20,
        marginBottom: 20,
        textAlign: "center"
    },
    text: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 25,
        textAlign: "center"
    },
    text2: {
        //marginTop: 20,
        //marginBottom: 20,
        fontSize: 20,
        //textAlign: "center"
    },
    scroll: {
        marginBottom: 380
    },
    border: {
        borderWidth: 2, 
        borderStyle: "solid", 
        marginRight: 20, 
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20
    },
    button: {
        width: 60,
        backgroundColor: "#2196f3",
        padding: 20,
        marginBottom:20,
    },
    button2: {
        width: 60,
        backgroundColor: "#2196f3",
        padding: 20,
        marginBottom:20,
        marginRight: 20
    },
    alignCenterContent: {
        flex:1,
        flexDirection:"row",
        justifyContent: "flex-end"
    }
});

export default Sincronizar;