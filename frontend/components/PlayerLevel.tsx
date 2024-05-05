import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  ImageStyle,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {levelImage} from '../../statics/Mappings.ts';
import {Color} from '../../Settings.ts';

PlayerLevel.propTypes = {
  level: PropTypes.number.isRequired,
  size: PropTypes.number,
};

function PlayerLevel(
  props: PropTypes.InferProps<typeof PlayerLevel.propTypes>,
) {
  const borderLevel =
    props.level || props.level < 20
      ? 1
      : props.level < 500
      ? props.level - (props.level % 20)
      : 500;
  const boxStyle: StyleProp<ViewStyle> = {
    justifyContent: 'center',
    alignItems: 'center',
  };
  const imageStyle: StyleProp<ImageStyle> = {
    width: 96 * (props.size ?? 1),
    height: 96 * 0.4210526316 * (props.size ?? 1),
  };
  const levelStyle: StyleProp<TextStyle> = {
    fontSize: 14 * (props.size ?? 1),
    position: 'absolute',
    color: Color.textPrimary,
  };
  return (
    <View style={boxStyle}>
      <Image
        source={levelImage[borderLevel]}
        style={imageStyle}
        resizeMode={'contain'}
      />
      <Text style={levelStyle}>{props.level}</Text>
    </View>
  );
}

export default PlayerLevel;
