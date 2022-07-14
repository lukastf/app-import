
import React, { useState } from 'react';
import Input from '../../../bases/Input';

const InputFax = (props) => {

    props = props.props;

    const [fax , setFax] = useState(props.cadastro.fax);
    const faxHandler = text => setFax(text);

    return(
        <Input 
            nome={"Fax"} 
            value={fax}
            onChangeText={faxHandler}
        />
    );
}

export default InputFax;