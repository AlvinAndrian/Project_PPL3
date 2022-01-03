import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Modal, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import CardVideoComponent from './CardVideoComponent';
import Icon from 'react-native-vector-icons/Feather'
import axios from 'axios';
import HeaderTitle from './HeaderTitle';

const initialFormVideo = {
    video_id: "",
    video_headings: "",
    video_desc: "",
    video_keyword: "",
    video_create_by: "",
    video_link: "",
}

const ListVideoRiding = () => {

    const [modalVisibleVideo, setModalVisibleVideo] = useState(false)
    const [users, setUsers] = useState([])
    const [formVideo, setFormVideo] = useState(initialFormVideo)

    // http://10.0.2.2:3004/video
    // http://127.0.0.1:8080

    const loadDataVideo = () => {
        axios.get('http://10.0.2.2:8080/api/video/data').then(resp => {
            setUsers(resp.data);
            loadDataVideo();
        });
    }

    // http://10.0.2.2:3004/video/
    // http://127.0.0.1:8080/

    const handleSave = () => {
        axios.put(`http://localhost:8080/api/video/${formVideo.video_id}`, formVideo).then(resp => {
            setFormVideo("")
            setModalVisibleVideo(false)
            setFormVideo(initialFormVideo)
            loadDataVideo();
        })
    }

    const handleTextInput = (name, text) => {
        setFormVideo({ ...formVideo, [name]: text })
    }

    const handleSelectedUser = (user) => {
        setFormVideo(user)
        setModalVisibleVideo(true)
    }

    const handleDeleteUser = (video_id) => {
        axios.delete(`http://localhost:8080/api/video/${video_id}`).then(resp => {
            loadDataVideo()
        })
    }

    useEffect(() => {
        loadDataVideo()
    }, [])


    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={({ item: user }) => <CardVideoComponent data={user} handleClicked={handleSelectedUser} handleDeleteUser={handleDeleteUser} />}
                keyExtractor={({ video_id }) => video_id}
            />
            <Modal
                visible={modalVisibleVideo}
                animationType='fade'
                presentationStyle='overFullScreen'
            >
                <ScrollView style={styles.centeredModal}>
                    <View style={styles.modal}>
                        <View>
                            <HeaderTitle title='Edit Data' />
                            <Text style={styles.subtitle}>Video Riding</Text>
                        </View>
                        <Icon
                            style={styles.cancel}
                            name='x'
                            size={24}
                            onPress={() => setModalVisibleVideo(false) || setFormVideo("")}
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
                                value={formVideo.video_headings}
                                placeholder="Masukan Judul"
                                onChangeText={(text) => handleTextInput('video_headings', text)}
                            />
                            <Text style={styles.title}>Deskripsi</Text>
                            <TextInput
                                style={styles.textinput}
                                value={formVideo.video_desc}
                                placeholder="Masukan Deskripsi"
                                onChangeText={(text) => handleTextInput('video_desc', text)}
                                multiline={true}
                                numberOfLines={5}
                            />
                            <Text style={styles.title}>Keyword</Text>
                            <TextInput
                                style={styles.textinput}
                                value={formVideo.video_keyword}
                                placeholder="Masukan Kata Kunci"
                                onChangeText={(text) => handleTextInput('video_keyword', text)}
                            />
                            <Text style={styles.title}>Created By</Text>
                            <TextInput
                                style={styles.textinput}
                                value={formVideo.video_create_by}
                                placeholder="Masukan Pembuat"
                                onChangeText={(text) => handleTextInput('video_create_by', text)}
                            />
                            <Text style={styles.title}>Url Video</Text>
                            <TextInput
                                style={styles.textinput}
                                value={formVideo.video_link}
                                placeholder="Masukan Url Video"
                                onChangeText={(text) => handleTextInput('video_link', text)}
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

export default ListVideoRiding;

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

