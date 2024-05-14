import React from 'react'
import PropTypes from 'prop-types'
import {BackHandler, ScrollView, StyleSheet, Text, View} from 'react-native'
import {Color} from '../../Settings'
import HistoryPlayerCard from "./HistoryPlayerCard"
import HistoryTeamCard from "./HistoryTeamCard"
import {Match} from "../../types/valapidocs.techchrism.me/PVP_ENDPOINTS/MatchHistory";
import {MatchDetailsResponse} from "../../types/valapidocs.techchrism.me/PVP_ENDPOINTS/MatchDetails";
import {logInfo} from "../../backend/utils/log-system/log-system";

MatchHistoryScreen.propTypes = {
    match: PropTypes.object.isRequired,
    setChosenMatch: PropTypes.func.isRequired
}

export default function MatchHistoryScreen(props: any) {
    const match: MatchDetailsResponse = props.match
    return (
        <View style={styles.container}>
            <View style={styles.matchDetails}>
                <View style={[styles.detailBox, {alignItems: 'flex-start'}]}>
                    <Text style={styles.modeText}>{match.matchInfo.queueID}</Text>
                    <Text style={styles.mapText}>{match.matchInfo.mapId}</Text>
                </View>
                <View style={[styles.detailBox, styles.matchStandings]}>
                    <Text style={[styles.standingsText, {color: Color.valorantCyanDark}]}>{match.teams![0].roundsWon}</Text>
                    <Text style={[styles.standingsText, {color: Color.textPrimary}]}>:</Text>
                    <Text style={[styles.standingsText, {color: Color.valorantRedDark}]}>{match.teams![1].roundsWon}</Text>
                </View>
                <View style={[styles.detailBox, {alignItems: 'flex-end'}]}>
                    <Text style={styles.timeText}>3/3/2024, 19:53</Text>
                    <Text style={styles.timeText}>30m 50s</Text>
                </View>
            </View>

            <ScrollView>
                <HistoryTeamCard avgRank={17} kills={15} deaths={17} hasWon />
                <HistoryPlayerCard player={{}} hasBorder />
                <HistoryPlayerCard player={{}} hasBorder />
                <HistoryPlayerCard player={{}}/>
                <HistoryTeamCard avgRank={23} kills={31} deaths={16} />
                <HistoryPlayerCard player={{}} hasBorder />
                <HistoryPlayerCard player={{}} hasBorder />
                <HistoryPlayerCard player={{}}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: Color.backgroundPrimary,
    },
    matchStandings: {
        flexDirection: 'row',
        gap: 4,
    },

    matchDetails: {
        flexDirection: 'row',
        padding: 8,
        justifyContent: 'space-around',
        borderColor: 'rgba(255,255,255,.1)',
        borderBottomWidth: 1,
    },
    detailBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    standingsText: {
        fontSize: 26,
        fontWeight: 'bold',
    },

    mapText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Color.textPrimary,
    },
    modeText: {
        fontSize: 16,
        color: Color.textFourth,
    },
    timeText: {
        fontSize: 14,
        color: Color.textFourth,
    },
})
