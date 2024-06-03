import React from 'react';
import PropTypes from 'prop-types';
import {StyleProp, View, ViewStyle} from 'react-native';
import {EJustifyContent} from '../../types/TypeScriptInterfaces.ts';

Wrap.propTypes = {
    children: PropTypes.node.isRequired,
    paddingH: PropTypes.number,
    gap: PropTypes.number,
    align: PropTypes.string as unknown as EJustifyContent,
    paddingTop: PropTypes.number,
    nowrap: PropTypes.bool,
};

function Wrap(props: PropTypes.InferProps<typeof Wrap.propTypes>) {
    const style: StyleProp<ViewStyle> = {
        paddingHorizontal: props.paddingH ?? 0,
        gap: props.gap ?? 0,
        paddingTop: props.paddingTop ?? 0,
        flexDirection: 'row',
        flexWrap: props.nowrap ? 'nowrap' : 'wrap',
        justifyContent: props.align ?? 'center',
    };

    return <View style={style}>{props.children}</View>;
}

export default Wrap;
