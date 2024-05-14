import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Color} from '../../Settings';
import InfoBox from './InfoBox';
import {IPlayerInfo} from '../../types/valapidocs.techchrism.me/PVP_ENDPOINTS/MatchDetails.ts';

HistoryPlayerCard.propTypes = {
  player: PropTypes.object.isRequired as unknown as IPlayerInfo,
  isPlayerTeam: PropTypes.bool,
  hasBorder: PropTypes.bool,
};

function HistoryPlayerCard(
  props: PropTypes.InferProps<typeof HistoryPlayerCard.propTypes>,
) {
  const player: IPlayerInfo = props.player;
  const style: StyleProp<ViewStyle> = {
    borderBottomWidth: props.hasBorder ? 1 : 0,
  };
  return (
    <View style={[styles.container, style]}>
      <Image
        source={{
          uri: `https://media.valorant-api.com/agents/${player.characterId}/displayicon.png`,
        }}
        style={styles.agentImage}
        resizeMode={'contain'}
      />

      <InfoBox
        title={player.gameName}
        titleExtra={`#${player.tagLine}`}
        detail={`Lvl ${player.accountLevel}`}
      />
      <Image
        style={styles.rankImage}
        resizeMode={'contain'}
        source={{
          uri: `https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/${player.competitiveTier}/largeicon.png`,
        }}
      />
      <InfoBox title={'WS'} detail={'999'} />
      <InfoBox title={'Score'} detail={player.stats?.score.toString() ?? '0'} />
      <InfoBox title={'K'} detail={player.stats?.kills.toString() ?? '0'} />
      <InfoBox title={'D'} detail={player.stats?.deaths.toString() ?? '0'} />
      <InfoBox title={'A'} detail={player.stats?.assists.toString() ?? '0'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    overflow: 'hidden',
    paddingRight: 12,
    borderColor: Color.grey,
    backgroundColor: Color.backgroundPrimary,
  },
  agentImage: {
    height: 56,
    width: 56,
    zIndex: 2,
  },
  primaryText: {
    fontSize: 16,
    color: Color.textPrimary,
  },
  secondaryText: {
    fontSize: 14,
    color: Color.textSecondary,
  },
  rankImage: {
    height: '100%',
    width: 36,
    marginLeft: 4,
  },
});

export default HistoryPlayerCard;
