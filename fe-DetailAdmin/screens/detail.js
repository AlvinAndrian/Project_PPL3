import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import HeaderDetail from '../components/headerDetail'
import SearchBar from '../components/searchBar'
import List from '../components/list'

const Detail = () => {
    return (
        <View style={styles.page}>
            <HeaderDetail />
            <SearchBar />
            <View style={{
                borderBottomWidth: 0.5, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,
                elevation: 4
            }} />
            <ScrollView>
                <List />
                <List />
                <List />
            </ScrollView>
        </View>
    )
}

export default Detail

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
})
