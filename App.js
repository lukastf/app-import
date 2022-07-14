/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Buttons from './src/Buttons';
import Axios from 'axios';
import { serverUrl } from './server';
import Cadastro from './src/cadastro/Cadastro';

const App = () => {

  const [routes, setRoute] = useState();

  const [isLogado, setIsLogado] = useState(false);
  const [usuario, setUsuario] = useState({});

  let props = {

    routes: routes,
    setRoute: setRoute,

    isLogado: isLogado,
    setIsLogado: setIsLogado,

    usuario: usuario,
    setUsuario: setUsuario
  }

  const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('usuario', jsonValue);
    } catch (e) {
      // saving error
    }
  }

  const getUsuario = async () => {
    try {
      
      const jsonValue = await AsyncStorage.getItem('usuario')
      jsonValue != null ? JSON.parse(jsonValue) : null;

      if (!jsonValue) return;

      let usuario = JSON.parse(jsonValue);

      let obj = {
        email: usuario.email,
        senha: usuario.senha
      }

      setIsLogado(true);
      setUsuario(usuario);

      props.usuario = usuario;
      setRoute(<Cadastro props={props}/>);

      Axios.post(serverUrl + '/login', obj)
      .then((response) => {
            
        setIsLogado(true);
        setUsuario(response.data);

        props.usuario = response.data;
        setRoute(<Cadastro props={props}/>);

        storeData(response.data);

      });


    } catch(e) {
      
      console.log(e);
      // error reading value
    }
  }

  const [check, setCheck] = useState(false);

  if(!check) {

    setCheck(true);
    getUsuario();
  }

  return (
    <>
      <SafeAreaView>
        <View style={styles.title}>
          <Text style={styles.texto} >Sindplus Credenciamento</Text>
        </View>
        <View>
          <Buttons props={props}/>
        </View>
        {routes}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop:30,
    marginBottom:30
  },
  texto: {
    fontSize: 30,
    textAlign: "center"
  }
});

export default App;
