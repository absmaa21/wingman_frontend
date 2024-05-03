import {useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {dailyImageMapping, levelImage} from '../../statics/Mappings';
import {Color, Settings} from '../../Settings';
import LivePlayerCard from '../components/LivePlayerCard';
import {IDailyImageMapping} from '../../types/Interfaces';
import {tempCurrentGame_Competitive} from '../temp_data/tempCurrentGame';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {tempPlayerLoadout} from '../temp_data/tempCollection';
import CollectionCard from '../components/CollectionCard';
import {logInfo} from '../../backend/utils/log-system/log-system';
import {useApi} from '../contexts/apiContext';

export default function HomeScreen() {
    const api = useApi();
    const userApi = api.getUserApi();
    const user = userApi.getActiveUser();
    const [reloadData, setReloadData] = useState(false);

    // active screens
    const [showRankDetails, setShowRankDetails] = useState(true);
    const [showPlayerStats, setShowPlayerStats] = useState(true);
    const [showPlayerCollection, setShowPlayerCollection] = useState(false);
    const [chosenPlayer, setChosenPlayer] = useState(null ?? {Subject: 'nul'});

    const [liveboardPlayers, setLiveboardPlayers] = useState(tempCurrentGame_Competitive.Players);

    // user data
    const [playerName, setPlayerName] = useState<string>(user?.accountInfo.acct.game_name!);
    const [playerTag, setPlayerTag] = useState<string>(user?.accountInfo.acct.tag_line!);
    const [playerLevel, setPlayerLevel] = useState<number>(0);
    const [borderLevel, setBorderLevel] = useState<number>(1);
    let dailiesFinished: number = 9;
    const competitiveTier: number = 21;
    const playerRR: number = 56;
    const playerRank: number = 12623;
    const playerKD: number = 1.62;
    const playerHS: number = 34;
    const playerWR: number = 56;

    function loadUserData() {
        logInfo('HomeScreen.tsx: getting userAccountXp ...');
        userApi.getUserAccountXP(user!).then(r => {
            setPlayerLevel(r.value?.Progress.Level!);
            if (playerLevel) {
                setBorderLevel(playerLevel < 500 ? playerLevel - (playerLevel % 20) : 500);
            } else {
                setBorderLevel(1);
            }
        });
    }

    function loadLiveData() {}

    // refresh data
    useEffect(() => {
        logInfo('HomeScreen.tsx: Refreshing data ...');
        loadUserData();
        loadLiveData();
        setReloadData(false);
    }, [reloadData, playerLevel]);

    let checkpointImages: IDailyImageMapping[] = [];
    for (let i = 0; i < 4; i++) {
        checkpointImages[i] = dailiesFinished >= 4 ? dailyImageMapping[4] : dailyImageMapping[dailiesFinished % 4];
        dailiesFinished = Math.max(0, dailiesFinished - 4);
    }

    const gameState: string = 'PreGame';
    const gameHeader: string = 'Liveboard';
    const gameServer: string = 'Frankfurt';

    function renderPlayerCard(item: any) {
        return (
            <LivePlayerCard
                playerObj={item}
                setChosenPlayer={setChosenPlayer}
                setShowPlayerCollection={setShowPlayerCollection}
            />
        );
    }

    function renderPlayerCollectionWidget() {
        const windowHeight = Dimensions.get('window').height - 56;
        const windowWidth = Dimensions.get('window').width;
        const cardWidth = (windowWidth - 24) / 2;

        return (
            <View style={[styles.playerCollectionWidgetBackground, {width: windowWidth, height: windowHeight}]}>
                <View style={styles.row}>
                    <Text style={styles.collectionHeader}>Collection of {chosenPlayer.Subject}</Text>
                    <TouchableOpacity
                        style={styles.collectionX}
                        onPress={() => {
                            setShowPlayerCollection(false);
                        }}>
                        <MaterialCommunityIcons name={'close'} size={40} color={Color.textFifth} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={tempPlayerLoadout}
                    numColumns={Math.floor(windowWidth / cardWidth)}
                    columnWrapperStyle={styles.collectionCardsContainer}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => <CollectionCard weaponObject={item} />}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {showPlayerStats && (
                <View style={styles.playerContainer}>
                    <View style={styles.playerContainerLeft}>
                        <View style={styles.playerInfosContainer}>
                            <View style={styles.column}>
                                <Text style={styles.playerName}>
                                    {playerName}
                                    <Text style={styles.playerTag}>#{playerTag}</Text>
                                </Text>
                                <View style={styles.row}>
                                    {checkpointImages.map((image, index) => (
                                        <Image key={index} source={image} style={styles.dailyImage} />
                                    ))}
                                </View>
                            </View>
                            <View style={styles.levelBox}>
                                <Image
                                    source={levelImage[borderLevel]}
                                    style={styles.levelImage}
                                    resizeMode={'contain'}
                                />
                                <Text style={styles.playerLevel}>{playerLevel}</Text>
                            </View>
                        </View>
                        <View style={styles.playerStatsContainer}>
                            <View style={styles.column}>
                                <Text style={styles.playerKD}>KD {playerKD}</Text>
                                <Text style={styles.playerHS}>HS {playerHS}%</Text>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.playerWR}>WR {playerWR}%</Text>
                                <Text style={styles.statsPeriod}>{Settings.statsPeriod}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.playerRankContainer}>
                        <Image
                            style={styles.playerTier}
                            source={{
                                uri: `https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/${competitiveTier}/largeicon.png`,
                            }}
                        />
                        <Text style={styles.playerRR}>{playerRR} RR</Text>
                        {showPlayerStats && <Text style={styles.playerRank}>#{playerRank}</Text>}
                    </View>
                </View>
            )}

            <TouchableOpacity onPress={() => setShowPlayerStats(!showPlayerStats)} style={styles.gameInfo}>
                <Text style={styles.gameState}>{gameState}</Text>
                <Text style={styles.gameHeader}>{gameHeader}</Text>
                <Text style={styles.gameServer}>{gameServer}</Text>
            </TouchableOpacity>

            <FlatList
                data={liveboardPlayers}
                contentContainerStyle={{gap: 4, paddingBottom: 24}}
                showsVerticalScrollIndicator={false}
                renderItem={renderPlayerCard}
            />

            {showPlayerCollection && chosenPlayer && renderPlayerCollectionWidget()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 6,
        paddingLeft: 6,
        paddingRight: 6,
        backgroundColor: Color.backgroundPrimary,
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
    },

    playerContainer: {
        flexDirection: 'row',
    },
    playerContainerLeft: {
        flex: 2,
        flexDirection: 'column',
    },
    playerInfosContainer: {
        height: 64,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6,
        marginBottom: 4,
        borderRadius: 4,
        borderTopLeftRadius: 12,
        backgroundColor: Color.backgroundSecondary,
    },
    playerRankContainer: {
        flex: 1,
        marginLeft: 4,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        backgroundColor: Color.backgroundSecondary,
    },
    playerStatsContainer: {
        height: 64,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6,
        borderRadius: 4,
        borderBottomLeftRadius: 12,
        backgroundColor: Color.backgroundSecondary,
    },
    levelBox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    levelImage: {
        width: 96,
    },
    playerLevel: {
        position: 'absolute',
        color: Color.textPrimary,
    },

    playerName: {
        fontSize: 16,
        color: Color.textSecondary,
    },
    playerTag: {
        fontSize: 13,
        color: Color.textFifth,
    },
    dailyImage: {
        width: 20,
        height: 20,
    },

    playerTier: {
        width: 88,
        height: 88,
        marginBottom: -8,
    },
    playerRR: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: -4,
        color: Color.textSecondary,
    },
    playerRank: {
        fontSize: 14,
        color: Color.textFifth,
    },

    playerKD: {
        fontSize: 18,
        color: Color.textSecondary,
    },
    playerHS: {
        fontSize: 18,
        color: Color.textSecondary,
    },
    playerWR: {
        fontSize: 18,
        textAlign: 'right',
        color: Color.textSecondary,
    },
    statsPeriod: {
        color: Color.textSixth,
    },

    gameInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 6,
        paddingBottom: 6,
    },
    gameState: {
        fontSize: 16,
        color: Color.textFourth,
    },
    gameHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Color.textSecondary,
    },
    gameServer: {
        fontSize: 16,
        color: Color.textFourth,
    },

    playerCollectionWidgetBackground: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.backgroundPrimary,
        zIndex: 9,
    },
    collectionCardsContainer: {
        gap: 4,
        paddingBottom: 4,
    },
    collectionHeader: {
        flex: 1,
        fontSize: 15,
        textAlign: 'center',
        padding: 11,
    },
    collectionX: {
        position: 'absolute',
        right: 0,
    },
});
