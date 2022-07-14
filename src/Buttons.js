
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ListView, FlatList } from "react-native";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faList, faUserCircle, faSignOutAlt, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';

import Cadastro from "./cadastro/Cadastro";
import Home from "./Home";
import Login from "./conta/Login";
import Sair from "./conta/Sair";
import Conta from "./conta/Conta";
import Sincronizar from "./sincronizar/Sincronizar";

const Buttons = (props) => {

    props = props.props;

    //const home = () => props.setRoute(<Home props={props}/>);
    const cadastro = () => props.setRoute(<Cadastro props={props}/>);
    const sincronizar = () => props.setRoute(<Sincronizar props={props}/>);
    const conta = () => props.setRoute(<Conta props={props}/>);
    const login = () => props.setRoute(<Login props={props}/>);
    const sair = () => props.setRoute(<Sair props={props}/>);

    const btnsLogado = [
        /*{
            onPress: home,
            icon: faHome,
        },*/
        {
            onPress: cadastro,
            icon: faPlus,
        },
        {
            onPress: sincronizar,
            icon: faUpload
        },
        {
            onPress: conta,
            icon: faUserCircle
        },
        {
            onPress: sair,
            icon: faSignOutAlt
        }
    ];

    const btnsDeslogado = [
        /*{
            onPress: home,
            icon: faHome,
        },*/
        {
            onPress: login,
            icon: faUserCircle,
        }
    ];

    const Item = ({onPress, icon}) => {

        return(
            <TouchableOpacity
                style={styles.button}
                onPress={onPress}
            >
                <FontAwesomeIcon icon={icon} />
            </TouchableOpacity>
        )
    }

    

    const Logado = () => {

        return (
            <FlatList style={styles.container} 
            horizontal={true}
            data={btnsLogado}
            renderItem={({ item }) => (
              <Item
                onPress={item.onPress}
                icon={item.icon}
              />)}/>
        );
    }

    const Deslogado = () => {

        const [check, setcheck] = useState(false);

        if (!check) {

            setcheck(true);
            login();
        } 

        return (
            <FlatList style={styles.container} 
            horizontal={true}
            data={btnsDeslogado}
            renderItem={({ item }) => (
              <Item
                onPress={item.onPress}
                icon={item.icon}
              />)}/>
        );
    }

    const CheckLogado = () => {

        if(props.isLogado) return Logado();
        return Deslogado();
    }

    return(CheckLogado());

};

const styles = StyleSheet.create({
    container: {
    },
    button: {
        width: 60,
        marginLeft:20,
        //marginRight: 20,
        //alignItems: "center",
        backgroundColor: "#2196f3",
        padding: 20
    }
});

export default Buttons;