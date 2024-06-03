import React from 'react';
import PropTypes from 'prop-types';
import Column from './Column.tsx';
import {Text} from 'react-native';
import {Color} from '../../Settings.ts';

ProfileStat.propTypes = {
    header: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
};

function ProfileStat(
    props: PropTypes.InferProps<typeof ProfileStat.propTypes>,
) {
    const headerStyle: any = {
        fontSize: 11,
        color: Color.textFourth,
    };
    const detailStyle: any = {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'right',
        color: Color.textSecondary,
    };

    return (
        <Column flex={1} gap={2}>
            <Text style={headerStyle}>{props.header}</Text>
            <Text style={detailStyle}>{props.detail}</Text>
        </Column>
    );
}

export default ProfileStat;
