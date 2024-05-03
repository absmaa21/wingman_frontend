import React from 'react';
import {Text, View} from 'react-native';
import {Color} from '../../../Settings';

const TemporaryScreen = () => {
    return (
        <View
            style={{backgroundColor: Color.backgroundPrimary, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: Color.textSecondary}}>This is a Temporary Screen.</Text>
        </View>
    );
};

export default TemporaryScreen;
