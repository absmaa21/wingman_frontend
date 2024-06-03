import React, {useEffect, useState} from 'react';
import {BackHandler, FlatList, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {APP_BUILD, Color, EAppBuild} from '../../Settings';
import LivePlayerCard from '../components/LivePlayerCard';
import {tempCurrentGame_Competitive} from '../temp_data/tempCurrentGame';
import {logInfo} from '../../backend/utils/log-system/log-system';
import {useApi} from '../contexts/apiContext';
import Container from '../components/Container.tsx';
import PlayerName from '../components/PlayerName.tsx';
import PlayerLevel from '../components/PlayerLevel.tsx';
import InfoBox from '../components/InfoBox.tsx';
import PlayerRank from '../components/PlayerRank.tsx';
import Column from '../components/Column.tsx';
import Row from '../components/Row.tsx';
import PlayerCollectionModal from '../components/PlayerCollectionModal.tsx';
import PlayerDailyCheckpoints from '../components/PlayerDailyCheckpoints.tsx';
import {ICurrentGameMatchResponse, IPlayer,} from '../../types/valapidocs.techchrism.me/PVP_ENDPOINTS/CurrentGame.ts';
import {EJustifyContent} from '../../types/TypeScriptInterfaces.ts';
import ProfileScreen from './ProfileScreen.tsx';
import {loadAccountXP, loadCompetitiveUpdates} from '../interface.ts';
import {ICompetitiveUpdatesResponse} from "../../types/valapidocs.techchrism.me/PVP_ENDPOINTS/CompetitiveUpdates.ts";

export default function HomeScreen() {
    const api = useApi();
    const userApi = api.getUserApi();
    const user = userApi.getActiveUser();
    const [reloadData, setReloadData] = useState(false);

    // active screens
    const [showPlayerStats, setShowPlayerStats] = useState(true);
    const [chosenPlayer, setChosenPlayer] = useState<IPlayer | undefined>(
        undefined,
    );
    const [chosenProfile, setChosenProfile] = useState<string | undefined>();

    // user data
    const [currentGame, setCurrentGame] = useState<
        ICurrentGameMatchResponse | undefined
    >(tempCurrentGame_Competitive);
    const playerName = APP_BUILD === EAppBuild.PUBLIC ? 'username' : user?.accountInfo.acct.game_name ?? '';
    const playerTag = APP_BUILD === EAppBuild.PUBLIC ? '123' : user?.accountInfo.acct.tag_line ?? '';
    const [playerLevel, setPlayerLevel] = useState<number>(
        user?.accountXp?.Progress.Level ?? -1,
    );
    let dailiesFinished: number = 9;

    const [competitiveUpdates, setCompetitiveUpdates] = useState<ICompetitiveUpdatesResponse>();
    const playerRR: number = 56;
    const playerRank: number = 12623;
    const playerKD: number = 1.62;
    const playerHS: number = 34;
    const playerWR: number = 56;

    // refresh data
    useEffect(() => {
        logInfo('HomeScreen.tsx: Refreshing data ...');
        loadAccountXP(api, setPlayerLevel);
        loadCompetitiveUpdates(api, setCompetitiveUpdates);
        setReloadData(false);
    }, [reloadData, playerLevel, api]);

    useEffect(() => {
        if(playerLevel < 0) {
            setReloadData(true)
        }
    })

    const gameState: string = 'PreGame';
    const gameHeader: string = 'Liveboard';
    const gameServer: string = 'Frankfurt';

    function renderPlayerCard(item: any) {
        return (
            <LivePlayerCard
                playerObj={item}
                setChosenPlayer={setChosenPlayer}
                setChosenProfile={setChosenProfile}
            />
        );
    }

    BackHandler.addEventListener('hardwareBackPress', function () {
        setChosenProfile(undefined);
        return true;
    });

    return (
        <View style={styles.container}>
            {showPlayerStats && (
                <Row>
                    <Column flex={2}>
                        <Container height={62}>
                            <Column align={EJustifyContent.CENTER}>
                                <PlayerName name={playerName} tag={playerTag}/>
                                <PlayerDailyCheckpoints dailiesFinished={dailiesFinished}/>
                            </Column>
                            <PlayerLevel level={playerLevel ?? -1}/>
                        </Container>
                        <Container height={62}>
                            <InfoBox title={'KD'} detail={playerKD.toFixed(2)}/>
                            <InfoBox title={'HS'} detail={playerHS.toFixed(0)}/>
                            <InfoBox title={'WR'} detail={playerWR.toFixed(2) + '%'}/>
                            <InfoBox title={'WS'} detail={'643'}/>
                        </Container>
                    </Column>
                    <Column flex={1}>
                        <Container align={'center'} height={128}>
                            <PlayerRank
                                tier={competitiveUpdates?.Matches[0].TierAfterUpdate ?? 0}
                                rr={competitiveUpdates?.Matches[0].RankedRatingAfterUpdate}
                                rank={0}
                            />
                        </Container>
                    </Column>
                </Row>
            )}

            <TouchableOpacity
                onPress={() => setShowPlayerStats(!showPlayerStats)}
                style={styles.gameInfo}>
                <Text style={styles.gameState}>{gameState}</Text>
                <Text style={styles.gameHeader}>{gameHeader}</Text>
                <Text style={styles.gameServer}>{gameServer}</Text>
            </TouchableOpacity>

            <FlatList
                data={currentGame?.Players}
                contentContainerStyle={styles.flatList}
                showsVerticalScrollIndicator={false}
                renderItem={renderPlayerCard}
            />

            {chosenPlayer && (
                <PlayerCollectionModal
                    puuid={chosenPlayer.Subject}
                    handleCloseModal={() => setChosenPlayer(undefined)}
                />
            )}

            {chosenProfile && (
                <View style={styles.profileScreenStyle}>
                    <ProfileScreen puuid={chosenProfile}/>
                </View>
            )}
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
    flatList: {
        gap: 8,
        paddingBottom: 24,
    },
    profileScreenStyle: {
        flex: 1,
        position: 'absolute',
        minHeight: '110%',
    },
});
