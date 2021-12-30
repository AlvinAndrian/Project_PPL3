import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MenuPopup from "react-native-modal";
import { useNavigation } from '@react-navigation/native';

const SearchComponent = () => {

    const [isopen, setIsOpen] = useState(false);

    const navigation = useNavigation();
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
                <TouchableOpacity
                    style={{
                        width: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: -1,
                        right: 25,
                    }}>
                    <Feather
                        name='menu'
                        size={30}
                        color='#0C8EFF'
                        style={{ position: 'absolute', top: 20, left: 5, }}
                        onPress={() => setIsOpen(!isopen)}
                    />
                </TouchableOpacity>
            </View>

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
        </View >
    );
};

export default SearchComponent;

const styles = StyleSheet.create({
    menu: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        margin: 40,
        position: 'absolute',
        top: 60,
        left: 190,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    pil1: {
        backgroundColor: "#0C8EFF",
        color: "#FFFFFF",
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 5,
        borderRadius: 5,
        textAlign: "center",
    },
    pil2: {
        backgroundColor: "#0C8EFF",
        color: "#FFFFFF",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        textAlign: "center",
    },
});
