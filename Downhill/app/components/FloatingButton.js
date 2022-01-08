import React from 'react';
import { View, StyleSheet, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

export default class FloatingButton extends React.Component {
    animation = new Animated.Value(0);

    toggleMenu = () => {
        const toValue = this.open ? 0 : 1;

        Animated.spring(this.animation, {
            toValue,
            friction: 5,
            useNativeDriver: true
        }).start();

        this.open = !this.open;
    }

    render() {
        const videoStyle = {
            transform: [
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -80]
                    })
                }
            ]
        }

        const artikelStyle = {
            transform: [
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -140]
                    })
                }
            ]
        }

        const rotation = {
            transform: [
                {
                    rotate: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "180deg"]
                    })
                }
            ]
        };

        return (
            <View style={[styles.container, this.props.style]} >
                <TouchableWithoutFeedback onPress={this.props.onArtikel}>
                    <Animated.View style={[styles.button, styles.secondary, artikelStyle]}>
                        <Entypo name="images" size={20} color="#ffffff" />
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={this.props.onVideo}>
                    <Animated.View style={[styles.button, styles.secondary, videoStyle]}>
                        <Entypo name="controller-play" size={20} color="#ffffff" />
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={this.toggleMenu}>
                    <Animated.View style={[styles.button, styles.menu, rotation]}>
                        <AntDesign name="up" size={24} color="#ffffff" />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

// onPress={this.props.onVideo}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'absolute',
    },
    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 10,
        shadowColor: '#0C8EFF',
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 }
    },
    menu: {
        backgroundColor: "#0C8EFF",
    },
    secondary: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: "#0C8EFF",
    }
})