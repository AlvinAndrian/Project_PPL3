import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, Text, Alert } from 'react-native'
import InputData from './inputData'

export default class CreateTips extends Component {
    constructor(props) {
        super(props)

        this.state = {
            judul: '',
            subjudul: '',
            deskripsi: '',
            keyword: '',
            penulis: ''
        }
    }

    onChangeText = (namaState, value) => {
        this.setState({
            [namaState]: value
        })
    }

    onSubmit = () => {
        if (this.state.judul && this.state.subjudul && this.state.deskripsi && this.state.keyword && this.state.penulis) {
            console.log("Masuk Submit");
            console.log(this.state);
        } else {
            Alert.alert('ERROR', 'harap mengisi semua sebelum dikirimkan');
        }

    }

    render() {
        return (
            <ScrollView>
                <InputData
                    label="Judul"
                    placeholder="Masukan Judul"
                    onChangeText={this.onChangeText}
                    value={this.state.judul}
                    namaState="judul"
                />
                <InputData
                    label="Sub Judul"
                    placeholder="Masukan Sub Judul"
                    onChangeText={this.onChangeText}
                    value={this.state.subjudul}
                    namaState="subjudul"
                />
                <InputData
                    label="Deskripsi"
                    placeholder="Masukan Deskripsi"
                    isTextArea={true}
                    onChangeText={this.onChangeText}
                    value={this.state.deskripsi}
                    namaState="deskripsi"
                />
                <InputData
                    label="Kata Kunci"
                    placeholder="Masukan Kata Kunci"
                    onChangeText={this.onChangeText}
                    value={this.state.keyword}
                    namaState="keyword"
                />
                <InputData
                    label="Penulis"
                    placeholder="Masukan Penulis"
                    onChangeText={this.onChangeText}
                    value={this.state.penulis}
                    namaState="penulis"
                />
                <TouchableOpacity style={styles.tombol} onPress={() => this.onSubmit()}>
                    <Text style={styles.texttombol}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    tombol: {
        backgroundColor: '#0C8EFF',
        marginTop: 30,
        marginBottom: 30,
        marginHorizontal: 140,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderRadius: 3,

    },
    texttombol: {
        color: '#FFFFFF',
        fontFamily: 'Poppins-Medium'
    }
})