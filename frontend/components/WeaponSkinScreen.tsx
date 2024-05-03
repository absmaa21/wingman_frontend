import React from 'react';
import {Image, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';
import {Color, Settings} from '../../Settings';
import {useEffect, useRef, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Video, {VideoRef} from 'react-native-video';
import {useIsFocused} from '@react-navigation/native';
import {currencyUuid} from '../../statics/Mappings';
import PropTypes from "prop-types";

WeaponSkinScreen.propTypes = {
    offer: PropTypes.object.isRequired,
    skinObject: PropTypes.object.isRequired,
    setShowWeaponScreen: PropTypes.func.isRequired,
}

export default function WeaponSkinScreen(props: any) {
    const offer = props.offer
    const skin = props.skinObject;
    const contentTierUuid: any = skin.contentTierUuid;

    let upgradePrice: number = 0;
    const videoMapping: any = {};
    const imageMapping: any = {};

    skin.chromas.forEach((chroma: {[x: string]: any}) => {
        videoMapping[chroma.uuid] = chroma.streamedVideo;
        if (chroma.streamedVideo !== null) {
            videoMapping.fallback = chroma.streamedVideo;
        }

        imageMapping[chroma.uuid] = chroma.fullRender;
        if (chroma.fullRender !== null) {
            imageMapping.fallback = chroma.fullRender;
        }
    });
    skin.levels.forEach((level: {[x: string]: any}) => {
        videoMapping[level.uuid] = level.streamedVideo;
        if (level.streamedVideo !== null) {
            videoMapping.fallback = level.streamedVideo;
        }

        imageMapping[level.uuid] = level.displayIcon;
        if (level.displayIcon !== null) {
            imageMapping.fallback = level.displayIcon;
        }
    });

    const showVideo = imageMapping.fallback !== null && Settings.showVideos;
    const showVariants = skin.chromas.length > 1;

    const renderVariantButton = (chroma: any, index: number) => {
        if (index == 0) {
            return;
        }
        upgradePrice += 15;
        return (
            <TouchableOpacity
                key={chroma + index}
                style={[
                    styles.variantBtn,
                    {backgroundColor: chroma.uuid === chosenSkinUUID ? Color.accent : Color.backgroundSecondary},
                ]}
                onPress={() => setChosenSkinUUID(chroma.uuid)}
                activeOpacity={0.6}>
                <Text style={styles.variantText}>Variant {index + 1}</Text>
            </TouchableOpacity>
        );
    };
    const renderLevelButton = (level: any, index: number) => {
        upgradePrice += 10;

        let detailText = level.levelItem;
        if (detailText == null) {
            detailText = 'Default';
        } else {
            detailText = detailText.split('::')[1];
        }

        return (
            <TouchableOpacity
                key={level.uuid}
                style={[
                    styles.levelBtn,
                    {
                        borderColor: level.uuid == chosenSkinUUID ? Color.accent : Color.backgroundSecondary,
                        borderBottomLeftRadius: index == 0 ? 12 : 4,
                        borderBottomRightRadius: index == 0 ? 12 : 4,
                        borderTopLeftRadius: skin.levels.length == 1 ? 12 : 4,
                        borderTopRightRadius: skin.levels.length == 1 ? 12 : 4,
                    },
                ]}
                onPress={() => setChosenSkinUUID(level.uuid)}
                activeOpacity={0.6}>
                <View style={styles.boxLeft}>
                    <Text style={styles.levelText}>Level {index + 1}</Text>
                    <Text style={styles.levelDetail}>{detailText}</Text>
                </View>
                <View style={styles.boxRight}>
                    <Text style={styles.priceText}>10</Text>
                    <Image style={styles.priceImage} source={require('../../assets/currencies/currencyR.png')} />
                </View>
            </TouchableOpacity>
        );
    };

    const isFocused = useIsFocused();
    const videoRef = useRef<VideoRef>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (isFocused) {
                Settings.autoPlayVideos ? videoRef.current.resume : videoRef.current.pause;
            } else {
                videoRef.current.pause;
            }
        }
    }, [isFocused]);

    const [chosenSkinUUID, setChosenSkinUUID] = useState(skin.levels[0].uuid);

    return (
        <TouchableOpacity activeOpacity={1} onPress={() => props.setShowWeaponScreen(false)} style={styles.container}>
            <TouchableOpacity style={styles.box} activeOpacity={1}>
                <View style={styles.header}>
                    <Image
                        source={{uri: `https://media.valorant-api.com/contenttiers/${contentTierUuid}/displayicon.png`}}
                        style={styles.contentTierImage}
                    />
                    <TouchableOpacity onPress={() => props.setShowWeaponScreen(false)}>
                        <MaterialCommunityIcons name={'close'} color={Color.textFifth} size={40} />
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    {showVideo && videoMapping[chosenSkinUUID] ? (
                        <View style={styles.videoContainer}>
                            <Video
                                source={{
                                    uri: videoMapping[chosenSkinUUID]
                                        ? videoMapping[chosenSkinUUID]
                                        : videoMapping.fallback,
                                }}
                                ref={videoRef}
                                onEnd={() => {
                                    //@ts-ignore
                                    videoRef.current.seek(1);
                                }}
                                onError={() => console.log('Video error!')}
                                style={{flex: 1}}
                            />
                        </View>
                    ) : (
                        <View style={{width: '100%', aspectRatio: 16 / 9}}>
                            <Image
                                style={{flex: 1}}
                                source={{
                                    uri: imageMapping[chosenSkinUUID]
                                        ? imageMapping[chosenSkinUUID]
                                        : imageMapping.fallback,
                                }}
                                resizeMode={'contain'}
                            />
                        </View>
                    )}

                    {showVariants && (
                        <View style={styles.variantsContainer}>
                            {skin.chromas.map((item: any, index: number) => renderVariantButton(item, index))}
                        </View>
                    )}

                    <View style={styles.levelsContainer}>
                        {skin.levels.map((item: any, index: number) => renderLevelButton(item, index))}
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.footerBox}>
                        <Text style={styles.currencyText}>{upgradePrice}</Text>
                        <Image style={styles.currencyImage} source={require('../../assets/currencies/currencyR.png')} />
                    </View>
                    <View style={styles.footerBox}>
                        <Text style={styles.currencyText}>{offer.Cost[currencyUuid.VP]}</Text>
                        <Image
                            style={styles.currencyImage}
                            source={require('../../assets/currencies/currencyVP.png')}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    videoFullscreen: {
        position: 'absolute',
        bottom: 4,
        right: 8,
    },
    videoContainer: {
        width: '100%',
        aspectRatio: 16 / 9,
        overflow: 'hidden',
        borderRadius: 12,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    container: {
        zIndex: 0,
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
        zIndex: 1,
        width: '100%',
        borderRadius: 12,
        backgroundColor: Color.backgroundPrimary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 12,
        paddingTop: 4,
        paddingBottom: 0,
    },
    contentContainer: {
        paddingTop: 0,
        padding: 12,
        gap: 8,
    },
    contentTierImage: {
        width: 28,
        height: 28,
    },
    variantsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    variantBtn: {
        padding: 8,
        paddingHorizontal: 20,
        borderRadius: 4,
        backgroundColor: Color.backgroundSecondary,
    },
    variantText: {
        color: Color.textSecondary,
    },

    levelsContainer: {
        flexDirection: 'column-reverse',
        gap: 4,
    },
    levelBtn: {
        padding: 8,
        paddingHorizontal: 16,
        borderWidth: 2,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Color.backgroundSecondary,
    },

    boxLeft: {
        gap: 0,
    },
    levelText: {
        color: Color.textSecondary,
    },
    levelDetail: {
        color: Color.textFifth,
    },

    boxRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
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

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 12,
        paddingTop: 0,
        paddingBottom: 12,
    },
    footerBox: {
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 12,
        padding: 8,
        paddingHorizontal: 16,
        gap: 6,
        backgroundColor: 'rgba(0,0,0,.33)',
    },
    currencyText: {
        fontWeight: '700',
        fontSize: 16,
        color: Color.textSecondary,
    },
    currencyImage: {
        width: 26,
        height: 26,
    },
});
