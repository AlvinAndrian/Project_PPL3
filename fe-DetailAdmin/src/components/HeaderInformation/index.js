import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { IconArrowLeft } from '../../assets'

const HeaderInformation = () => {
    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.titleheader}>Detail Admin</Text>
            </View>
            <TouchableOpacity style={styles.arrowleft}>
                <IconArrowLeft />
            </TouchableOpacity>
        </View >
    )
}

export default HeaderInformation

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleheader: {
        flexDirection: 'row',
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 18,
        color: 'black',
        paddingHorizontal: 40,
        paddingTop: 30,
    },
    arrowleft: {
        paddingHorizontal: 50,
        paddingTop: 30,
    },
})
