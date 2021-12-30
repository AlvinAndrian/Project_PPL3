import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const HeaderTitle = ({ title }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleheader}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleheader: {
        flexDirection: 'row',
        fontFamily: 'Poppins-Light',
        fontSize: 15,
        color: 'black',
        marginLeft: 19,
        marginTop: 19,
    },
})

export default HeaderTitle;
