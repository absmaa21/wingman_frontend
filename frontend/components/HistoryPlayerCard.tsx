import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, View} from "react-native";
import {Color} from "../../Settings";
import InfoBox from "./InfoBox";

HistoryPlayerCard.propTypes = {
    player: PropTypes.object.isRequired,
    isPlayerTeam: PropTypes.bool,
    hasBorder: PropTypes.bool,
};

function HistoryPlayerCard(props: any) {
    return (
        <View style={[styles.container, {borderBottomWidth: props.hasBorder ? 1 : 0}]}>
            <Image
                source={{uri: `https://media.valorant-api.com/agents/${'dade69b4-4f5a-8528-247b-219e5a1facd6'}/displayicon.png`}}
                style={styles.agentImage}
                resizeMode={'contain'}
            />

            <InfoBox title={'orcan'} titleExtra={'#420'} detail={'Lvl 101'} />
            <Image
                style={styles.rankImage}
                resizeMode={'contain'}
                source={{uri: 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/15/largeicon.png'}}
            />
            <InfoBox title={'WS'} detail={'999'} />
            <InfoBox title={'ACS'} detail={'123'} />
            <InfoBox title={'K'} detail={'26'} />
            <InfoBox title={'D'} detail={'14'} />
            <InfoBox title={'A'} detail={'7'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        overflow: 'hidden',
        paddingRight: 12,
        borderColor: Color.grey,
        backgroundColor: Color.backgroundPrimary,
    },
    agentImage: {
        height: 56,
        width: 56,
        zIndex: 2,
    },
    primaryText: {
        fontSize: 16,
        color: Color.textPrimary,
    },
    secondaryText: {
        fontSize: 14,
        color: Color.textSecondary,
    },
    rankImage: {
        height: '100%',
        width: 36,
        marginLeft: 4,
    },
})

export default HistoryPlayerCard;
