import React, { useState } from 'react';
import { StyleSheet, View, Modal, ScrollView, Text, TextInput, TouchableOpacity, Sequence } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListVideoRiding from '../components/ListVideoRiding';
import ListTipsRiding from '../components/ListTipsRiding';
import HeaderTitle from '../components/HeaderTitle';
import FloatingButton from '../components/FloatingButton';
import Icon from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Alert from "react-native-modal";

const RootStack = createNativeStackNavigator();

const Safety = () => {

  const [modalVisibleVideo, setModalVisibleVideo] = useState(false);
  const [video_headings, setVideo_Headings] = useState('');
  const [video_desc, setVideo_Desc] = useState('');
  const [video_create_by, setVideo_Create_By] = useState('');
  const [video_link, setVideo_Link] = useState('');

  const [iserror, setIsError] = useState(false);
  const [iscorrect, setIsCorrect] = useState(false);

  const [modalVisibleArtikel, setModalVisibleArtikel] = useState(false);
  const [artikel_headings, setArtikel_Headings] = useState('');
  const [artikel_desc, setArtikel_Desc] = useState('');
  const [artikel_create_by, setArtikel_Create_By] = useState('');
  const [artikel_link, setArtikel_Link] = useState('');
  const [artikel_image, setArtikel_Image] = useState('');

  const handleSaveVideo = () => {
    const formVideo = {
      video_headings,
      video_desc,
      video_create_by,
      video_link,
    };

    if (video_headings == '' || video_desc == '' || video_create_by == '' || video_link == '') {
      setIsError(!iserror);
    } else {
      axios.post(`http://10.0.2.2:3004/video`, formVideo).then(resp => {
        console.log("CREATE DATA", resp);
        setIsCorrect(!iscorrect);
        setModalVisibleVideo(false);
        setVideo_Headings("");
        setVideo_Desc("");
        setVideo_Create_By("");
        setVideo_Link("");
      })
    }
  }

  const handleSaveArtikel = () => {
    const formArtikel = {
      artikel_headings,
      artikel_desc,
      artikel_create_by,
      artikel_link,
      artikel_image,
    };

    if (artikel_headings == '' || artikel_desc == '' || artikel_create_by == '' || artikel_link == '' || artikel_image == '') {
      setIsError(!iserror);
    } else {
      axios.post(`http://10.0.2.2:3005/artikel`, formArtikel).then(resp => {
        console.log("CREATE DATA", resp);
        setIsCorrect(!iscorrect);
        setModalVisibleArtikel(false);
        setArtikel_Headings("");
        setArtikel_Desc("");
        setArtikel_Create_By("");
        setArtikel_Link("");
        setArtikel_Image("");
      })
    }
  }

  return (
    <View style={styles.page}>
      <RootStack.Navigator >
        <RootStack.Screen
          name="ListVideoRiding"
          component={ListVideoRiding}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="ListTipsRiding"
          component={ListTipsRiding}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
      <FloatingButton style={{ bottom: 80, left: 350 }}
        onVideo={() => setModalVisibleVideo(!modalVisibleVideo)}
        onArtikel={() => setModalVisibleArtikel(!modalVisibleArtikel)}
      />
      {/* ====================== MODAL VIDEO =========================== */}
      <Modal
        visible={modalVisibleVideo}
        animationType='fade'
        presentationStyle='overFullScreen'
      >
        <ScrollView style={styles.centeredModal}>
          <View style={styles.modal}>
            <View>
              <HeaderTitle title='Create Data' />
              <Text style={styles.subtitle}>Video Riding</Text>
            </View>
            <Icon
              style={styles.cancel}
              name='x'
              size={24}
              onPress={() =>
                setModalVisibleVideo(false)
                || setVideo_Headings("")
                || setVideo_Desc("")
                || setVideo_Create_By("")
                || setVideo_Link("")}
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
                value={video_headings}
                placeholder="Masukan Judul"
                onChangeText={value => setVideo_Headings(value)}
              />
              <Text style={styles.title}>Deskripsi</Text>
              <TextInput
                style={styles.textinput}
                value={video_desc}
                placeholder="Masukan Deskripsi"
                onChangeText={value => setVideo_Desc(value)}
                multiline={true}
                numberOfLines={5}
              />
              <Text style={styles.title}>Created By</Text>
              <TextInput
                style={styles.textinput}
                value={video_create_by}
                placeholder="Masukan Pembuat"
                onChangeText={value => setVideo_Create_By(value)}
              />
              <Text style={styles.title}>Url Video</Text>
              <TextInput
                style={styles.textinput}
                value={video_link}
                placeholder="Masukan Url Video"
                onChangeText={value => setVideo_Link(value)}
              />
            </View>
            <TouchableOpacity
              style={styles.submit}
              onPress={() => { handleSaveVideo() }}>
              <Text style={{ color: '#ffffff' }}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
      {/* ====================== MODAL Artikel =========================== */}
      <Modal
        visible={modalVisibleArtikel}
        animationType='fade'
        presentationStyle='overFullScreen'
      >
        <ScrollView style={styles.centeredModal}>
          <View style={styles.modal}>
            <View>
              <HeaderTitle title='Create Data' />
              <Text style={styles.subtitle}>Tips Riding</Text>
            </View>
            <Icon
              style={styles.cancel}
              name='x'
              size={24}
              onPress={() =>
                setModalVisibleArtikel(false)
                || setArtikel_Headings("")
                || setArtikel_Desc("")
                || setArtikel_Create_By("")
                || setArtikel_Link("")
                || setArtikel_Image("")}
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
                value={artikel_headings}
                placeholder="Masukan Judul"
                onChangeText={value => setArtikel_Headings(value)}
              />
              <Text style={styles.title}>Deskripsi</Text>
              <TextInput
                style={styles.textinput}
                value={artikel_desc}
                placeholder="Masukan Deskripsi"
                onChangeText={value => setArtikel_Desc(value)}
                multiline={true}
                numberOfLines={5}
              />
              <Text style={styles.title}>Created By</Text>
              <TextInput
                style={styles.textinput}
                value={artikel_create_by}
                placeholder="Masukan Pembuat"
                onChangeText={value => setArtikel_Create_By(value)}
              />
              <Text style={styles.title}>Url Artikel</Text>
              <TextInput
                style={styles.textinput}
                value={artikel_link}
                placeholder="Masukan Url Artikel"
                onChangeText={value => setArtikel_Link(value)}
              />
              <Text style={styles.title}>Url Image</Text>
              <TextInput
                style={styles.textinput}
                value={artikel_image}
                placeholder="Masukan Url Image"
                onChangeText={value => setArtikel_Image(value)}
              />
            </View>
            <TouchableOpacity
              style={styles.submit}
              onPress={() => { handleSaveArtikel() }}>
              <Text style={{ color: '#ffffff' }}>SAVE</Text>
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
    </View>
  );
};

export default Safety;

const styles = StyleSheet.create({
  page: {
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