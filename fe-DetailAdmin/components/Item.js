import React, { useEffect, useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Item = ({ name, umur, hobi, onPress, onDelete }) => {
    return (
        <View style={styles.List}>
            <View style={styles.Item}>
                <TouchableOpacity onPress={onPress} >
                    <Text style={styles.desc}>{name}</Text>
                    <Text style={styles.desc}>{umur}</Text>
                    <Text style={styles.desc}>{hobi}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onDelete}>
                <Text style={styles.delete}>X</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Item;

const styles = StyleSheet.create({
    desc: {
        color: "black",
        fontSize: 15,
    },
    Item: {
        flex: 1,
    },
    delete: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red'
    },
    List: {
        flexDirection: 'row',
        marginBottom: 10,
    }
})

