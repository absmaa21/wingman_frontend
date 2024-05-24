import React from 'react';
import PropTypes from 'prop-types';
import {StyleProp, Text, TextStyle} from 'react-native';
import {Color} from '../../Settings.ts';
import TextTicker from 'react-native-text-ticker';

PlayerName.propTypes = {
  name: PropTypes.string.isRequired,
  tag: PropTypes.string,
  fontSize: PropTypes.number,
  center: PropTypes.bool,
  width: PropTypes.number,
};

function PlayerName(props: PropTypes.InferProps<typeof PlayerName.propTypes>) {
  const fontSize = props.fontSize ?? 18;
  const nameStyle: StyleProp<TextStyle> = {
    fontSize: fontSize,
    color: Color.textSecondary,
    textAlign: props.center ? 'center' : 'auto',
    width: props.width ?? 64,
  };
  const tagStyle: StyleProp<TextStyle> = {
    fontSize: fontSize * 0.8,
    color: Color.textFifth,
  };

  return (
    <TextTicker
      style={nameStyle}
      duration={12000}
      loop
      marqueeDelay={1000}
      repeatSpacer={10}>
      {props.name}
      <Text style={tagStyle}>#{props.tag}</Text>
    </TextTicker>
  );
}

export default PlayerName;
