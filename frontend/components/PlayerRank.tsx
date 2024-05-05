import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import {Color} from '../../Settings.ts';

PlayerRank.propTypes = {
  tier: PropTypes.number.isRequired,
  rr: PropTypes.number,
  rank: PropTypes.number,
  size: PropTypes.number,
  marginBottom: PropTypes.number,
};

function PlayerRank(props: PropTypes.InferProps<typeof PlayerRank.propTypes>) {
  function renderRR() {
    return props.rr ? <Text style={rrStyle}>{props.rr} RR</Text> : <></>;
  }

  function renderRank() {
    return props.rank ? <Text style={rankStyle}>#{props.rank}</Text> : <></>;
  }

  const imageStyle: StyleProp<ImageStyle> = {
    width: 88 * (props.size ?? 1),
    marginBottom: props.marginBottom ?? -8,
    aspectRatio: 1,
  };

  const rrStyle: StyleProp<TextStyle> = {
    fontSize: 18 * (props.size ?? 1),
    fontWeight: 'bold',
    marginBottom: -4 * (props.size ?? 1),
    color: Color.textSecondary,
  };

  const rankStyle: StyleProp<TextStyle> = {
    fontSize: 14 * (props.size ?? 1),
    color: Color.textFifth,
  };

  return (
    <View style={styles.container}>
      <Image
        style={imageStyle}
        source={{
          uri: `https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/${props.tier}/largeicon.png`,
        }}
      />
      {renderRR()}
      {renderRank()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlayerRank;
