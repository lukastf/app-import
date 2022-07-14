
import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import Axios from 'axios';
import { serverUrl } from '../../../../server';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, View, Text } from 'react-native';

const InputOrigem = (props) => {

    let index = props.index;
    props = props.props;

    const [origem , setOrigem] = useState("");
    const [opcoes , setOpcoes] = useState([]);

    const loop = (data) => {

        let temp = [<Picker.Item label="" value="" />];

        data.forEach(element => {
            temp.push(<Picker.Item label={element.nome} value={element.idOrg} />);
        });

        return temp;
    }

    const store = async (data) => {

        try {
            const jsonValue = JSON.stringify(data);
            await AsyncStorage.setItem('origens', jsonValue);

        } catch (e) {
          // saving error
        }
    }

    const getStored = async () => {

        try {

            const jsonValue = await AsyncStorage.getItem('origens');
            let stored = JSON.parse(jsonValue);
        
            setOpcoes(loop(stored));

        } catch (e) {
            console.log(e);
        }
    }

    const getNet = () => {

        Axios.get(serverUrl + "/origens/" + props.usuario._id + "/0/nome/$")
        .then((pages)=> {

            pages = pages.data;

            Axios.get(serverUrl + "/origens/" + props.usuario._id + "/0/pageId/"+ pages[0] +"/nome/$")
            .then((res)=> {

                store(res.data);
                setOpcoes(loop(res.data));
            });
        });
    }

    const [check , setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        props.cadastro.numeroLogico[index].setOrigem = setOrigem;
        
        if (typeof props.cadastro.numeroLogico[index].origem !== "undefined") 
            setOrigem(props.cadastro.numeroLogico[index].origem);
        else props.cadastro.numeroLogico[index].origem = "";
        
        // sem internet
        getStored();
        
        /// com internet
        getNet();
    }
    
    const handler = (itemValue, itemIndex) => {
        
        setOrigem(itemValue);
        props.cadastro.numeroLogico[index].origem = itemValue;
    }

    return(
        <>
        <Text style={styles.text}> Origem </Text>
        <View style={styles.picker}>
            <Picker
                selectedValue={origem}
                //style={{marginLeft:70}}
                //itemStyle={{ fontSize:170 }}
                onValueChange={handler}>
                {opcoes}
            </Picker>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: "center"
    },
    picker: {
        fontSize: 20,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: 60,
        marginRight: 60,
        marginBottom: 20,
        //marginTop: 20
    }
});

export default InputOrigem;