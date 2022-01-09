import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Modal, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import CardVideoComponent from './CardVideoComponent';
import Icon from 'react-native-vector-icons/Feather'
import axios from 'axios';
import HeaderTitle from './HeaderTitle';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import FloatingButton from '../components/FloatingButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Alert from "react-native-modal";

// nama idnya masih id belum video_id

const initialFormVideo = {
    id: "",
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
    const [search, setsearch] = useState('');
    const [iserror, setIsError] = useState(false);
    const [iscorrect, setIsCorrect] = useState(false);
    const [crudupdate, setCrudUpdate] = useState("");

    // https://feb0-180-253-2-149.ngrok.io/api/video
    // http://10.0.2.2:8080/api/video

    const loadDataVideo = () => {
        axios.get('http://10.0.2.2:3004/video').then(resp => {
            setUsers(resp.data);
            setMasterData(resp.data);
        })
    }

    const handleSave = (action) => {
        switch (action) {
            case 'CREATE': {
                if (formVideo.video_headings == "" || formVideo.video_desc == "" || formVideo.video_create_by == "" || formVideo.video_link == "") {
                    setIsError(!iserror);
                } else {
                    axios.post(`http://10.0.2.2:3004/video`, formVideo).then(resp => {
                        console.log("CREATE USER", resp);
                        loadDataVideo();
                        setIsCorrect(!iscorrect);
                        setFormVideo("")
                        setModalVisibleVideo(false)
                    })
                }
            }
                break;

            case 'UPDATE': {
                if (formVideo.video_headings == "" || formVideo.video_desc == "" || formVideo.video_create_by == "" || formVideo.video_link == "") {
                    setIsError(!iserror);
                } else {
                    axios.put(`http://10.0.2.2:3004/video/${formVideo.id}`, formVideo).then(resp => {
                        console.log("UPDATE USER", resp);
                        loadDataVideo();
                        setIsCorrect(!iscorrect);
                        setFormVideo("")
                        setModalVisibleVideo(false)
                        setFormVideo(initialFormVideo)
                    })
                }
            }
                break;
            default:
                break;
        }
    }

    const handleTextInput = (name, text) => {
        setFormVideo({ ...formVideo, [name]: text })
    }

    const handleSelectedUser = (user) => {
        setFormVideo(user)
        setCrudUpdate("UPDATE")
        setModalVisibleVideo(true)
    }

    const handleDeleteUser = (id) => {
        axios.delete(`http://10.0.2.2:3004/video/${id}`).then(resp => {
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
                    name='plus'
                    size={30}
                    color='#0C8EFF'
                    onPress={() =>
                        setModalVisibleVideo(!modalVisibleVideo)
                        || setCrudUpdate("SAVE")
                    }
                    style={{ left: 365, top: -50, position: 'absolute' }}
                />
            </TouchableOpacity>
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
                keyExtractor={({ id }) => id}
            />
            <FloatingButton style={{ bottom: 80, left: 350 }}
                onArtikel={() => navigation.navigate('ListTipsRiding')}
                onVideo={() => navigation.navigate('ListVideoRiding')}
            />
            <Modal
                visible={modalVisibleVideo}
                animationType='fade'
                presentationStyle='overFullScreen'
            >
                <ScrollView style={styles.centeredModal}>
                    <View style={styles.modal}>
                        <View>
                            <HeaderTitle title='Guidance and Information' />
                            <Text style={styles.subtitle}>Video Riding</Text>
                        </View>
                        <Icon
                            style={styles.cancel}
                            name='x'
                            size={24}
                            onPress={() =>
                                setModalVisibleVideo(false)
                                || setFormVideo("")
                            }
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
                            <Text style={styles.title}>Create By</Text>
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
                            onPress={() => {
                                if (!formVideo.id) {
                                    handleSave('CREATE')
                                } else {
                                    handleSave('UPDATE')
                                }
                            }}>
                            <Text style={{ color: '#ffffff' }}>{crudupdate}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Modal>
            <Alert isVisible={iserror} style={{ alignItems: 'center' }}>
                <View style={styles.alert}>
                    <Ionicons name="warning-outline" size={80} color="red" />
                    <Text style={styles.jwarning}>Warning !</Text>
                    <Text style={styles.kwarning}>Maaf, seluruh form{`\n`}harus terisi seluruhnya</Text>
                    <TouchableOpacity onPress={() => setIsError(false)}>
                        <Text style={styles.closeg}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Alert>
            <Alert isVisible={iscorrect} style={{ alignItems: 'center' }}>
                <View style={styles.alert}>
                    <Ionicons name="checkmark-circle-outline" size={80} color="#0C8EFF" />
                    <Text style={styles.jberhasil}>Berhasil !</Text>
                    <Text style={styles.kberhasil}>Permintaan anda{`\n`}berhasil kami terima</Text>
                    <TouchableOpacity onPress={() => setIsCorrect(false)}>
                        <Text style={styles.closeb}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Alert>
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
    page: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    kwarning: {
        color: 'black',
        marginBottom: 10,
        textAlign: 'center'
    },
    jwarning: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 28,
        marginBottom: 10
    },
    closeg: {
        color: 'white',
        backgroundColor: 'red',
        fontWeight: 'bold',
        fontSize: 18,
        width: 100,
        paddingVertical: 5,
        textAlign: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    alert: {
        width: 300,
        height: 300,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    jberhasil: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 28,
        marginBottom: 10
    },
    kberhasil: {
        color: 'black',
        marginBottom: 10,
        textAlign: 'center'
    },
    closeb: {
        color: 'white',
        backgroundColor: '#0C8EFF',
        fontWeight: 'bold',
        fontSize: 18,
        width: 100,
        paddingVertical: 5,
        textAlign: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
});

