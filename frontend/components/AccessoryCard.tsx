import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color} from '../../Settings';
import {currencyUuid} from '../../statics/Mappings';
import PropTypes from "prop-types";
import {getAccessoryByUuid} from "../helpers/ExtractFromGameContent";
import {IStorefrontOffer} from "../../types/valapidocs.techchrism.me/STORE_ENDPOINTS/Storefront";
import {useApi} from "../contexts/apiContext";
import {IBuddie} from "../../types/valorant-api.com/Buddies/Buddies";
import {IPlayerCard} from "../../types/valorant-api.com/PlayerCards/PlayerCards";
import {ISpray} from "../../types/valorant-api.com/Sprays/Sprays";
import {Image_KP, Image_VP} from "../../statics/Resources";
import {logInfo} from "../../backend/utils/log-system/log-system.ts";

AccessoryCard.propType = {
    offer: PropTypes.object.isRequired,
    setShowAccessoryScreen: PropTypes.func.isRequired,
    setChosenAccessoryOffer: PropTypes.func.isRequired,
}

export default function AccessoryCard(props: any) {
    const offer: IStorefrontOffer = props.offer

    if (!offer) {
        return <></>
    }

    const item: ISpray | IPlayerCard | IBuddie | undefined = getAccessoryByUuid(offer.Rewards[0].ItemID, useApi());
    const isPlayerCard =
        offer.Rewards[0].ItemTypeID != 'd5f120f8-ff8c-4aac-92ea-f2b5acbe9475' &&
        offer.Rewards[0].ItemTypeID != 'dd3bf334-87f3-40bd-b043-682a57a8dc3a';

    if (!item || !offer) {
        return (<Text>No Accessory found.</Text>)
    }

    return (
        <TouchableOpacity
            key={offer.OfferID}
            style={styles.container}
            activeOpacity={isPlayerCard ? 0.6 : 1}
            onPress={() => {
                props.setChosenAccessoryOffer(offer);
                if (isPlayerCard) {
                    props.setShowAccessoryScreen(true);
                }
            }}>
            <Image source={{uri: item.displayIcon}} resizeMode={'contain'} style={styles.itemImage}/>
            <Text style={styles.details}>{item.displayName}</Text>
            <View style={styles.priceContainer}>
                <Image source={offer.Cost[currencyUuid.KP] ? Image_KP : Image_VP} style={styles.currency}/>
                <Text
                    style={styles.price}>{offer.Cost[currencyUuid.KP] ? offer.Cost[currencyUuid.KP] : offer.Cost[currencyUuid.VP]}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        overflow: 'hidden',
        borderRadius: 12,
        backgroundColor: Color.backgroundSecondary,
    },
    itemImage: {
        width: '100%',
        height: 64,
    },
    details: {
        position: 'absolute',
        color: Color.textSecondary,
        fontSize: 14,
        bottom: 4,
        left: 8,
        textTransform: 'uppercase',
        fontWeight: '500',
    },
    priceContainer: {
        position: 'absolute',
        top: 4,
        right: 8,
        flexDirection: 'row',
    },
    price: {
        color: Color.textSecondary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    currency: {
        width: 20,
        height: 20,
        marginRight: 5,
        marginTop: 1,
    },
});
