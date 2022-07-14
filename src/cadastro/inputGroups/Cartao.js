
import React, { useState } from 'react';

import InputTipoCartao from '../inputs/cartao/TipoCartao';
import InputTaxaAdministrativa from '../inputs/cartao/TaxaAdministrativa';
import InputTipoPagamento from '../inputs/cartao/TipoPagamento';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const Cartao = (props) => {

    props = props.props;

    const [cartoes, setCartoes] = useState([]);
    const [cartoesRender, setCartoesRender] = useState();

    /*const [check, setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        props.cadastro.adminCartao = [];
    }*/

    const cartao = (onPress, icon, index) => {

        if (typeof props.cadastro.adminCartao[index] === "undefined") 
        props.cadastro.adminCartao[index] = {};

        return(
        <View style={styles.border}>

            <View style={styles.alignCenterContent}>
                <Text style={styles.title}>Cartão</Text>
                <TouchableOpacity
                    //id={0}
                    style={styles.button}
                    onPress={onPress}
                >
                    <FontAwesomeIcon icon={icon} />
                </TouchableOpacity>
            </View>

            <InputTipoCartao props={props} index={index}/>
            <InputTaxaAdministrativa props={props} index={index}/>
            <InputTipoPagamento props={props} index={index}/>
        </View>);
    }

    const removeCartao = () => {

        let tmp = cartoes;

        props.cadastro.adminCartao.pop();
        tmp.pop();

        setCartoes(tmp);
        setCartoesRender(<View>{cartoes}</View>);
    }
 
    const addCartao = () => {

        let tmp = cartoes;
        let index = cartoes.length + 1;
        
        tmp.push(cartao(removeCartao, faTrash, index));

        setCartoes(tmp);
        setCartoesRender(<View>{cartoes}</View>);
    }

    const [check, setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        let hugo = props.cadastro.adminCartao.length -1;

        for (let index = 0; index < hugo; index++) {

            addCartao();
        }
    }

    return (
        <>
        {cartao(addCartao, faPlus, 0)}
        {cartoesRender}
        </>
    );
}

const styles = StyleSheet.create({
    border: {
        borderWidth: 2, 
        borderStyle: "solid", 
        marginRight: 20, 
        marginLeft: 20,
        marginTop: 40,
        marginBottom: 40
    },
    title: {
        //textAlign: "center", 
        marginRight: 80,
        marginTop: 18,
        //marginRight: 160,
        fontSize: 26
    },
    button: {
        width: 60,
        //alignSelf: "flex-end",
        //marginRight: 30,
        backgroundColor: "#2196f3",
        padding: 20,
        marginBottom:20,
        //marginRight: 100
    },
    alignCenterContent: {
        flex:1,
        flexDirection:"row",
        //alignItems: "flex-end",
        justifyContent: "flex-end"
    }
});

export default Cartao;