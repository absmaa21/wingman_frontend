import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Color} from '../../../Settings';
import {gamemodeInfo} from '../../../statics/Mappings';
import ValueDisplay from '../../components/ValueDisplay.tsx';

export default function BattlePassCalculatorScreen() {
  const [remainingXP, setRemainingXP] = useState(10000);
  const [levelGoal, setLevelGoal] = useState(55);
  const [xpBoost, setXpBoost] = useState(0);

  const currentLevel = 34;
  const currentWeek = 2;
  const actEndDate = new Date(2024, 1, 8);
  const remainingDays =
    (actEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);

  function handleLevelGoalChange(value: string) {
    const number = Number(value);

    if (number > 55) {
      setLevelGoal(55);
    } else if (number < 2) {
      setLevelGoal(2);
    } else {
      setLevelGoal(number);
    }
  }
  function handleXpBoostChange(amount: number) {
    if (xpBoost === amount || xpBoost === 23) {
      setXpBoost(xpBoost - amount);
    } else {
      setXpBoost(xpBoost + amount);
    }
  }
  function handleRemainingXpChange(value: string) {
    const number = Number(value);

    if (number > remainingXpForLevel(currentLevel)) {
      setRemainingXP(remainingXpForLevel(currentLevel));
    } else if (number < 0) {
      setRemainingXP(0);
    } else {
      setRemainingXP(number);
    }
  }
  function remainingXpForLevel(level: number) {
    return level <= 50 ? (level - 2) * 750 + 2000 : 36500;
  }
  function fullRemainingXp() {
    let xp = 0;
    for (let i = currentLevel + 1; i <= levelGoal; i++) {
      xp += remainingXpForLevel(i);
    }
    xp += remainingXP;
    return xp;
  }

  function realRemainingXp() {
    return fullRemainingXp() - fullRemainingXp() * (xpBoost / 100);
  }

  function getHoursRemainingPerDay() {
    const compMatchesPerDay =
      realRemainingXp() / gamemodeInfo.competitive.avgXpPerMatch;
    const minutesRemaining =
      compMatchesPerDay * gamemodeInfo.competitive.avgLengthInMin;
    return minutesRemaining / 60;
  }

  function getRemainingHoursFormatted() {
    const remainingHours: number = getHoursRemainingPerDay() / remainingDays;
    const hours = Math.floor(remainingHours);
    const minutes = Math.round((remainingHours - hours) * 60);
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return formattedHours + ':' + formattedMinutes;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentContainer}>
        <Text style={styles.currentLevel}>Current Level: {currentLevel}</Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.levelGoalText}>Tier Goal</Text>
          <TextInput
            style={styles.levelGoalInput}
            value={levelGoal.toString()}
            onChangeText={handleLevelGoalChange}
            keyboardType={'numeric'}
            selectionColor={Color.textPrimary}
          />
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.levelGoalText}>XP Remaining</Text>
          <TextInput
            style={styles.levelGoalInput}
            value={remainingXP.toString()}
            onChangeText={handleRemainingXpChange}
            keyboardType={'numeric'}
            selectionColor={Color.textPrimary}
          />
        </View>

        <Text style={styles.xpBoost}>XP Boost ({xpBoost}%)</Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  xpBoost === 3 || xpBoost === 23 ? Color.accent : '#fff3',
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
                marginRight: 2,
              },
            ]}
            onPress={() => handleXpBoostChange(3)}>
            <Text style={styles.buttonText}>Premium BP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  xpBoost === 20 || xpBoost === 23 ? Color.accent : '#fff3',
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                marginLeft: 2,
              },
            ]}
            onPress={() => handleXpBoostChange(20)}>
            <Text style={styles.buttonText}>Game Pass</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultHeader}>Results</Text>
        <ValueDisplay
          title={'Remaining XP'}
          value={fullRemainingXp().toString()}
        />
        <ValueDisplay
          title={'Hours per day'}
          value={getRemainingHoursFormatted()}
        />
        <ValueDisplay
          title={'Competitive per day'}
          value={Math.ceil(
            realRemainingXp() /
              remainingDays /
              gamemodeInfo.competitive.avgXpPerMatch +
              1,
          ).toString()}
        />
        <ValueDisplay
          title={'Spike rush per day'}
          value={Math.ceil(
            realRemainingXp() /
              remainingDays /
              gamemodeInfo['spike-rush'].avgXpPerMatch +
              1,
          ).toString()}
        />
        <ValueDisplay
          title={'TDM per day'}
          value={Math.ceil(
            realRemainingXp() /
              remainingDays /
              gamemodeInfo['team-deathmatch'].avgXpPerMatch +
              1,
          ).toString()}
        />
        <ValueDisplay
          title={'Deathmatches per day'}
          value={Math.ceil(
            realRemainingXp() /
              remainingDays /
              gamemodeInfo.deathmatch.avgXpPerMatch +
              1,
          ).toString()}
        />
        <ValueDisplay
          title={'Time Remaining'}
          value={remainingDays.toFixed(0)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: Color.backgroundPrimary,
  },

  contentContainer: {
    padding: 16,
    borderRadius: 12,
    gap: 4,
    backgroundColor: Color.backgroundSecondary,
  },
  currentLevel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderContainer: {
    marginVertical: 8,
  },
  levelGoalText: {
    position: 'absolute',
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.textSecondary,
    left: 8,
    top: 8,
  },
  levelGoalInput: {
    position: 'absolute',
    color: Color.textSecondary,
    right: 8,
    top: -4,
  },
  xpBoost: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 4,
    color: Color.textSecondary,
  },

  button: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Color.textSecondary,
  },

  resultsContainer: {
    marginBottom: 32,
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  resultHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.textSecondary,
    textAlign: 'center',
  },
  resultRow: {
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: Color.backgroundSecondary,
  },
  resultTitle: {
    flex: 1,
    textAlign: 'left',
    fontSize: 16,
    padding: 12,
    fontWeight: 'bold',
    color: Color.textSecondary,
    backgroundColor: Color.accent,
  },
  resultText: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    color: Color.textSecondary,
    padding: 12,
  },
});
