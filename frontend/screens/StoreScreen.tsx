import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import BundleItem from '../components/BundleItem';
import {Color} from '../../Settings';
import WeaponSkinCard from '../components/WeaponSkinCard';
import WeaponSkinScreen from '../components/WeaponSkinScreen';
import AccessoryCard from '../components/AccessoryCard';
import AccessoryScreen from '../components/AccessoryScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useApi} from '../contexts/apiContext';
import {logDebug, logInfo} from '../../backend/utils/log-system/log-system';
import UserWallet from '../components/UserWallet';
import {
    getBundleByDataAssetID,
    getSkinByUuid,
} from '../helpers/ExtractFromGameContent';
import {ItemTypeID} from '../../backend/api/types/store/owned-items';
import {
    IStorefrontAccessoryStoreOffer,
    IStorefrontBonusStoreOffer,
    IStorefrontBundle,
    IStorefrontBundleItemOffer,
    IStorefrontOffer,
} from '../../types/valapidocs.techchrism.me/STORE_ENDPOINTS/Storefront';
import {loadStorefront, loadUserWallet} from '../interface.ts';

export default function StoreScreen() {
    const api = useApi();

    const screenWidth = Dimensions.get('window').width;
    const [secondsUntilStoreReset, setSecondsUntilStoreReset] =
        useState<number>(0);

    // active screens
    const [isFeaturedPageActive, setIsFeaturedPageActive] =
        useState<boolean>(true);
    const [showWeaponScreen, setShowWeaponScreen] = useState<boolean>(false);
    const [showAccessoryScreen, setShowAccessoryScreen] =
        useState<boolean>(false);
    const [showBundleContent, setShowBundleContent] = useState<boolean>(false);
    const [showNightmarket, setShowNightmarket] = useState<boolean>(false);

    // chosen items
    const [chosenSkinOffer, setChosenSkinOffer] = useState<IStorefrontOffer>();
    const [chosenAccessoryOffer, setChosenAccessoryOffer] =
        useState<IStorefrontAccessoryStoreOffer>();
    const [activeBundleIndex, setActiveBundleIndex] = useState<number>(0);
    const [chosenBundleContent, setChosenBundleContent] =
        useState<IStorefrontBundle>();
    const [bundleSkins, setBundleSkins] = useState<IStorefrontOffer[]>();
    const [bundleAccessories, setBundleAccessories] =
        useState<IStorefrontOffer[]>();

    // user store data
    const [reloadStoreData, setReloadStoreData] = useState<boolean>(false);

    const [playerCurrencyR, setPlayerCurrencyR] = useState<number>(-1);
    const [playerCurrencyVP, setPlayerCurrencyVP] = useState<number>(-1);
    const [playerCurrencyKP, setPlayerCurrencyKP] = useState<number>(-1);

    const [bundleData, setBundleData] = useState<IStorefrontBundle[]>();
    const [featuredItemsData, setFeaturedItemsData] =
        useState<IStorefrontOffer[]>();
    const [accessoryItemsData, setAccessoryItemsData] =
        useState<IStorefrontAccessoryStoreOffer[]>();
    const [nightmarketItemsData, setNightmarketItemsData] =
        useState<IStorefrontBonusStoreOffer[]>();

    function handleBundleClicked(bundle: any) {
        setChosenBundleContent(bundle);
        setBundleSkins([]);
        setBundleAccessories([]);
        bundle.ItemOffers.map((item: IStorefrontBundleItemOffer) => {
            if (item.Offer.Rewards[0].ItemTypeID === ItemTypeID.SKINS) {
                setBundleSkins(prev => [...prev!, item.Offer]);
            } else {
                setBundleAccessories(prev => [...prev!, item.Offer]);
            }
        });
        setShowBundleContent(true);
    }

    function formatTime(seconds: number) {
        const hours = Math.floor(seconds / 60 / 60);
        const minutes = Math.floor((seconds / 60) % 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function handleBundleCarouselScroll(event: any) {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = scrollPosition / screenWidth;
        setActiveBundleIndex(Math.round(index));
    }

    function renderDotIndicators() {
        if (!bundleData) {
            return;
        }
        return bundleData.map((dot, index: number) => {
            const indicatorColor =
                activeBundleIndex === index
                    ? 'rgba(255,255,255,.5)'
                    : 'rgba(255,255,255,.2)';
            return (
                <View
                    style={[styles.dotIndicator, {backgroundColor: indicatorColor}]}
                    key={dot.ID}
                />
            );
        });
    }

    function renderFooter() {
        return (
            <View style={styles.footer}>
                <View style={styles.footerLeft}>
                    {isFeaturedPageActive ? (
                        <UserWallet
                            radianite={playerCurrencyR}
                            valorant_points={playerCurrencyVP}
                        />
                    ) : (
                        <UserWallet kingdom_points={playerCurrencyKP} kp_limit={10000}/>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.changeFeaturedPageButton}
                    activeOpacity={0.7}
                    onPress={() => {
                        setIsFeaturedPageActive(!isFeaturedPageActive);
                        setShowNightmarket(false);
                    }}>
                    <Text style={styles.changeFeaturedPageButtonText}>
                        {isFeaturedPageActive ? 'Accessories' : 'Featured'}
                    </Text>
                </TouchableOpacity>

                {nightmarketItemsData && (
                    <TouchableOpacity
                        style={styles.nightmarketButton}
                        activeOpacity={0.7}
                        onPress={() => setShowNightmarket(!showNightmarket)}>
                        <MaterialCommunityIcons
                            name={'cards-playing-diamond-multiple'}
                            color={showNightmarket ? Color.accent : Color.textSecondary}
                            size={32}
                        />
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    function renderWeaponSkinCard(item: IStorefrontOffer) {
        const obj = getSkinByUuid(item.OfferID, api);
        if (obj) {
            return (
                <WeaponSkinCard
                    offer={item}
                    skinObject={obj}
                    setShowWeaponScreen={setShowWeaponScreen}
                    setChosenSkinOffer={setChosenSkinOffer}
                />
            );
        } else {
            return <Text>No skin found</Text>;
        }
    }

    function renderAccessoryCard({item}: any) {
        return (
            <AccessoryCard
                key={item.OfferID}
                offer={item.Offer}
                setChosenAccessoryOffer={setChosenAccessoryOffer}
                setShowAccessoryScreen={setShowAccessoryScreen}
            />
        );
    }

    function renderBundleItem({item}: any) {
        return (
            <BundleItem
                key={item.ID}
                item={item}
                handleBundleClicked={handleBundleClicked}
            />
        );
    }

    function renderFeaturedItems() {
        if (featuredItemsData) {
            return (
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={reloadStoreData}
                            onRefresh={() => setReloadStoreData(true)}
                        />
                    }
                    contentContainerStyle={[styles.gap6, {marginBottom: -24}]}
                    data={featuredItemsData}
                    renderItem={item => renderWeaponSkinCard(item.item)}
                    keyExtractor={item => item.OfferID}
                />
            );
        }

        return <Text style={styles.noStoreFoundText}>No store found</Text>;
    }

    function renderFeaturedStore() {
        return (
            <View>
                <View>
                    <FlatList
                        data={bundleData}
                        renderItem={renderBundleItem}
                        horizontal={true}
                        pagingEnabled={true}
                        onScroll={handleBundleCarouselScroll}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.ID}
                    />
                    {bundleData && bundleData.length > 1 && (
                        <View style={styles.bundlesIndicator}>{renderDotIndicators()}</View>
                    )}
                </View>

                <Text style={styles.timeUntilStoreReset}>
                    Daily Offers |{' '}
                    <Text style={{color: Color.accent}}>
                        {formatTime(secondsUntilStoreReset)}
                    </Text>
                </Text>

                <View style={styles.itemsContainer}>
                    {isFeaturedPageActive ? (
                        renderFeaturedItems()
                    ) : (
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={reloadStoreData}
                                    onRefresh={() => setReloadStoreData(true)}
                                />
                            }
                            contentContainerStyle={[styles.gap6, {marginBottom: -24}]}
                            data={accessoryItemsData}
                            renderItem={renderAccessoryCard}
                            keyExtractor={item => item.Offer.OfferID}
                        />
                    )}
                </View>
            </View>
        );
    }

    function renderNightmarketItems() {
        return (
            <View style={styles.itemsContainer}>
                <Text style={styles.nightmarketHeader}>Nightmarket</Text>
                <FlatList
                    contentContainerStyle={[styles.gap6, {marginBottom: -64}]}
                    data={nightmarketItemsData}
                    renderItem={item => renderWeaponSkinCard(item.item.Offer)}
                    keyExtractor={item => item.Offer.OfferID}
                />
            </View>
        );
    }

    function renderBundleItems() {
        if (!chosenBundleContent) {
            return;
        }
        const bundleName = getBundleByDataAssetID(
            chosenBundleContent.DataAssetID,
            api,
        ).displayName;
        return (
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <Text style={styles.bundleName}>{bundleName}</Text>
                    <TouchableOpacity
                        onPress={() => setShowBundleContent(false)}
                        style={styles.xButton}>
                        <MaterialCommunityIcons
                            name={'close'}
                            color={Color.textSecondary}
                            size={40}
                        />
                    </TouchableOpacity>
                </View>

                <View style={[styles.itemsContainer, styles.flex]}>
                    {isFeaturedPageActive ? (
                        <FlatList
                            contentContainerStyle={[styles.flex, styles.gap6]}
                            data={bundleSkins}
                            renderItem={item => renderWeaponSkinCard(item.item)}
                            keyExtractor={item => item.OfferID}
                        />
                    ) : (
                        <FlatList
                            contentContainerStyle={[styles.flex, styles.gap6]}
                            data={bundleAccessories}
                            renderItem={renderAccessoryCard}
                            keyExtractor={item => item.OfferID}
                        />
                    )}
                </View>
            </View>
        );
    }

    // refresh seconds until store reset
    useEffect(() => {
        const calculateSecondsUntilMidnight = () => {
            const now = new Date();
            const midnight = new Date(now);
            midnight.setHours(24, 0, 0, 0); // Set to midnight of the next day

            const millisecondsUntilMidnight = midnight.getTime() - now.getTime();
            const secondsUntilMidnight = Math.ceil(millisecondsUntilMidnight / 1000);

            setSecondsUntilStoreReset(secondsUntilMidnight);
        };

        calculateSecondsUntilMidnight();
        const intervalId = setInterval(calculateSecondsUntilMidnight, 1000);
        return () => clearInterval(intervalId);
    }, []);

    // refresh store data
    useEffect(() => {
        logInfo('StoreScreen.tsx: Refreshing store data ...');
        loadUserWallet(
            api,
            setPlayerCurrencyR,
            setPlayerCurrencyVP,
            setPlayerCurrencyKP,
        ).then(() => logDebug('StoreScreen.tsx: wallet fetch finished'));
        loadStorefront(
            api,
            setBundleData,
            setFeaturedItemsData,
            setAccessoryItemsData,
            setNightmarketItemsData,
        ).then(() => logDebug('StoreScreen.tsx: storefront fetch finished'));
        setReloadStoreData(false);
    }, [api, reloadStoreData]);

    return (
        <View style={styles.container}>
            {!showNightmarket && !showBundleContent && renderFeaturedStore()}
            {showNightmarket && nightmarketItemsData && renderNightmarketItems()}
            {showBundleContent && chosenBundleContent && renderBundleItems()}


            {renderFooter()}
            {showWeaponScreen && chosenSkinOffer && (
                <WeaponSkinScreen
                    offer={chosenSkinOffer!}
                    skinObject={getSkinByUuid(chosenSkinOffer.OfferID, api)!}
                    setShowWeaponScreen={setShowWeaponScreen}
                />
            )}
            {showAccessoryScreen && (
                <AccessoryScreen
                    offer={chosenAccessoryOffer}
                    setShowAccessoryScreen={setShowAccessoryScreen}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    containerHeader: {
        flexDirection: 'row',
        padding: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bundleName: {
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    xButton: {
        position: 'absolute',
        right: 8,
        top: 8,
    },

    nightmarketButton: {
        position: 'absolute',
        right: 8,
        top: -48,
        justifyContent: 'center',
        borderRadius: 12,
        padding: 8,
        backgroundColor: Color.backgroundFourth,
    },
    nightmarketHeader: {
        color: Color.textPrimary,
        fontSize: 26,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    footerLeft: {
        flexDirection: 'row',
        gap: 16,
    },

    container: {
        flex: 1,
        backgroundColor: Color.backgroundPrimary,
    },
    dotIndicator: {
        height: 8,
        width: 8,
        borderRadius: 10,
        marginHorizontal: 3,
    },
    bundlesIndicator: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 4,
        left: 4,
    },
    timeUntilStoreReset: {
        fontSize: 16,
        color: Color.textSecondary,
        textAlign: 'center',
        marginTop: 8,
    },
    itemsContainer: {
        justifyContent: 'center',
        padding: 8,
        gap: 4,
    },

    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 64,
        flexDirection: 'row',
        padding: 8,
        justifyContent: 'space-between',
        backgroundColor: Color.backgroundPrimary,
    },
    changeFeaturedPageButton: {
        width: 156,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: Color.backgroundFourth,
    },
    changeFeaturedPageButtonText: {
        fontSize: 16,
        color: Color.textSecondary,
    },

    gap6: {
        gap: 6,
    },
    flex: {
        flex: 1,
    },
    noStoreFoundText: {
        justifyContent: 'center',
        fontSize: 16,
        marginTop: 8,
    },
});
