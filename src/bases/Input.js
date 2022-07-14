
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = (props) => {

    //const [value, setValue] = React.useState('');

    return (
        <View>
          <Text style={styles.text}> {props.nome} </Text>
          <TextInput 
            style={styles.textInput}
            //onChangeText={text => props.setValue(text)}
            keyboardType={props.keyboardType}
            onChangeText={props.onChangeText}
            value={props.value} 
            multiline={props.multiline}
            numberOfLines={props.numberOfLines}
            secureTextEntry={props.secureTextEntry}
            maxLength={props.maxLength}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        
        textAlign: "center"
    },
    textInput: {
        fontSize: 20,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: 60,
        marginRight: 60,
        marginBottom: 20
    }
})

export default Input;