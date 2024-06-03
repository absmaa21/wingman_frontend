import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {contentTier, currencyUuid} from '../../statics/Mappings'
import {Color} from '../../Settings'
import {Image_VP} from "../../statics/Resources";
import PropTypes from "prop-types";
import {IStorefrontOffer} from "../../types/valapidocs.techchrism.me/STORE_ENDPOINTS/Storefront";
import {IWeaponSkin} from "../../types/valorant-api.com/Weapons/WeaponSkins.ts";

WeaponSkinCard.propTypes = {
    offer: PropTypes.object.isRequired,
    skinObject: PropTypes.object.isRequired,
    setShowWeaponScreen: PropTypes.func.isRequired,
    setChosenSkinOffer: PropTypes.func.isRequired,
}


export default function WeaponSkinCard(props: any) {
    const offer: IStorefrontOffer = props.offer;
    const skin: IWeaponSkin = props.skinObject;
    const contentTierUuid: string | null = skin.contentTierUuid;
    const contentTierHex: string | undefined = contentTier[contentTierUuid!];
    const price = offer.Cost[currencyUuid.VP];
    const skinImage = skin.displayIcon ? skin.displayIcon : skin.chromas[0].displayIcon!;

    if (!offer || !skin) {
        return (<Text>Skin not found.</Text>)
    }

    return (
        <TouchableOpacity
            key={offer.OfferID}
            style={[styles.container, {backgroundColor: contentTierHex}]}
            activeOpacity={0.75}
            onPress={() => {
                props.setChosenSkinOffer(offer);
                props.setShowWeaponScreen(true);
            }}
        >
            <Image source={{uri: skinImage}} resizeMode={'contain'} style={styles.itemImage}/>
            <Text style={styles.details}>{skin.displayName}</Text>
            <View style={styles.priceContainer}>
                <Image source={Image_VP} style={styles.currency}/>
                <Text style={styles.price}>{price}</Text>
            </View>
            <Image
                style={styles.contentTier}
                source={{uri: `https://media.valorant-api.com/contenttiers/${contentTierUuid}/displayicon.png`}}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        overflow: 'hidden',
        borderRadius: 12,
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
    contentTier: {
        position: 'absolute',
        width: 136,
        height: 136,
        zIndex: -1,
        left: -16,
        bottom: -32,
        opacity: 0.5,
    },
});
