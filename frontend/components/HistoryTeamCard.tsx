import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Color} from '../../Settings';

HistoryTeamCard.propTypes = {
  hasWon: PropTypes.bool,
  isBlue: PropTypes.bool,
  avgRank: PropTypes.number.isRequired,
  kills: PropTypes.number.isRequired,
  deaths: PropTypes.number.isRequired,
};

function HistoryTeamCard(
  props: PropTypes.InferProps<typeof HistoryTeamCard.propTypes>,
) {
  const bgColor =
    props.isBlue === undefined
      ? Color.backgroundThird
      : props.isBlue
      ? Color.valorantCyanDarker
      : Color.valorantRedDarker;

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
        {props.isBlue !== undefined && (
          <Text style={styles.primaryText}>
            {props.isBlue ? 'Team Blue' : 'Team Red'}
          </Text>
        )}
        <Image
          style={styles.rankImage}
          resizeMode={'contain'}
          source={{
            uri: `https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/${props.avgRank}/largeicon.png`,
          }}
        />
      </View>

      {props.hasWon && <Text style={styles.primaryText}>WINNER</Text>}

      <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
        <Text style={styles.primaryText}>Kills: {props.kills}</Text>
        <Text style={styles.primaryText}>Deaths: {props.deaths}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rankImage: {
    height: 28,
    aspectRatio: 1,
  },
  primaryText: {
    color: Color.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    textShadowRadius: 4,
  },
});

export default HistoryTeamCard;
