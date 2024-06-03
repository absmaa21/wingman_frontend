import React from 'react';
import PropTypes from 'prop-types';
import {IDailyImageMapping} from '../../types/Interfaces.ts';
import {dailyImageMapping} from '../../statics/Mappings.ts';
import {Image, ImageStyle, StyleProp} from 'react-native';
import Row from './Row.tsx';

PlayerDailyCheckpoints.propTypes = {
    dailiesFinished: PropTypes.number.isRequired,
};

function PlayerDailyCheckpoints(
    props: PropTypes.InferProps<typeof PlayerDailyCheckpoints.propTypes>,
) {
    let dailiesFinished = props.dailiesFinished;
    let checkpointImages: IDailyImageMapping[] = [];
    for (let i = 0; i < 4; i++) {
        checkpointImages[i] =
            dailiesFinished >= 4
                ? dailyImageMapping[4]
                : dailyImageMapping[dailiesFinished % 4];
        dailiesFinished = Math.max(0, dailiesFinished - 4);
    }

    const imageStyle: StyleProp<ImageStyle> = {
        width: 20,
        height: 20,
    };

    return (
        <Row>
            {checkpointImages.map((image, index) => (
                <Image key={index} source={image} style={imageStyle}/>
            ))}
        </Row>
    );
}

export default PlayerDailyCheckpoints;
