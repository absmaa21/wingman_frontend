import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Color} from '../../Settings.ts';

interface IButtonToggle {
  title: string;
  onPress: () => void;
  active: boolean;
  pressable?: boolean;
}

function ButtonToggle(props: IButtonToggle) {
  const pressable = props.pressable ?? true;
  const container: StyleProp<ViewStyle> = {
    padding: 12,
    borderRadius: 12,
    borderWidth: 4,
    borderColor:
      props.active && pressable ? Color.accent : Color.backgroundSecondary,
  };
  const text: StyleProp<TextStyle> = {
    color: pressable ? Color.textPrimary : Color.backgroundSecondary,
    textAlign: 'center',
    fontSize: 20,
  };

  function handlePress() {
    if (pressable) {
      props.onPress();
    }
  }

  return (
    <TouchableOpacity
      style={container}
      onPress={handlePress}
      activeOpacity={pressable ? 0.5 : 1}>
      <Text style={text}>{props.title}</Text>
    </TouchableOpacity>
  );
}

export default ButtonToggle;
