import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Color} from '../../Settings';
import {Image_KP, Image_R, Image_VP} from '../../statics/Resources';

UserWallet.propTypes = {
    valorant_points: PropTypes.number,
    kingdom_points: PropTypes.number,
    radianite: PropTypes.number,
    kp_limit: PropTypes.number,
};

function UserWallet({valorant_points, kingdom_points, radianite, kp_limit}: any) {
    return (
        <View style={styles.playerCurrencyContainer}>
            {radianite >= 0 && (
                <View style={styles.currency}>
                    <Image source={Image_R} style={styles.currencyImage}/>
                    <Text style={styles.currencyText}>{radianite}</Text>
                </View>
            )}

            {valorant_points >= 0 && (
                <View style={styles.currency}>
                    <Image source={Image_VP} style={styles.currencyImage}/>
                    <Text style={styles.currencyText}>{valorant_points}</Text>
                </View>
            )}

            {kingdom_points >= 0 && (
                <View style={styles.currency}>
                    <Image style={styles.currencyImage} source={Image_KP}/>
                    <Text
                        style={[
                            styles.currencyText,
                            {color: kingdom_points >= kp_limit ? Color.red : Color.textSecondary},
                        ]}>
                        {kingdom_points}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    playerCurrencyContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: 4,
    },
    currency: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    },
    currencyImage: {
        width: 22,
        height: 22,
    },
    currencyText: {
        fontSize: 16,
        color: Color.textSecondary,
    },
});

export default UserWallet;
