import axios from 'axios'
import React, { Component, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import HeaderDetail from '../components/headerDetail'
import Item from '../components/Item'
import SearchBar from '../components/searchBar'
import { useNavigation } from '@react-navigation/native';

const Detail = () => {

    const [name, setName] = useState("");
    const [umur, setUmur] = useState("");
    const [hobi, setHobi] = useState("");
    const [users, setUsers] = useState([]);
    const [button, setButton] = useState("Simpan");
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        getData();
    }, [])

    const deleteItem = (item) => {
        console.log(item);
        axios.delete(`http://10.0.2.2:3004/users/${item.id}`)
            .then(res => {
                console.log('Delete :', res);
                getData();
            })
    }

    const selectItem = (item) => {
        console.log('Selected Item', item)
        setSelectedUser(item);
        setName(item.name);
        setUmur(item.umur);
        setHobi(item.hobi);
        setButton("Update");
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
        <View style={styles.page}>
            <HeaderDetail />
            <SearchBar />
            <View style={{
                borderBottomWidth: 0.5, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,
                elevation: 4
            }} />
            <View style={styles.list}>
                {users.map(user => {
                    return <Item
                        key={user.id}
                        name={user.name}
                        umur={user.umur}
                        hobi={user.hobi}
                        onPress={() => selectItem(user)}
                        onDelete={() => Alert.alert(
                            'Peringatan',
                            'Anda yakin ingin mennghapus data ini ?', [
                            { text: 'Tidak', onPress: () => console.log('Button Tidak') },
                            { text: 'Ya', onPress: () => deleteItem(user) }
                        ])} />
                })}
            </View>
        </View >
    )
}

export default Detail

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    list: {
        margin: 20
    }
})
