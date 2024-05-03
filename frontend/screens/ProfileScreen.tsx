import {useEffect, useState} from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {APP_BUILD, Color, EAppBuild} from '../../Settings';
import {levelImage} from '../../statics/Mappings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MatchHistoryCard from '../components/MatchHistoryCard';
import MatchHistoryScreen from '../components/MatchHistoryScreen';
import PropTypes from "prop-types";
import {useApi} from "../contexts/apiContext";
import ValorantClient from "../../backend/api/clients/valorant-client";
import MatchHistoryEndpoint from "../../backend/api/endpoints/pvp/match-history";
import {logError, logInfo} from "../../backend/utils/log-system/log-system";
import {IMatch} from "../../types/valapidocs.techchrism.me/PVP_ENDPOINTS/MatchHistory";
import {IMatchDetailsResponse} from "../../types/valapidocs.techchrism.me/PVP_ENDPOINTS/MatchDetails";
import MatchDetailsEndpoint from "../../backend/api/endpoints/pvp/match-details";
import tempMatchHistory from '../temp_data/tempMatchHistory';
import IMatchDetails from '../../backend/api/types/pvp/match-details';

ProfileScreen.propType = {
    puuid: PropTypes.string,
}

export default function ProfileScreen(props: any) {
    const api = useApi()
    const client = new ValorantClient(api.getGameContentApi().getGameContent())
    const puuid = props.puuid ? props.puuid : api.getUserApi().getActiveUser()?.accountInfo.sub
    let index: number = 0

    const [fetchedMatchHistory, setFetchedMatchHistory] = useState<IMatch[]>([])
    const [matchDetails, setMatchDetails] = useState<IMatchDetailsResponse[]>([])
    const [profileData, setProfileData] = useState({});
    const [lastFetchTime, setLastFetchTime] = useState<number | undefined>(undefined);
    const [reloadRequested, setReloadRequested] = useState(false)
    const [chosenMatch, setChosenMatch] = useState<IMatchDetailsResponse | undefined>()

    function loadMatchHistory() {
        if(APP_BUILD === EAppBuild.FRONTEND) {
            return
        }

        new MatchHistoryEndpoint(api.getUserApi().getActiveUser()!, index, 20, undefined, props.puuid)
            .query(client).then(r => {
            if(r.isErr()) {
                logError(r.getErr()?.message)
                return
            }
            setFetchedMatchHistory(prev => [...prev, ...r.unwrap().History])
        })
    }

    function loadMatchDetails() {
        if(APP_BUILD === EAppBuild.FRONTEND) {
            // @ts-ignore
            setMatchDetails([tempMatchHistory['b11d7c3f-7685-4252-9a68-6db6856ca5be']])
            return
        }

        fetchedMatchHistory.forEach(match => {
            logInfo("loadMatchDetails(): trying to fetch: " + match.MatchID)
            new MatchDetailsEndpoint(api.getUserApi().getActiveUser()!, match.MatchID)
                .query(client).then(r => {
                if(r.isErr()) {
                    logError(r.getErr()?.message)
                    return
                }
                logInfo("loadMatchDetails(): fetched MatchDetails of '" + r.unwrap().matchInfo.matchId + "'")
                setMatchDetails((prev: IMatchDetailsResponse[]) => [...prev, r.unwrap() as IMatchDetailsResponse])
            })
        })
    }

    useEffect(() => {
        // Check if the last fetch was more than 5 minutes ago
        const canFetch = !lastFetchTime || Date.now() - lastFetchTime >= 5 * 60 * 1000;

        if (canFetch) {
            console.log('ProfileScreen.tsx: Fetching Profile...');
            loadMatchHistory()
            setLastFetchTime(Date.now())
        }
        setReloadRequested(false)
    }, [reloadRequested]);

    useEffect(() => {
        if (fetchedMatchHistory.length > 0) loadMatchDetails()
    }, [fetchedMatchHistory]);

    const [chosenSeasonID, setChosenSeasonID] = useState(null);

    const playerName = 'orcan';
    const playerTag = '420';
    const playerLevel = 98;
    const levelSrc = playerLevel > 500 ? 500 : playerLevel - (playerLevel % 20);
    const [showPlayerStats, setShowPlayerStats] = useState(true);

    const playerCurrentTier = 24;
    const playerCurrentTierRR = 195;
    const playerCurrentRankPosition = 13934;
    const playerPeakTier = 26;
    const playerPeakTierRR = 421;
    const playerPeakRankPosition = 3472;

    const playerDamageRoundDelta = 117.3;
    const playerKD = 1.29;
    const playerHS = 26.2;
    const playerWR = 56.4;

    // @ts-ignore
    const showCurrentRankPos = playerCurrentRankPosition != 0;
    // @ts-ignore
    const showPeakRankPos = playerPeakRankPosition != 0;

    function playerStatsHandlePress() {
        setShowPlayerStats(!showPlayerStats);
    }

    function handleOpenWebsiteButton(username: string, usertag: string) {
        Alert.alert('Open Tracker.gg', `Do you want to open the Tracker profile of ${username}#${usertag} ?`, [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open', onPress: () => handleOpenWebsite(username, usertag)},
        ]);
    }

    function handleOpenWebsite(username: string, usertag: string) {
        Linking.openURL(`https://tracker.gg/valorant/profile/riot/${username}%23${usertag}`).catch(() => {
            Alert.alert('Error', 'Failed to open tracker.gg');
        });
    }

    const profileImageWidth = Dimensions.get('window').width - 16;
    const profileImageHeight = profileImageWidth * (128 / 452);

    // @ts-ignore
    return (
        <View style={styles.container}>
            {profileData && (
                <View style={styles.playerStatsContainer}>
                    <View style={styles.playerStatsHeaderContainer}>
                        <View style={styles.playerStatsHeaderContent}>
                            <Image
                                source={{
                                    uri: 'https://media.valorant-api.com/playercards/3c112fe6-4685-d426-de5c-82817fdb8bde/wideart.png',
                                }}
                                style={[
                                    styles.profileImage,
                                    {
                                        width: profileImageWidth,
                                        height: profileImageHeight,
                                    },
                                ]}
                                resizeMode={'contain'}
                            />
                            <View style={styles.profileInfo}>
                                <Text style={styles.profileName}>{playerName}</Text>
                                <Text style={styles.profileTag}>#{playerTag}</Text>
                                <Text style={styles.profileTitle}>{'VCT Champion 2024'}</Text>
                            </View>
                        </View>
                        <View style={styles.playerLevelBadge}>
                            <Image
                                source={levelImage[levelSrc as keyof typeof levelImage]}
                                style={styles.playerLevelImage}
                            />
                            <Text style={styles.playerLevelText}>{playerLevel}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.playerStatsWebsite}
                            onPress={() => handleOpenWebsiteButton(playerName, playerTag)}>
                            <MaterialCommunityIcons name={'web'} color={Color.textPrimary} size={26} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.playerRanksContainer}>
                        <View style={styles.playerCurrentTierContainer}>
                            <Text style={styles.playerCurrentTierHeader}>Current</Text>
                            <Image
                                source={{
                                    uri: `https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/${playerCurrentTier}/largeicon.png`,
                                }}
                                style={styles.playerCurrentTierImage}
                                resizeMode={'contain'}
                            />
                            <Text style={styles.playerCurrentTierRR}>{playerCurrentTierRR} RR</Text>
                            {showCurrentRankPos && (
                                <Text style={styles.playerCurrentRankPosition}>
                                    #{playerCurrentRankPosition}
                                </Text>
                            )}
                        </View>

                        <View style={styles.playerPeakTierContainer}>
                            <Text style={styles.playerPeakTierHeader}>Peak</Text>
                            <Text style={[styles.playerPeakTierHeader, {top: 12}]}>E5A3</Text>
                            <Image
                                source={{
                                    uri: `https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/${playerPeakTier}/largeicon.png`,
                                }}
                                style={styles.playerPeakTierImage}
                                resizeMode={'contain'}
                            />
                            <Text style={styles.playerPeakTierRR}>{playerPeakTierRR} RR</Text>
                            {showPeakRankPos && (
                                <Text style={styles.playerPeakRankPosition}>#{playerPeakRankPosition}</Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.playerStatContainer}>
                        <View style={[styles.playerStat, {borderBottomLeftRadius: 12}]}>
                            <Text style={styles.playerStatHeader}>Damage/Round</Text>
                            <Text style={styles.playerStatDetail}>{playerDamageRoundDelta}</Text>
                        </View>
                        <View style={styles.playerStat}>
                            <Text style={styles.playerStatHeader}>K/D Ratio</Text>
                            <Text style={styles.playerStatDetail}>{playerKD}</Text>
                        </View>
                        <View style={styles.playerStat}>
                            <Text style={styles.playerStatHeader}>Headshot%</Text>
                            <Text style={styles.playerStatDetail}>{playerHS}%</Text>
                        </View>
                        <View style={[styles.playerStat, {borderBottomRightRadius: 12}]}>
                            <Text style={styles.playerStatHeader}>Win %</Text>
                            <Text style={styles.playerStatDetail}>{playerWR}%</Text>
                        </View>
                    </View>
                </View>
            )}

            <FlatList
                data={matchDetails}
                renderItem={item => {
                    return <MatchHistoryCard matchDetails={item.item} puuid={puuid} setChosenMatch={setChosenMatch} />
                }}
            />

            {chosenMatch && <MatchHistoryScreen match={chosenMatch} setChosenMatch={setChosenMatch} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.backgroundPrimary,
    },
    playerStatsContainer: {
        width: '100%',
        padding: 8,
    },
    playerStatsHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    playerStatsHeaderContent: {
        width: '100%',
        overflow: 'hidden',
        flexDirection: 'column',
        borderRadius: 12,
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
        backgroundColor: Color.backgroundSecondary,
    },
    profileImage: {
        top: 0,
    },

    profileInfo: {
        flexDirection: 'row',
        padding: 6,
        paddingHorizontal: 12,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Color.textSecondary,
    },
    profileTag: {
        fontSize: 16,
        color: Color.textFourth,
        marginLeft: 2,
        alignSelf: 'flex-end',
    },
    profileTitle: {
        flex: 1,
        fontSize: 14,
        fontWeight: '400',
        color: Color.textFourth,
        textAlign: 'right',
        alignSelf: 'center',
    },

    playerLevelBadge: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: '50%',
        right: '50%',
    },
    playerLevelImage: {
        position: 'absolute',
        width: 96,
        height: 40,
        marginBottom: 5,
    },
    playerLevelText: {
        position: 'absolute',
        color: Color.textPrimary,
        textAlign: 'center',
        fontSize: 16,
    },

    playerStatsWebsite: {
        position: 'absolute',
        right: 8,
        top: 8,
    },

    playerRanksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
        gap: 4,
    },

    playerCurrentTierContainer: {
        flex: 1,
        alignItems: 'flex-end',
        borderRadius: 4,
        padding: 4,
        backgroundColor: Color.backgroundSecondary,
    },
    playerCurrentTierHeader: {
        position: 'absolute',
        top: 2,
        left: 6,
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: Color.textSixth,
    },
    playerCurrentTierImage: {
        width: 78,
        height: 78,
        right: 8,
    },
    playerCurrentTierRR: {
        position: 'absolute',
        left: 8,
        bottom: 4,
        fontSize: 20,
        fontWeight: '500',
        color: Color.textSecondary,
    },
    playerCurrentRankPosition: {
        position: 'absolute',
        left: 8,
        bottom: 26,
        fontSize: 14,
        fontWeight: '300',
        color: Color.textFourth,
    },

    playerPeakTierContainer: {
        flex: 1,
        alignItems: 'flex-start',
        borderRadius: 4,
        padding: 4,
        backgroundColor: Color.backgroundSecondary,
    },
    playerPeakTierHeader: {
        position: 'absolute',
        top: 2,
        right: 6,
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: Color.textSixth,
    },
    playerPeakTierImage: {
        width: 78,
        height: 78,
        left: 8,
    },
    playerPeakTierRR: {
        position: 'absolute',
        right: 8,
        bottom: 4,
        fontSize: 20,
        fontWeight: '500',
        color: Color.textSecondary,
    },
    playerPeakRankPosition: {
        position: 'absolute',
        right: 8,
        bottom: 26,
        fontSize: 14,
        fontWeight: '300',
        color: Color.textFourth,
    },

    playerStatContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
        gap: 4,
    },
    playerStat: {
        flex: 1,
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 4,
        backgroundColor: Color.backgroundSecondary,
    },
    playerStatHeader: {
        fontSize: 11,
        color: Color.textFourth,
    },
    playerStatDetail: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'right',
        color: Color.textSecondary,
    },
});
