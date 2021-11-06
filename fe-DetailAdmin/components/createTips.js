import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const CreateTips = () => {

    const [name, setName] = useState("");
    const [umur, setUmur] = useState("");
    const [hobi, setHobi] = useState("");
    const [users, setUsers] = useState([]);
    const [button, setButton] = useState("Simpan");
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        getData();
    }, [])

    const submit = () => {
        const data = {
            name,
            umur,
            hobi,
        }
        if (button === 'Simpan') {
            axios.post('http://10.0.2.2:3004/users', data)
                .then(res => {
                    console.log('Respons : ', res)
                    setName("");
                    setUmur("");
                    setHobi("");
                    getData();
                });
        } else if (button === 'Update') {
            axios.put(`http://10.0.2.2:3004/users/${selectedUser.id}`, data)
                .then(res => {
                    console.log('Update : ', res);
                    setName("");
                    setUmur("");
                    setHobi("");
                    getData();
                    setButton("Simpan");
                })
        }
    }

    const getData = () => {
        axios.get('http://10.0.2.2:3004/users')
            .then(res => {
                console.log('Respons : ', res);
                setUsers(res.data);
            })
    }

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Call API dengan JSON SERVER</Text>
            <Text>Masukan Anggota Keluarga</Text>
            <TextInput placeholder="Masukan Nama" style={styles.textInput} value={name} onChangeText={(value) => setName(value)} />
            <TextInput placeholder="Masukan Umur" style={styles.textInput} value={umur} onChangeText={(value) => setUmur(value)} />
            <TextInput placeholder="Masukan Hobi" style={styles.textInput} value={hobi} onChangeText={(value) => setHobi(value)} />
            <Button title={button} onPress={submit} />
            <View style={styles.line} />
        </View>
    )
}

export default CreateTips

const styles = StyleSheet.create({
    container: {
        padding: 30,
    },
    text: {
        textAlign: 'center',
        marginBottom: 10,
    },
    textInput: {
        borderWidth: 2,
        borderColor: 'black',
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 20,
    },
    line: {
        height: 2,
        backgroundColor: "black",
        marginVertical: 10,
    },
    desc: {
        color: "black",
        fontSize: 15,
    },
    Item: {
        flex: 1,
    },
    delete: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red'
    },
    List: {
        flexDirection: 'row',
        marginBottom: 10,
    }
})
