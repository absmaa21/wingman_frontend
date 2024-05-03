import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {Color} from '../../Settings';
import {levelImage} from '../../statics/Mappings';
import {logInfo} from '../../backend/utils/log-system/log-system';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/*
    Agent,
    Name + Tag,
    Level,
    Current Rank + RR,
*/

function renderRightActions(progress: any, dragX: any) {
    return (
        <View style={styles.rightActionBox}>
            <MaterialCommunityIcons name={'bag-personal'} size={32} color={Color.textSecondary} />
        </View>
    );
}

export default function LivePlayerCard({playerObj, setChosenPlayer, setShowPlayerCollection}: any) {
    playerObj = playerObj.item;

    const screenWidth = Dimensions.get('window').width;
    const maxNumOfMatches = ((screenWidth - 80) / 24 - 0.5).toFixed(0);

    const playerName = 'orcan';
    const playerTag = '420';
    const playerLevel = playerObj.PlayerIdentity.AccountLevel;
    const levelSrc = playerLevel > 500 ? 500 : playerLevel < 20 ? 1 : playerLevel - (playerLevel % 20);

    const playerCurrentTier = playerObj.SeasonalBadgeInfo.Rank;
    const playerCurrentTierRR = 195;

    const playerWR = 34;
    const playerMatchCount = 67;

    const playerKills = 56;
    const playerDeaths = 35;
    const playerAssists = 19;
    const playerKDA = ((playerKills + playerAssists) / playerDeaths).toFixed(2);
    const playerKD = (playerKills / playerDeaths).toFixed(2);

    function handleSwipeableOpen(direction: string, swipeable: any) {
        swipeable.close();

        if (direction === 'right') {
            logInfo(`Collection opened from Player: ${playerObj.Subject}`);
            setChosenPlayer(playerObj);
            setShowPlayerCollection(true);
        }
    }

    return (
        <GestureHandlerRootView>
            <Swipeable
                childrenContainerStyle={styles.container}
                renderRightActions={renderRightActions}
                onSwipeableOpen={handleSwipeableOpen}
                overshootFriction={10}>
                <Image
                    source={{uri: `https://media.valorant-api.com/agents/${playerObj.CharacterID}/displayicon.png`}}
                    style={styles.agentImage}
                    resizeMode={'contain'}
                />

                <View style={styles.box}>
                    <View style={styles.userDetails}>
                        <Text style={styles.playerName}>
                            {playerName}
                            <Text style={styles.playerTag}>#{playerTag}</Text>
                        </Text>
                        <View style={styles.playerLevelBadge}>
                            <Image
                                source={levelImage[levelSrc as keyof typeof levelImage]}
                                style={styles.playerLevelImage}
                                resizeMode={'contain'}
                            />
                            <Text style={styles.playerLevelText}>{playerLevel}</Text>
                        </View>
                    </View>

                    <View style={styles.rankBox}>
                        <Image
                            source={{
                                uri: `https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/${playerCurrentTier}/largeicon.png`,
                            }}
                            resizeMode={'contain'}
                            style={styles.currentRankImage}
                        />
                        <Text style={styles.currentRankRR}>{playerCurrentTierRR}rr</Text>
                    </View>

                    <View style={styles.playerStats}>
                        <Text style={styles.playerStatsHeader}>Win %</Text>
                        <Text style={styles.playerStatsText}>
                            {playerWR}% ({playerMatchCount})
                        </Text>
                    </View>

                    <View style={styles.playerStats}>
                        <Text style={styles.playerStatsHeader}>KDA</Text>
                        <Text style={styles.playerStatsText}>
                            {playerKDA} ({playerKD})
                        </Text>
                    </View>
                </View>
                <View style={styles.matchHistoryBox}>
                    <View style={[styles.matchRectangle, {backgroundColor: Color.valorantRedDark, height: 3}]} />
                    <View style={[styles.matchRectangle, {backgroundColor: Color.valorantRedDark}]} />
                    <View style={[styles.matchRectangle, {backgroundColor: Color.valorantYellowDark}]} />
                    <View style={[styles.matchRectangle, {backgroundColor: Color.valorantCyanDark}]} />
                    <View style={[styles.matchRectangle, {backgroundColor: Color.valorantRedDark}]} />
                    <View style={[styles.matchRectangle, {backgroundColor: Color.valorantRedDark}]} />
                    <View style={[styles.matchRectangle, {backgroundColor: Color.valorantYellowDark}]} />
                    <View style={[styles.matchRectangle, {backgroundColor: Color.valorantCyanDark}]} />
                    <View style={[styles.matchRectangle, {backgroundColor: Color.valorantCyanDark}]} />
                    <View style={[styles.matchRectangle, {backgroundColor: Color.valorantRedDark}]} />
                    <View style={[styles.matchRectangle, {backgroundColor: Color.valorantCyanDark}]} />
                    <View style={[styles.matchRectangle, {backgroundColor: Color.valorantCyanDark}]} />
                    <View style={[styles.matchRectangle, {backgroundColor: Color.valorantCyanDark}]} />
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 12,
        backgroundColor: Color.backgroundPrimary,
        borderColor: Color.backgroundThird,
        borderWidth: 1.5,
        overflow: 'hidden',
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    matchHistoryBox: {
        position: 'absolute',
        bottom: 0,
        right: 16,
        flexDirection: 'row',
        gap: 3,
    },

    matchRectangle: {
        alignSelf: 'flex-end',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        width: 20,
        height: 2,
        backgroundColor: Color.backgroundSecondary,
    },

    agentImage: {
        height: 56,
        width: 56,
        zIndex: 2,
    },

    userDetails: {
        justifyContent: 'center',
    },
    playerName: {
        color: Color.textSecondary,
    },
    playerTag: {
        fontSize: 11,
        color: Color.textFourth,
    },

    playerLevelBadge: {
        marginTop: -6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerLevelImage: {
        width: 64,
        height: 40,
    },
    playerLevelText: {
        position: 'absolute',
        color: Color.textPrimary,
        textAlign: 'center',
        fontSize: 11,
    },

    rankBox: {
        justifyContent: 'center',
        gap: -4,
    },
    currentRankImage: {
        alignSelf: 'center',
        width: 34,
        height: 34,
    },
    currentRankRR: {
        color: Color.textPrimary,
        alignSelf: 'center',
        fontSize: 12,
    },

    playerStats: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    playerStatsHeader: {
        color: Color.textPrimary,
    },
    playerStatsText: {
        color: Color.textSecondary,
    },

    collectionBtn: {
        paddingTop: 4,
        paddingRight: 4,
    },

    rightActionBox: {
        padding: 4,
        borderRadius: 12,
        marginLeft: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.backgroundPrimary,
        borderColor: Color.backgroundThird,
        borderWidth: 1.5,
    },
});
