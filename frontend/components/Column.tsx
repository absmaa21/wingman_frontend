import React from 'react';
import PropTypes from 'prop-types';
import {StyleProp, View, ViewStyle} from 'react-native';
import {EJustifyContent} from '../../types/TypeScriptInterfaces.ts';

Column.propTypes = {
  children: PropTypes.node.isRequired,
  gap: PropTypes.number,
  flex: PropTypes.number,
  align: PropTypes.string as unknown as EJustifyContent,
  paddingH: PropTypes.number,
};

function Column(props: PropTypes.InferProps<typeof Column.propTypes>) {
  const style: StyleProp<ViewStyle> = {
    flexDirection: 'column',
    justifyContent: props.align ?? 'space-between',
    gap: props.gap ?? 4,
    flex: props.flex ?? 0,
    paddingHorizontal: props.paddingH ?? 0,
  };
  return <View style={style}>{props.children}</View>;
}

export default Column;
