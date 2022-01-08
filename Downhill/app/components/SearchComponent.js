import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const SearchComponent = () => {
    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{
                        position: 'relative',
                        flex: 1,
                        marginLeft: 20,
                        marginRight: 45,
                        marginVertical: 10,
                    }}>
                    <TextInput
                        placeholder="Search Now"
                        style={{
                            borderWidth: 1,
                            borderColor: '#EEEBEB',
                            borderRadius: 8,
                            fontSize: 18,
                            fontFamily: 'Poppins-ExtraLight',
                            paddingLeft: 60,
                            paddingRight: 20,
                            backgroundColor: '#EEEBEB',
                        }}
                    />
                    <Feather
                        name='search'
                        size={24}
                        color='#0C8EFF'
                        style={{ position: 'absolute', top: 13, left: 19, }}
                    />
                </View>
                <TouchableOpacity>
                    <Feather
                        name='menu'
                        size={30}
                        color='#0C8EFF'
                        onPress={() => setIsOpen(!isopen)}
                    />
                </TouchableOpacity>
                <MenuPopup isVisible={isopen} >
                    <View style={styles.menu}>
                        <TouchableOpacity onPress={() => navigation.navigate('ListVideoRiding') || setIsOpen(false)}>
                            <Text style={styles.pil1}>Video Riding</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ListTipsRiding') || setIsOpen(false)}>
                            <Text style={styles.pil2}>Tips Riding</Text>
                        </TouchableOpacity>
                    </View>
                </MenuPopup>
            </View>
        </View >
    );
};

export default SearchComponent;

const styles = StyleSheet.create({
});
