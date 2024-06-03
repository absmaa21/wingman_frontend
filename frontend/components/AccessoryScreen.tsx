import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color} from '../../Settings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {currencyUuid} from '../../statics/Mappings';
import {getAccessoryByUuid} from "../helpers/ExtractFromGameContent";
import PropTypes from "prop-types";
import {IPlayerCard} from "../../types/valorant-api.com/PlayerCards/PlayerCards";
import {IStorefrontOffer} from "../../types/valapidocs.techchrism.me/STORE_ENDPOINTS/Storefront";
import {useApi} from "../contexts/apiContext";
import {Image_KP, Image_VP} from "../../statics/Resources";

AccessoryScreen.propType = {
    offer: PropTypes.object.isRequired,
    setShowAccessoryScreen: PropTypes.func.isRequired,
}

export default function AccessoryScreen(props: any) {
    const offer: IStorefrontOffer = props.offer
    const item: IPlayerCard = getAccessoryByUuid(offer.Rewards[0].ItemID, useApi()) as IPlayerCard;

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.header}>
                    <Text style={styles.itemName}>{item?.displayName}</Text>
                    <TouchableOpacity onPress={() => props.setShowAccessoryScreen(false)}>
                        <MaterialCommunityIcons name={'close'} color={Color.textSecondary} size={40}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    <Image
                        source={{uri: item?.wideArt}}
                        resizeMode={'contain'}
                        style={{width: '100%', aspectRatio: 452 / 128, borderRadius: 12}}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Image
                            source={{uri: item?.largeArt}}
                            resizeMode={'contain'}
                            style={{width: '48.5%', aspectRatio: 268 / 640, borderRadius: 12}}
                        />
                        <Image
                            source={{uri: item?.smallArt}}
                            resizeMode={'contain'}
                            style={{width: '48.5%', aspectRatio: 1, borderRadius: 12}}
                        />
                    </View>
                </View>

                <View style={styles.priceContainer}>
                    <Text
                        style={styles.priceText}>{offer.Cost[currencyUuid.KP] ? offer.Cost[currencyUuid.KP] : offer.Cost[currencyUuid.VP]}</Text>
                    <Image
                        style={styles.priceImage}
                        resizeMode={'contain'}
                        source={offer.Cost[currencyUuid.KP] ? Image_KP : Image_VP}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 42,
        padding: 32,
        backgroundColor: '#000a',
    },
    box: {
        width: '100%',
        borderRadius: 12,
        backgroundColor: Color.backgroundPrimary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 12,
        paddingTop: 4,
        paddingBottom: 0,
    },
    itemName: {
        color: Color.textSecondary,
        fontSize: 14,
        textTransform: 'uppercase',
        fontWeight: '500',
        maxWidth: '90%',
    },
    contentContainer: {
        paddingTop: 0,
        padding: 12,
        gap: 8,
    },
    priceContainer: {
        position: 'absolute',
        flexDirection: 'row',
        padding: 8,
        borderRadius: 12,
        gap: 6,
        bottom: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,.33)',
    },
    priceText: {
        fontSize: 16,
        fontWeight: '500',
        color: Color.textSecondary,
    },
    priceImage: {
        width: 24,
        height: 24,
    },
});
