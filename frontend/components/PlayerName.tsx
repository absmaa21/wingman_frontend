import React from 'react';
import PropTypes from 'prop-types';
import {StyleProp, Text, TextStyle} from 'react-native';
import {Color} from '../../Settings.ts';

PlayerName.propTypes = {
  name: PropTypes.string.isRequired,
  tag: PropTypes.string,
  fontSize: PropTypes.number,
  center: PropTypes.bool,
};

function PlayerName(props: PropTypes.InferProps<typeof PlayerName.propTypes>) {
  const fontSize = props.fontSize ?? 18;
  const nameStyle: StyleProp<TextStyle> = {
    fontSize: fontSize,
    color: Color.textSecondary,
    textAlign: props.center ? 'center' : 'auto',
  };
  const tagStyle: StyleProp<TextStyle> = {
    fontSize: fontSize * 0.8,
    color: Color.textFifth,
  };

  return (
    <Text style={nameStyle}>
      {props.name}
      <Text style={tagStyle}>#{props.tag}</Text>
    </Text>
  );
}

export default PlayerName;
