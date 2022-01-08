import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Modal, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import CardVideoComponent from './CardVideoComponent';
import Icon from 'react-native-vector-icons/Feather'
import axios from 'axios';
import HeaderTitle from './HeaderTitle';
import Feather from 'react-native-vector-icons/Feather';
import MenuPopup from "react-native-modal";
import { useNavigation } from '@react-navigation/native';

const initialFormVideo = {
    video_id: "",
    video_headings: "",
    video_desc: "",
    video_create_by: "",
    video_link: "",
}

const ListVideoRiding = () => {

    const navigation = useNavigation();

    const [modalVisibleVideo, setModalVisibleVideo] = useState(false)
    const [users, setUsers] = useState([]);
    const [masterData, setMasterData] = useState([]);
    const [formVideo, setFormVideo] = useState(initialFormVideo)
    const [isopen, setIsOpen] = useState(false);
    const [search, setsearch] = useState('');

    const loadDataVideo = () => {
        axios.get('http://10.0.2.2:3004/video').then(resp => {
            setUsers(resp.data);
            setMasterData(resp.data);
        });
    }

    const handleSave = () => {
        axios.put(`http://10.0.2.2:3004/video/${formVideo.video_id}`, formVideo).then(resp => {
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
        axios.delete(`http://10.0.2.2:3004/video/${video_id}`).then(resp => {
            loadDataVideo()
        })
    }

    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.video_headings ? item.video_headings.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setUsers(newData);
            setsearch(text);
        } else {
            setUsers(masterData);
            setsearch(text);
        }
    }

    useEffect(() => {
        loadDataVideo()
    }, [])

    return (
        <View style={styles.container}>
            <HeaderTitle title="Get Guidance and Information Video Riding" />
            <View
                style={{
                    position: 'relative',
                    marginLeft: 20,
                    marginRight: 55,
                    marginVertical: 10,
                }}>
                <TextInput
                    placeholder="Search Now"
                    value={search}
                    onChangeText={(text) => searchFilter(text)}
                    style={{
                        borderWidth: 1,
                        borderColor: '#EEEBEB',
                        borderRadius: 8,
                        fontSize: 18,
                        fontFamily: 'Poppins-ExtraLight',
                        paddingLeft: 60,
                        paddingRight: 20,
                        backgroundColor: '#EEEBEB',
                    }}
                />
                <Feather
                    name='search'
                    size={24}
                    color='#0C8EFF'
                    style={{ position: 'absolute', top: 13, left: 19, }}
                />
            </View>
            <TouchableOpacity>
                <Feather
                    name='menu'
                    size={30}
                    color='#0C8EFF'
                    onPress={() => setIsOpen(!isopen)}
                    style={{ left: 370, top: -50, position: 'absolute' }}
                />
            </TouchableOpacity>
            <MenuPopup isVisible={isopen} >
                <View style={styles.menu}>
                    <TouchableOpacity onPress={() => navigation.navigate('ListVideoRiding') || setIsOpen(false)}>
                        <Text style={styles.pil1}>Video Riding</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ListTipsRiding') || setIsOpen(false)}>
                        <Text style={styles.pil2}>Tips Riding</Text>
                    </TouchableOpacity>
                </View>
            </MenuPopup>
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
    },
    menu: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        margin: 40,
        position: 'absolute',
        top: 60,
        left: 190,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    pil1: {
        backgroundColor: "#0C8EFF",
        color: "#FFFFFF",
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 5,
        borderRadius: 5,
        textAlign: "center",
    },
    pil2: {
        backgroundColor: "#0C8EFF",
        color: "#FFFFFF",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        textAlign: "center",
    },
});

