import React from 'react';
import PropTypes from 'prop-types';
import {StyleProp, View, ViewStyle} from 'react-native';
import {EJustifyContent} from '../../types/TypeScriptInterfaces.ts';

Row.propTypes = {
    children: PropTypes.node.isRequired,
    gap: PropTypes.number,
    align: PropTypes.string as unknown as EJustifyContent,
    flex: PropTypes.number,
    padding: PropTypes.number,
    paddingH: PropTypes.number,
};

function Row(props: PropTypes.InferProps<typeof Row.propTypes>) {
    const style: StyleProp<ViewStyle> = {
        flex: props.flex ?? 0,
        flexDirection: 'row',
        gap: props.gap ?? 4,
        justifyContent: props.align ?? 'flex-start',
        padding: props.padding ?? 0,
        paddingHorizontal: props.paddingH ?? props.padding ?? 0,
    };
    return <View style={style}>{props.children}</View>;
}

export default Row;
