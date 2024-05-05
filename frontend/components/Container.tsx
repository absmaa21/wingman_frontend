import React from 'react';
import PropTypes from 'prop-types';
import {StyleProp, View, ViewStyle} from 'react-native';
import {Color} from '../../Settings.ts';
import {EJustifyContent} from '../../types/TypeScriptInterfaces.ts';

Container.propTypes = {
  hasTopLeftCorner: PropTypes.bool,
  hasTopRightCorner: PropTypes.bool,
  hasBottomLeftCorner: PropTypes.bool,
  hasBottomRightCorner: PropTypes.bool,
  height: PropTypes.number,
  flex: PropTypes.number,
  children: PropTypes.node,
  align: PropTypes.string as unknown as EJustifyContent,
  padding: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  style: PropTypes.object,
};

function Container(props: PropTypes.InferProps<typeof Container.propTypes>) {
  const style: StyleProp<ViewStyle> = {
    flex: props.flex ?? 0,
    height: props.height ?? 'auto',
    padding: props.padding ?? 6,
    paddingHorizontal: props.paddingHorizontal ?? 12,
    flexDirection: 'row',
    justifyContent: props.align ?? 'space-between',
    backgroundColor: Color.backgroundSecondary,
    borderTopLeftRadius: props.hasTopLeftCorner ? 12 : 4,
    borderTopRightRadius: props.hasTopRightCorner ? 12 : 4,
    borderBottomLeftRadius: props.hasBottomLeftCorner ? 12 : 4,
    borderBottomRightRadius: props.hasBottomRightCorner ? 12 : 4,
    overflow: 'hidden',
  };

  return <View style={[style, props.style]}>{props.children}</View>;
}

export default Container;
