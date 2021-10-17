import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HeaderInformation } from '../../components'
import List from '../../components/List'
import SearchBar from '../../components/SearchBar'

const Safety = () => {
    return (
        <View style={styles.page}>
            <HeaderInformation />
            <SearchBar />
            <List />
            <List />
            <List />
        </View >
    )
}

export default Safety

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
})
