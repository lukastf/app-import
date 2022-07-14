
import React from 'react';
import { View, Text, Button, StyleSheet } from "react-native";
import Login from "./Login";
import AsyncStorage from '@react-native-community/async-storage';

const Sair = (props) => {

    props = props.props;

    const clearData = async () => {
        try {
            await AsyncStorage.removeItem('usuario');
        } catch (e) {
          console.log("nao deu pra limpa");
          console.log(e);
        }
    }

    const sair = () => {

        props.setIsLogado(false);
        props.setUsuario({});
        
        clearData();

        props.setRoute(<Login props={props}/>);
    }

    return(
        <View>
            <Text style={styles.titleText}> Sair </Text>
            <Text style={styles.text}> Deseja realmente sair {props.usuario.email}?</Text>
            <Button
                title="Sair"
                onPress={sair}
            />
        </View>
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
    }
});

export default Sair;