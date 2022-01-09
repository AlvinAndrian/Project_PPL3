import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import Alert from "react-native-modal";

const CardVideoComponent = ({ data, handleClicked, handleDeleteUser }) => {

    const [isdelete, setIsDelete] = useState(false);

    return (
        <View >
            <TouchableOpacity style={styles.list} onPress={() => handleClicked(data)}>
                <Text style={styles.judul} numberOfLines={1}>{data.video_headings}</Text>
                <Text style={styles.deskripsi} numberOfLines={2}>{data.video_desc}</Text>
                <Text style={styles.penulis}>{data.video_create_by}</Text>
                <Icon
                    name='x'
                    size={24}
                    style={styles.delete}
                    onPress={() => setIsDelete(!isdelete)}
                />
            </TouchableOpacity>
            <Alert isVisible={isdelete} style={{ alignItems: 'center' }}>
                <View style={styles.alert}>
                    <Text style={styles.jdelete}>Konfirmasi</Text>
                    <Text style={styles.kdelete}>Apakah anda yakin{`\n`}ingin menghapus data ini ?</Text>
                    <TouchableOpacity style={styles.buttonTidak} onPress={() => setIsDelete(false)}>
                        <Text style={styles.tidakdelete}>Tidak</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonYa} onPress={() => handleDeleteUser(data.id)}>
                        <Text style={styles.yadelete}>Ya</Text>
                    </TouchableOpacity>
                </View>
            </Alert>
        </View >
    );
}

export default CardVideoComponent;

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#DBDBDB',
        display: 'flex',
        borderRadius: 8,
        borderRadius: 8,
        marginVertical: 5,
        marginLeft: 15,
        marginRight: 15,
        paddingLeft: 35,
        paddingVertical: 15
    },
    delete: {
        position: 'absolute',
        top: -5,
        right: 5,
        paddingHorizontal: 30,
        paddingVertical: 50.1,
        display: 'flex',
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
    },
    judul: {
        fontSize: 20,
        color: 'black',
        width: 165,
        fontWeight: 'bold',
    },
    deskripsi: {
        fontSize: 15,
        color: 'black',
        width: 165,
        fontFamily: 'Poppins-Light',
    },
    penulis: {
        fontSize: 15,
        color: 'black',
        fontFamily: 'Poppins-Medium',
    },
    jdelete: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 30,
        marginBottom: 10,
        marginTop: 20
    },
    kdelete: {
        fontSize: 15,
        color: 'black',
        marginBottom: 10,
        textAlign: 'center'
    },
    alert: {
        width: 300,
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    yadelete: {
        position: 'absolute',
        color: 'white',
        backgroundColor: '#0C8EFF',
        fontWeight: 'bold',
        fontSize: 18,
        width: 100,
        paddingVertical: 5,
        textAlign: 'center',
        borderRadius: 5,
        marginTop: 10,
        left: 20,
    },
    tidakdelete: {
        position: 'absolute',
        color: 'white',
        backgroundColor: '#FF0000',
        fontWeight: 'bold',
        fontSize: 18,
        width: 100,
        paddingVertical: 5,
        textAlign: 'center',
        borderRadius: 5,
        marginTop: 10,
        right: 20,
    }
})