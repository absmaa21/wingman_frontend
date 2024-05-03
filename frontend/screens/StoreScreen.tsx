import StorefrontEndpoint from '../../backend/api/endpoints/store/storefront';
import ValorantClient from '../../backend/api/clients/valorant-client';
import React, {useEffect, useState} from 'react'
import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import BundleItem from '../components/BundleItem'
import {Color} from '../../Settings'
import WeaponSkinCard from '../components/WeaponSkinCard'
import WeaponSkinScreen from '../components/WeaponSkinScreen'
import AccessoryCard from '../components/AccessoryCard'
import AccessoryScreen from '../components/AccessoryScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {useApi} from "../contexts/apiContext"
import {logInfo} from "../../backend/utils/log-system/log-system"
import {currencyUuid} from "../../statics/Mappings"
import {tempAccessoryItemsData, tempBundleData, tempFeaturedItemsData} from "../temp_data/tempStoreData"
import UserWallet from "../components/UserWallet"
import {getBundleByDataAssetID, getSkinByUuid} from "../helpers/ExtractFromGameContent"
import {ItemTypeID} from "../../backend/api/types/store/owned-items";
import {StorefrontBundleItemOffer, StorefrontOffer} from "../../types/valapidocs.techchrism.me/STORE_ENDPOINTS/Storefront";

export default function StoreScreen() {
    const api = useApi()
    const userApi = api.getUserApi()
    const user = userApi.getActiveUser()

    const screenWidth = Dimensions.get('window').width
    const [secondsUntilStoreReset, setSecondsUntilStoreReset] = useState(0)

    // active screens
    const [isFeaturedPageActive, setIsFeaturedPageActive] = useState(true)
    const [showWeaponScreen, setShowWeaponScreen] = useState(false)
    const [showAccessoryScreen, setShowAccessoryScreen] = useState(false)
    const [showBundleContent, setShowBundleContent] = useState(false)
    const [showNightmarket, setShowNightmarket] = useState(false)

    // chosen items
    const [chosenSkinOffer, setChosenSkinOffer] = useState(null)
    const [chosenAccessoryOffer, setChosenAccessoryOffer] = useState(null)
    const [activeBundleIndex, setActiveBundleIndex] = useState(0)
    const [chosenBundleContent, setChosenBundleContent] = useState(null)

    const [bundleSkins, setBundleSkins] = useState<StorefrontOffer[]>()
    const [bundleAccessories, setBundleAccessories] = useState<StorefrontOffer[]>()

    // user store data
    const [reloadStoreData, setReloadStoreData] = useState(false)

    const [playerCurrencyR, setPlayerCurrencyR] = useState(-1)
    const [playerCurrencyVP, setPlayerCurrencyVP] = useState(-1)
    const [playerCurrencyKP, setPlayerCurrencyKP] = useState(-1)

    const [bundleData, setBundleData] = useState() // TODO
    const [featuredItemsData, setFeaturedItemsData] = useState()
    const [accessoryItemsData, setAccessoryItemsData] = useState()
    const [isNightmarketAvailable, setIsNightmarketAvailable] = useState(false)
    const [nightmarketItemsData, setNightmarketItemsData] = useState() // TODO

    function handleBundleClicked(bundle: any) {
        setChosenBundleContent(bundle)
        logInfo(JSON.stringify(bundle.ItemOffers, null, 2))
        setBundleSkins([])
        setBundleAccessories([])
        bundle.ItemOffers.map((item: StorefrontBundleItemOffer) => {
            if (item.Offer.Rewards[0].ItemTypeID === ItemTypeID.SKINS) {
                setBundleSkins(prev => [...prev!, item.Offer])
            } else {
                setBundleAccessories(prev => [...prev!, item.Offer])
            }
        })
        setShowBundleContent(true)
    }

    function loadWallet() {
        logInfo("StoreScreen.tsx: getting userWallet data ...")
        userApi.getUserWallet(user!).then(r => {
            setPlayerCurrencyR(r.value?.Balances[currencyUuid.R]!)
            setPlayerCurrencyVP(r.value?.Balances[currencyUuid.VP]!)
            setPlayerCurrencyKP(r.value?.Balances[currencyUuid.KP]!)
        })
    }

    function loadStorefront() {
        logInfo('StoreScreen.tsx: getting userStore data ...');
        const client = new ValorantClient(api.getGameContentApi().getGameContent());
        new StorefrontEndpoint(user!).query(client).then(r => {
            if (r.isErr()) {
                logInfo('StoreScreen.tsx: Error getting Storefront data');
                return;
            }

            const data = r.unwrap();
            // @ts-ignore
            setBundleData(data.FeaturedBundle.Bundles);
            if (bundleData) {
                logInfo('StoreScreen.tsx: got Bundle Data');
            }
            // @ts-ignore
            setFeaturedItemsData(data.SkinsPanelLayout.SingleItemStoreOffers);
            if (featuredItemsData) {
                logInfo('StoreScreen.tsx: got FeaturedItems Data');
            }
            // @ts-ignore
            setAccessoryItemsData(data.AccessoryStore.AccessoryStoreOffers);
            if (accessoryItemsData) {
                logInfo('StoreScreen.tsx: got AccessoryItems Data');
            }
        });
    }

    function formatTime(seconds: number) {
        const hours = Math.floor(seconds / 60 / 60)
        const minutes = Math.floor((seconds / 60) % 60)
        const remainingSeconds = Math.floor(seconds % 60)

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds
            .toString()
            .padStart(2, '0')}`
    }

    function handleBundleCarouselScroll(event: any) {
        const scrollPosition = event.nativeEvent.contentOffset.x
        const index = scrollPosition / screenWidth
        setActiveBundleIndex(Math.round(index))
    }

    function renderDotIndicators() {
        return tempBundleData.map((dot, index: number) => {
            const indicatorColor = activeBundleIndex === index ? 'rgba(255,255,255,.5)' : 'rgba(255,255,255,.2)'
            return <View style={[styles.dotIndicator, {backgroundColor: indicatorColor}]} key={index} />
        })
    }

    function renderFooter() {
        return (
            <View style={styles.footer}>
                <View style={styles.footerLeft}>
                    {isFeaturedPageActive ? (
                        <UserWallet radianite={playerCurrencyR} valorant_points={playerCurrencyVP}  />
                    ) : (
                        <UserWallet kingdom_points={playerCurrencyKP} kp_limit={10000} />
                    )}
                </View>

                <TouchableOpacity
                    style={styles.changeFeaturedPageButton}
                    activeOpacity={0.7}
                    onPress={() => {
                        setIsFeaturedPageActive(!isFeaturedPageActive)
                        setShowNightmarket(false)
                    }}>
                    <Text style={styles.changeFeaturedPageButtonText}>
                        {isFeaturedPageActive ? 'Accessories' : 'Featured'}
                    </Text>
                </TouchableOpacity>

                {isNightmarketAvailable && (
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
        )
    }

    function renderWeaponSkinCard({item}: any) {
        const obj = getSkinByUuid(item['OfferID'], api)
        if(obj) {
            return(
                <WeaponSkinCard
                    offer={item}
                    skinObject={obj}
                    setShowWeaponScreen={setShowWeaponScreen}
                    setChosenSkinOffer={setChosenSkinOffer}
                />
            )
        } else {
            return(<Text>No skin found</Text>)
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
        )
    }

    function renderBundleItem({item}: any) {
        return (
            <BundleItem
                key={item.ID}
                item={item}
                handleBundleClicked={handleBundleClicked}
            />
        )
    }

    function renderFeaturedItems() {
        if(featuredItemsData) {
            return(
                <FlatList
                    contentContainerStyle={{gap: 6}}
                    data={featuredItemsData}
                    renderItem={renderWeaponSkinCard}
                    keyExtractor={item => item.OfferID}
                />
            )
        }

        return <Text style={{justifyContent: 'center', fontSize: 16, marginTop: 8}}>No store found</Text>
    }

    function renderFeaturedStore() {
        return (
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
                {tempBundleData.length > 1 && <View style={styles.bundlesIndicator}>{renderDotIndicators()}</View>}

                <Text style={styles.timeUntilStoreReset}>
                    Daily Offers | <Text style={{color: Color.accent}}>{formatTime(secondsUntilStoreReset)}</Text>
                </Text>

                <View style={styles.itemsContainer}>
                    {isFeaturedPageActive ? (
                        renderFeaturedItems()
                    ) : (
                        <FlatList
                            contentContainerStyle={{gap: 6}}
                            data={accessoryItemsData}
                            renderItem={renderAccessoryCard}
                            keyExtractor={item => item.Offer.OfferID}
                        />
                    )}
                </View>
            </View>
        )
    }

    function renderNightmarketItems() {
        return (
            <View style={styles.itemsContainer}>
                <Text style={styles.nightmarketHeader}>Nightmarket</Text>
                <FlatList
                    contentContainerStyle={{gap: 6}}
                    data={nightmarketItemsData}
                    renderItem={renderWeaponSkinCard}
                    keyExtractor={item => item.OfferID}
                />
            </View>
        )
    } // TODO

    function renderBundleItems() {
        // @ts-ignore
        const bundleName = getBundleByDataAssetID(chosenBundleContent.DataAssetID, api).displayName
        return(
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <Text style={styles.bundleName}>{bundleName}</Text>
                    <TouchableOpacity onPress={() => setShowBundleContent(false)} style={styles.xButton}>
                        <MaterialCommunityIcons name={'close'} color={Color.textSecondary} size={40} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.itemsContainer, {flex: 1}]}>
                    {isFeaturedPageActive ? (
                        <FlatList
                            contentContainerStyle={{gap: 6, flex: 1}}
                            data={bundleSkins}
                            renderItem={renderWeaponSkinCard}
                            keyExtractor={item => item.OfferID}
                        />
                    ) : (
                        <FlatList
                            contentContainerStyle={{gap: 6, flex: 1}}
                            data={bundleAccessories}
                            renderItem={renderAccessoryCard}
                            keyExtractor={item => item.OfferID}
                        />
                    )}
                </View>
            </View>
        )
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
        logInfo("StoreScreen.tsx: Refreshing store data ...")
        loadWallet()
        loadStorefront()
        setReloadStoreData(false)
    }, [reloadStoreData]);

    return (
        <View style={styles.container}>
            {!showNightmarket && !showBundleContent && renderFeaturedStore()}
            {showNightmarket && renderNightmarketItems()}
            {showBundleContent && chosenBundleContent && renderBundleItems()}

            {renderFooter()}
            {showWeaponScreen && <WeaponSkinScreen offer={chosenSkinOffer!} skinObject={getSkinByUuid(chosenSkinOffer!['OfferID'], api)!} setShowWeaponScreen={setShowWeaponScreen} />}
            {showAccessoryScreen && <AccessoryScreen offer={chosenAccessoryOffer} setShowAccessoryScreen={setShowAccessoryScreen} />}
        </View>
    )
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
})
