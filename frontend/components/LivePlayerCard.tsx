import React from 'react';
import {
  Dimensions,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Color} from '../../Settings';
import {logInfo} from '../../backend/utils/log-system/log-system';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import {IPlayer} from '../../types/valapidocs.techchrism.me/PVP_ENDPOINTS/CurrentGame';
import PlayerLevel from './PlayerLevel.tsx';
import PlayerName from './PlayerName.tsx';
import PlayerRank from './PlayerRank.tsx';
import InfoBox from './InfoBox.tsx';
import Row from './Row.tsx';
import Column from './Column.tsx';
import {EJustifyContent} from '../../types/TypeScriptInterfaces.ts';
import TextTicker from 'react-native-text-ticker';

function renderRightActions() {
  return (
    <View style={styles.rightActionBox}>
      <MaterialCommunityIcons
        name={'bag-personal'}
        size={32}
        color={Color.textSecondary}
      />
    </View>
  );
}

LivePlayerCard.propTypes = {
  playerObj: PropTypes.object.isRequired as unknown as IPlayer,
  setChosenPlayer: PropTypes.func.isRequired,
  setChosenProfile: PropTypes.func.isRequired,
};

export default function LivePlayerCard(
  props: PropTypes.InferProps<typeof LivePlayerCard.propTypes>,
) {
  const playerObj: IPlayer = props.playerObj.item;
  const screenWidth = Dimensions.get('window').width;
  const maxNumOfMatches = parseInt(
    ((screenWidth - 80) / 24 - 0.5).toFixed(0),
    10,
  );

  const lastMatches = [
    1, 1, 0, 2, 1, 1, 0, 0, 0, 0, 1, 2, 0, 0, 1, 1, 0, 0, 1, 2, 2, 1, 1, 0,
  ];
  const playerName = 'orcan';
  const playerTag = '420';
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
      props.setChosenPlayer(playerObj);
    }
  }

  if (!playerObj) {
    return <Text>Nothing found</Text>;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => props.setChosenProfile(playerObj.Subject)}>
      <GestureHandlerRootView>
        <Swipeable
          childrenContainerStyle={styles.container}
          renderRightActions={renderRightActions}
          onSwipeableOpen={handleSwipeableOpen}
          overshootFriction={10}>
          <Image
            source={{
              uri: `https://media.valorant-api.com/agents/${playerObj.CharacterID}/displayicon.png`,
            }}
            style={styles.agentImage}
            resizeMode={'contain'}
          />
          <Column align={EJustifyContent.CENTER}>
            <PlayerName
              name={playerName}
              tag={playerTag}
              fontSize={14}
              center
            />
            <PlayerLevel
              level={playerObj.PlayerIdentity.AccountLevel}
              size={0.7}
            />
          </Column>
          <Row align={EJustifyContent.AROUND} flex={1}>
            <PlayerRank
              tier={playerObj.SeasonalBadgeInfo.Rank}
              rr={playerCurrentTierRR}
              size={0.43}
              marginBottom={0}
            />
            <InfoBox
              title={'WR'}
              detail={`${playerWR}% (${playerMatchCount})`}
            />
            <InfoBox title={'KDA'} detail={`${playerKDA} (${playerKD})`} />
          </Row>
          <View style={styles.matchHistoryBox}>
            {lastMatches.map((match, index) => {
              if (index >= maxNumOfMatches) {
                return;
              }

              const style: StyleProp<ViewStyle> = {
                backgroundColor:
                  match === 0
                    ? Color.valorantCyan
                    : match === 1
                    ? Color.valorantRedDark
                    : Color.valorantYellowDark,
                height: index === 0 ? 3 : 2,
              };

              return (
                <View key={index} style={[styles.matchRectangle, style]} />
              );
            })}
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    </TouchableOpacity>
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
