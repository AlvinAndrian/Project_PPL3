import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Modal, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import CardImageComponent from './CardImageComponent';
import Icon from 'react-native-vector-icons/Feather'
import axios from 'axios';
import HeaderTitle from './HeaderTitle';

const initialFormImage = {
    image_id: "",
    image_headings: "",
    image_desc: "",
    image_created_by: "",
    image_link: "",
    image_keyword: "",
}

const ListTipsRiding = () => {

    const [modalVisibleImage, setModalVisibleImage] = useState(false)
    const [users, setUsers] = useState([])
    const [formImage, setFormImage] = useState(initialFormImage)

    const loadDataImage = () => {
        axios.get('https://6188e136d0821900178d75ad.mockapi.io/Admin/v1/image').then(resp => {
            setUsers(resp.data)
            loadDataImage();
        });
    }

    const handleSave = () => {
        axios.put(`https://6188e136d0821900178d75ad.mockapi.io/Admin/v1/image/${formImage.image_id}`, formImage).then(resp => {
            setFormImage("")
            setModalVisibleImage(false)
            setFormImage(initialFormImage)
            loadDataImage();
        })
    }

    const handleTextInput = (name, text) => {
        setFormImage({ ...formImage, [name]: text })
    }

    const handleSelectedUser = (user) => {
        setFormImage(user)
        setModalVisibleImage(true)
    }

    const handleDeleteUser = (image_id) => {

        axios.delete(`https://6188e136d0821900178d75ad.mockapi.io/Admin/v1/image/${image_id}`).then(resp => {
            loadDataImage()
        })
    }

    useEffect(() => {
        loadDataImage()
    }, [])


    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={({ item: user }) => <CardImageComponent data={user} handleClicked={handleSelectedUser} handleDeleteUser={handleDeleteUser} />}
                keyExtractor={({ image_id }) => image_id}
            />
            <Modal
                visible={modalVisibleImage}
                animationType='fade'
                presentationStyle='overFullScreen'
            >
                <ScrollView style={styles.centeredModal}>
                    <View style={styles.modal}>
                        <View>
                            <HeaderTitle title='Edit Data' />
                            <Text style={styles.subtitle}>Tips Riding</Text>
                        </View>
                        <Icon
                            style={styles.cancel}
                            name='x'
                            size={24}
                            onPress={() => setModalVisibleImage(false) || setFormImage("")}
                        />
                        <View
                            style={{
                                borderBottomWidth: 0.5,
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 6,
                                },
                                shadowOpacity: 0.37,
                                shadowRadius: 7.49,
                                elevation: 4,
                            }}
                        />
                        <View style={styles.modalView}>
                            <Text style={styles.title}>Judul</Text>
                            <TextInput
                                style={styles.textinput}
                                value={formImage.image_headings}
                                placeholder="Masukan Judul"
                                onChangeText={(text) => handleTextInput('image_headings', text)}
                            />
                            <Text style={styles.title}>Deskripsi</Text>
                            <TextInput
                                style={styles.textinput}
                                value={formImage.image_desc}
                                placeholder="Masukan Deskripsi"
                                onChangeText={(text) => handleTextInput('image_desc', text)}
                                multiline={true}
                                numberOfLines={5}
                            />
                            <Text style={styles.title}>Keyword</Text>
                            <TextInput
                                style={styles.textinput}
                                value={formImage.image_keyword}
                                placeholder="Masukan Kata Kunci"
                                onChangeText={(text) => handleTextInput('image_keyword', text)}
                            />
                            <Text style={styles.title}>Created By</Text>
                            <TextInput
                                style={styles.textinput}
                                value={formImage.image_created_by}
                                placeholder="Masukan Pembuat"
                                onChangeText={(text) => handleTextInput('image_created_by', text)}
                            />
                            <Text style={styles.title}>Url Image</Text>
                            <TextInput
                                style={styles.textinput}
                                value={formImage.image_link}
                                placeholder="Masukan Url Image"
                                onChangeText={(text) => handleTextInput('image_link', text)}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.submit}
                            onPress={() => handleSave()}>
                            <Text style={{ color: '#ffffff' }}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Modal>
        </View >
    );
};

export default ListTipsRiding;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    centeredModal: {
        flex: 1,
    },
    modalView: {
        backgroundColor: "#ffffff",
        borderRadius: 8,
        margin: 16,
    },
    modal: {
        backgroundColor: "#ffffff",
        borderRadius: 8,
    },
    subtitle: {
        fontSize: 30,
        marginLeft: 19,
        fontFamily: 'Poppins-Bold',
        color: 'black',
        bottom: 8,
    },
    cancel: {
        position: 'absolute',
        top: 15,
        right: 20,
    },
    title: {
        color: 'black',
        fontFamily: 'poppins-light',
    },
    textinput: {
        backgroundColor: '#EDEDED',
        borderRadius: 8,
        marginVertical: 5,
        paddingHorizontal: 15,
    },
    submit: {
        backgroundColor: '#0C8EFF',
        alignItems: 'center',
        marginBottom: 30,
        marginHorizontal: 120,
        padding: 10,
        borderRadius: 8
    }
});

