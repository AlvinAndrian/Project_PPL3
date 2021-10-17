import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

const List = () => {
    return (
        <View style={styles.box}>
            <TouchableOpacity>
                <View style={{ flexDirection: 'row', fontFamily: 'Poppins-Light' }} >
                    <Image style={{ borderRadius: 10, left: 40 }} source={require('../../assets/images/tumbnail.jpg')} />
                    <Text style={{ left: 100, fontFamily: 'Poppins-Bold', fontSize: 20 }}>Judul Aja</Text>
                    <Text style={{ left: 1, top: 30, fontSize: 15 }}> Jenisnya</Text>
                </View>
            </TouchableOpacity>
        </View >
    )
}

export default List

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#EAEAEA',
        borderRadius: 20,
        marginHorizontal: 20,
        marginTop: 20,
        paddingVertical: 20
    },
})
