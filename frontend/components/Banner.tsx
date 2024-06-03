import React from 'react';
import {StyleProp, Text, TextStyle, View, ViewStyle} from 'react-native';

interface IBanner {
    text: string;
    color?: string;
}

function Banner(props: IBanner) {
    const color = props.color ?? '#fff';
    const container: StyleProp<ViewStyle> = {
        position: 'absolute',
        backgroundColor: color,
        padding: 4,
        paddingHorizontal: 32,
        transform: [{rotateZ: '45deg'}],
        right: -32,
        top: 16,
    };
    const text: StyleProp<TextStyle> = {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    };
    return (
        <View style={container}>
            <Text style={text}>{props.text}</Text>
        </View>
    );
}

export default Banner;
