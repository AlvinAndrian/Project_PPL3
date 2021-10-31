import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const List = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
                <View style={styles.box} >
                    <View style={{ flexDirection: 'row', fontFamily: 'Poppins-Light' }} >
                        <Image style={{ borderRadius: 10, left: 30 }} source={require('../assets/icons/tumbnail.png')} />
                        <Text style={{ paddingRight: 60, left: 50, fontFamily: 'Poppins-Bold', fontSize: 20 }}>Judul Aja</Text>
                        <Text style={{ left: -110, top: 30, fontSize: 15 }}> Jenisnya</Text>
                    </View>
                </View >
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.del}>
                    <Image source={require('../assets/icons/delete.png')} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default List

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#EAEAEA',
        borderRadius: 20,
        marginHorizontal: 45,
        marginTop: 20,
        paddingVertical: 20,
        right: 30
    },
    del: {
        left: -70,
        top: 10,
        backgroundColor: '#EAEAEA',
        paddingHorizontal: 20,
        paddingVertical: 40,
        borderRadius: 15
    }
})