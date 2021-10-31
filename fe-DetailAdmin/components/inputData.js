import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const InputData = ({ label, placeholder, isTextArea, onChangeText, namaState, value }) => {

    if (isTextArea) {
        return (
            <>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                    placeholder={placeholder}
                    multiline={true}
                    numberOfLines={10}
                    style={styles.textInputArea}
                    value={value}
                    onChangeText={(text) => onChangeText(namaState, text)}
                />
            </>
        )
    }

    return (
        <>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                placeholder={placeholder}
                style={styles.textInput}
                value={value}
                onChangeText={(text) => onChangeText(namaState, text)}
            />
        </>
    )
}

export default InputData

const styles = StyleSheet.create({
    label: {
        paddingTop: 30,
        paddingLeft: 45,
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        color: 'black'
    },
    textInput: {
        backgroundColor: '#DBDBDB',
        marginHorizontal: 40,
        marginTop: 2,
        width: 310,
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20
    },
    textInputArea: {
        textAlignVertical: 'top',
        backgroundColor: '#DBDBDB',
        marginHorizontal: 40,
        marginTop: 2,
        width: 310,
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20
    }
})
