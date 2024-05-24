import React from 'react';
import {StyleProp, Text, TextStyle, View, ViewStyle} from 'react-native';
import {Color} from '../../Settings.ts';

interface IValueDisplay {
  title: string;
  value: string;
}

function ValueDisplay(props: IValueDisplay) {
  const container: StyleProp<ViewStyle> = {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Color.backgroundSecondary,
  };
  const title: StyleProp<TextStyle> = {
    flex: 1,
    padding: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.textPrimary,
    backgroundColor: Color.accent,
  };
  const value: StyleProp<TextStyle> = {
    textAlign: 'right',
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: Color.textPrimary,
  };
  return (
    <View style={container}>
      <Text style={title}>{props.title}</Text>
      <Text style={value}>{props.value}</Text>
    </View>
  );
}

export default ValueDisplay;
