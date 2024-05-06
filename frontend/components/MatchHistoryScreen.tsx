import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Color} from '../../Settings';
import HistoryPlayerCard from './HistoryPlayerCard';
import HistoryTeamCard from './HistoryTeamCard';
import {
  ETeamId,
  IMatchDetailsResponse,
} from '../../types/valapidocs.techchrism.me/PVP_ENDPOINTS/MatchDetails';
import {durationToString, unixToString} from '../helpers/Formatters.ts';
import {
  getAvgRank,
  getBluePlayers,
  getBlueRoundsWon,
  getRedPlayers,
  getRedRoundsWon,
  getTeamBlueDeaths,
  getTeamBlueKills,
  getTeamRedDeaths,
  getTeamRedKills,
  getWonTeam,
} from '../helpers/Helpers_MatchHistory.ts';

MatchHistoryScreen.propTypes = {
  match: PropTypes.object.isRequired,
  setChosenMatch: PropTypes.func.isRequired,
};

export default function MatchHistoryScreen(
  props: PropTypes.InferProps<typeof MatchHistoryScreen.propTypes>,
) {
  // @ts-ignore
  const match: IMatchDetailsResponse = props.match;
  const maxWidth: StyleProp<ViewStyle> = {
    width: Dimensions.get('screen').width,
  };
  return (
    <View style={[styles.container, maxWidth]}>
      <TouchableOpacity
        style={styles.matchDetails}
        onPress={() => props.setChosenMatch(undefined)}>
        <View style={[styles.detailBox, styles.flexStart]}>
          <Text style={styles.modeText}>{match.matchInfo.queueID}</Text>
          <Text style={styles.mapText}>{match.matchInfo.mapId}</Text>
        </View>
        <View style={[styles.detailBox, styles.matchStandings]}>
          <Text style={[styles.standingsText, {color: Color.valorantCyanDark}]}>
            {getBlueRoundsWon(match.teams)}
          </Text>
          <Text style={[styles.standingsText, {color: Color.textPrimary}]}>
            :
          </Text>
          <Text style={[styles.standingsText, {color: Color.valorantRedDark}]}>
            {getRedRoundsWon(match.teams)}
          </Text>
        </View>
        <View style={[styles.detailBox, {alignItems: 'flex-end'}]}>
          <Text style={styles.timeText}>
            {unixToString(match.matchInfo.gameStartMillis)}
          </Text>
          <Text style={styles.timeText}>
            {durationToString(match.matchInfo.gameLengthMillis ?? 0)}
          </Text>
        </View>
      </TouchableOpacity>

      <ScrollView>
        <HistoryTeamCard
          isBlue={true}
          avgRank={getAvgRank(match.players, ETeamId.BLUE)}
          kills={getTeamBlueKills(match.players)}
          deaths={getTeamBlueDeaths(match.players)}
          hasWon={getWonTeam(match.teams) === ETeamId.BLUE}
        />
        {getBluePlayers(match.players).map((player, index) => {
          return (
            <HistoryPlayerCard
              player={player}
              key={player.subject}
              hasBorder={index < 4}
            />
          );
        })}
        <HistoryTeamCard
          isBlue={false}
          avgRank={getAvgRank(match.players, ETeamId.RED)}
          kills={getTeamRedKills(match.players)}
          deaths={getTeamRedDeaths(match.players)}
          hasWon={getWonTeam(match.teams) === ETeamId.RED}
        />
        {getRedPlayers(match.players).map((player, index) => {
          return (
            <HistoryPlayerCard
              player={player}
              key={player.subject}
              hasBorder={index < 4}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
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
  flexStart: {
    alignItems: 'flex-start',
  },
});
