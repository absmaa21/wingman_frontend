import React from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Color} from '../../Settings';
import {
  getPositionOfPlayer,
  getPlayerObject,
  getWonTeam,
  getWinIndicatorColor,
  getPlayerPositionColor,
  getBlueRoundsWon,
  getRedRoundsWon,
} from '../helpers/Helpers_MatchHistory';
import PropTypes from 'prop-types';
import {IMatchDetailsResponse} from '../../types/valapidocs.techchrism.me/PVP_ENDPOINTS/MatchDetails';

MatchHistoryCard.propTypes = {
  matchDetails: PropTypes.object.isRequired as unknown as IMatchDetailsResponse,
  puuid: PropTypes.string.isRequired,
  setChosenMatch: PropTypes.func.isRequired,
};

export default function MatchHistoryCard(props: any) {
  const screenWidth = Dimensions.get('window').width;

  const matchDetails: IMatchDetailsResponse = props.matchDetails;
  const playerObject = getPlayerObject(matchDetails.players, props.puuid);

  if (!playerObject) {
    return <></>;
  }

  const playerTeam = playerObject.teamId;
  const wonTeam = getWonTeam(matchDetails.teams);
  const winIndicatorColor = getWinIndicatorColor(playerTeam, wonTeam);

  const playerTeamRoundsWon = getBlueRoundsWon(matchDetails.teams);
  const enemyTeamRoundsWon = getRedRoundsWon(matchDetails.teams);

  const playerPosition = getPositionOfPlayer(
    matchDetails,
    props.puuid,
    playerTeam,
  );
  const playerPosColor = getPlayerPositionColor(playerPosition);

  BackHandler.addEventListener('hardwareBackPress', function () {
    props.setChosenMatch(undefined);
    return true;
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.setChosenMatch(matchDetails)}
      activeOpacity={0.8}>
      <View
        style={[styles.winIndicator, {backgroundColor: winIndicatorColor}]}
      />

      <Image
        source={{
          uri: `https://media.valorant-api.com/agents/${playerObject.characterId}/displayicon.png`,
        }}
        style={styles.agentImage}
        resizeMode={'contain'}
      />

      <View style={{gap: 2, width: 52}}>
        <Text style={styles.matchResult}>
          <Text style={{color: Color.valorantCyanDark}}>
            {playerTeamRoundsWon}
          </Text>
          {' : '}
          <Text style={{color: Color.valorantRedDark}}>
            {enemyTeamRoundsWon}
          </Text>
        </Text>
        <Text style={[styles.matchPosition, {backgroundColor: playerPosColor}]}>
          {playerPosition}
        </Text>
      </View>

      <Image
        source={{
          uri: `https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/${playerObject.competitiveTier}/largeicon.png`,
        }}
        style={styles.rankImage}
      />

      <View>
        <Image
          source={{
            uri: `https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/${6}/smallicon.png`,
          }}
          style={styles.scoreImage}
        />
        <Text style={styles.scoreText}>744</Text>
      </View>

      <View style={{width: 64}}>
        <Text style={styles.playerKDA}>
          {(
            (playerObject.stats?.kills! + playerObject.stats?.assists!) /
            playerObject.stats?.deaths!
          ).toFixed(1)}{' '}
          KDA
        </Text>
        <Text style={styles.playerKDAdetails}>
          {playerObject.stats?.kills} / {playerObject.stats?.deaths} /{' '}
          {playerObject.stats?.assists}
        </Text>
      </View>

      <Image
        source={{
          uri: `https://media.valorant-api.com/maps/${matchDetails.matchInfo.mapId}/listviewicon.png`,
        }}
        style={styles.mapImage}
        resizeMode={'cover'}
      />

      {screenWidth > 420 && (
        <View>
          <Text style={styles.matchMode}>Competitive</Text>
          <Text style={styles.matchDetails}>2w ago</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'space-between',
    backgroundColor: Color.backgroundSecondary,
  },

  winIndicator: {
    position: 'absolute',
    width: 32,
    height: 64,
    zIndex: 1,
  },
  agentImage: {
    width: 64,
    height: 64,
    zIndex: 2,
  },
  matchTime: {
    textAlign: 'center',
    fontSize: 14,
    color: Color.textFourth,
  },
  matchResult: {
    textAlign: 'center',
    color: Color.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  matchPosition: {
    fontSize: 13,
    color: Color.textSecondary,
    textAlign: 'center',
    padding: 1,
    borderRadius: 12,
  },
  rankImage: {
    width: 48,
    height: 48,
  },

  scoreImage: {
    width: 32,
    height: 32,
  },
  scoreText: {
    color: Color.textPrimary,
    textAlign: 'center',
  },

  playerKDA: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Color.textSecondary,
  },
  playerKDAdetails: {
    textAlign: 'center',
    color: Color.textFourth,
  },

  mapImage: {
    zIndex: -1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    right: 0,
    opacity: 0.17,
  },

  matchMode: {
    textAlign: 'right',
    color: Color.textFourth,
  },
  matchDetails: {
    textAlign: 'right',
    color: Color.textFourth,
  },
});
