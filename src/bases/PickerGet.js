
import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { serverUrl } from '../../server';

const InputPickerGet = (props) => {


    storeName = props.storeName;
    propName = props.propName;
    url = props.url;
    label = props.label;
    data = props.data;

    props = props.props;

    const [selectedValue, setSelectedValue] = useState("");
    const [opcoes, setOpcoes] = useState([]);

    props.cadastro[propName] = selectedValue;

    const store = async (data) => {

        try {
            const jsonValue = JSON.stringify(data);
            await AsyncStorage.setItem(storeName, jsonValue);

        } catch (e) {
          // saving error
        }
    }

    const getStored = async () => {

        try {

            const jsonValue = await AsyncStorage.getItem(storeName)
            jsonValue != null ? JSON.parse(jsonValue) : null;

            let stored = JSON.parse(jsonValue);
            let temp = [<Picker.Item label={"selecione o "+ label} value="" />];

            stored.forEach(element => {
                temp.push(<Picker.Item label={element.nome} value={element.idOrg} />);
            });

            setOpcoes(temp);

        } catch (e) {
            console.log(e);
        }
    }

    const getOptsfsd = () => {

        // sem internet
        getStored();

        /// com internet
        Axios.get(serverUrl + "/"+ url +"/" + props.usuario._id + "/0/nome/$")
        .then((pages)=> {

            pages = pages.data;

            Axios.get(serverUrl + "/"+ url +"/" + props.usuario._id + "/0/"+ pages[0] +"/nome/$")
            .then((res)=> {

                store(res.data);

                let temp = [<Picker.Item label={"selecione o "+ label} value="" />];

                res.data.forEach(element => {
                    temp.push(<Picker.Item label={element.nome} value={element.idOrg} />);
                });

                setOpcoes(temp);
            });
        });
    }

    const getOpts = () => {

        // sem internet
        getStored();
        //com net
        store(data);

        let temp = [<Picker.Item label={"selecione o "+ label} value="" />];

        data.forEach(element => {
            temp.push(<Picker.Item label={element.nome} value={element.idOrg} />);
        });

        setOpcoes(temp);
    }

    const [check , setCheck] = useState(false);

    if (!check) {

        setCheck(true);
        getOpts();
    }

    return(
        <Picker
            selectedValue={selectedValue}
            style={{marginLeft:100, height: 100, width: 200}}
            itemStyle={{ fontSize:170 }}
            onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
            }>
            {opcoes}
        </Picker>
    );
}

export default InputPickerGet;