import React, { useState } from 'react';
import { StyleSheet, View, Modal, ScrollView, Text, TextInput, TouchableOpacity, Sequence } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListVideoRiding from '../components/ListVideoRiding';
import ListTipsRiding from '../components/ListTipsRiding';
import HeaderTitle from '../components/HeaderTitle';
import SearchComponent from '../components/SearchComponent';
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
  const [video_keyword, setVideo_Keyword] = useState('');

  const [iserror, setIsError] = useState(false);
  const [iscorrect, setIsCorrect] = useState(false);

  const [modalVisibleImage, setModalVisibleImage] = useState(false);
  const [image_headings, setImage_Headings] = useState('');
  const [image_desc, setImage_Desc] = useState('');
  const [image_create_by, setImage_Create_By] = useState('');
  const [image_link, setImage_Link] = useState('');
  const [image_keyword, setImage_Keyword] = useState('');

  const handleSaveVideo = () => {
    const formVideo = {
      video_headings,
      video_desc,
      video_create_by,
      video_link,
      video_keyword,
    };

    // http://10.0.2.2:3004/video
    // http://127.0.0.1:8080
    // https://6188e136d0821900178d75ad.mockapi.io/Admin/v1/video

    if (video_headings == '' || video_desc == '' || video_create_by == '' || video_link == '' || video_keyword == '') {
      setIsError(!iserror);
    } else {
      axios.post(`http://localhost:8080/api/video`, formVideo).then(resp => {
        console.log("CREATE DATA", resp);
        setIsCorrect(!iscorrect);
        setModalVisibleVideo(false);
        setVideo_Headings("");
        setVideo_Desc("");
        setVideo_Create_By("");
        setVideo_Link("");
        setVideo_Keyword("");
        loadData();
      })
    }
  }

  const handleSaveImage = () => {
    const formImage = {
      // image_id,
      image_headings,
      image_desc,
      image_create_by,
      image_link,
      image_keyword,
    };

    if (image_headings == '' || image_desc == '' || image_create_by == '' || image_link == '' || image_keyword == '') {
      setIsError(!iserror);
    } else {
      axios.post(`https://6188e136d0821900178d75ad.mockapi.io/Admin/v1/image`, formImage).then(resp => {
        console.log("CREATE DATA", resp);
        setIsCorrect(!iscorrect);
        setModalVisibleImage(false);
        setImage_Headings("");
        setImage_Desc("");
        setImage_Create_By("");
        setImage_Link("");
        setImage_Keyword("");
        loadData();
      })
    }
  }

  return (
    <View style={styles.page}>
      <HeaderTitle title="List Get Guidance and Information" />
      <SearchComponent />
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
        onImage={() => setModalVisibleImage(!modalVisibleImage)}
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
                || setVideo_Link("")
                || setImage_Keyword("")}
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
              <Text style={styles.title}>Keyword</Text>
              <TextInput
                style={styles.textinput}
                value={video_keyword}
                placeholder="Masukan Kata Kunci"
                onChangeText={value => setVideo_Keyword(value)}
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
      {/* ====================== MODAL IMAGE =========================== */}
      <Modal
        visible={modalVisibleImage}
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
                setModalVisibleImage(false)
                || setImage_Headings("")
                || setImage_Desc("")
                || setImage_Create_By("")
                || setImage_Link("")
                || setImage_Keyword("")}
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
                value={image_headings}
                placeholder="Masukan Judul"
                onChangeText={value => setImage_Headings(value)}
              />
              <Text style={styles.title}>Deskripsi</Text>
              <TextInput
                style={styles.textinput}
                value={image_desc}
                placeholder="Masukan Deskripsi"
                onChangeText={value => setImage_Desc(value)}
                multiline={true}
                numberOfLines={5}
              />
              <Text style={styles.title}>Keyword</Text>
              <TextInput
                style={styles.textinput}
                value={image_keyword}
                placeholder="Masukan Kata Kunci"
                onChangeText={value => setImage_Keyword(value)}
              />
              <Text style={styles.title}>Created By</Text>
              <TextInput
                style={styles.textinput}
                value={image_create_by}
                placeholder="Masukan Pembuat"
                onChangeText={value => setImage_Create_By(value)}
              />
              <Text style={styles.title}>Url Image</Text>
              <TextInput
                style={styles.textinput}
                value={image_link}
                placeholder="Masukan Url Image"
                onChangeText={value => setImage_Link(value)}
              />
            </View>
            <TouchableOpacity
              style={styles.submit}
              onPress={() => { handleSaveImage() }}>
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