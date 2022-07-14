
import React from 'react';
import {Picker} from '@react-native-community/picker';

const EstadosInput = (props) => {

    return(
        <Picker
            selectedValue={props.value}
            style={{height: 50, width: 100}}
            onValueChange={ option => props.setValue(option) }>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
        </Picker>
    );
}

export default EstadosInput;