import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {Color} from '../../Settings.ts';
import Container from './Container.tsx';
import {EJustifyContent} from '../../types/TypeScriptInterfaces.ts';
import Column from './Column.tsx';

ProfileRank.propTypes = {
  tier: PropTypes.number.isRequired,
  rr: PropTypes.number.isRequired,
  rank: PropTypes.number,
  season: PropTypes.string,
};

function ProfileRank(
  props: PropTypes.InferProps<typeof ProfileRank.propTypes>,
) {
  const isPeak: boolean = !!props.season;
  const left6Style: StyleProp<ViewStyle> = {
    left: 6,
  };
  const right6Style: StyleProp<ViewStyle> = {
    right: 6,
  };
  const left8Style: StyleProp<ViewStyle> = {
    left: 8,
  };
  const right8Style: StyleProp<ViewStyle> = {
    right: 8,
  };
  const topStyle: StyleProp<ViewStyle> = {
    top: 14,
  };

  return (
    <Container
      flex={1}
      padding={4}
      align={props.season ? EJustifyContent.START : EJustifyContent.END}>
      <Text style={[styles.header, isPeak ? right6Style : left6Style]}>
        {isPeak ? 'PEAK' : 'CURRENT'}
      </Text>
      <Text
        style={[styles.header, isPeak ? right6Style : left6Style, topStyle]}>
        {isPeak ? props.season : ''}
      </Text>
      <Image
        source={{
          uri: `https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/${props.tier}/largeicon.png`,
        }}
        style={styles.image}
        resizeMode={'contain'}
      />
      <Text style={[styles.rr, isPeak ? right8Style : left8Style]}>
        {props.rr} RR
      </Text>
      {props.rank && (
        <Text style={[styles.rank, isPeak ? right8Style : left8Style]}>
          #{props.rank}
        </Text>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 2,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: Color.textSixth,
  },
  image: {
    width: 78,
    height: 78,
  },
  rr: {
    position: 'absolute',
    bottom: 4,
    fontSize: 20,
    fontWeight: '500',
    color: Color.textSecondary,
  },
  rank: {
    position: 'absolute',
    bottom: 26,
    fontSize: 14,
    fontWeight: '300',
    color: Color.textFourth,
  },
});

export default ProfileRank;
