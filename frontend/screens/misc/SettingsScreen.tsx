import {ScrollView, StyleSheet} from 'react-native';
import {useState} from 'react';
import {Color, EStatsPeriod, Settings} from '../../../Settings';
import ButtonToggle from '../../components/ButtonToggle.tsx';
import Column from '../../components/Column.tsx';

export default function SettingsScreen() {
  const [showStoreVideo, setShowStoreVideo] = useState(Settings.showVideos);
  const [autoplayStoreVideo, setAutoplayStoreVideo] = useState(
    Settings.autoPlayVideos,
  );
  const [statsPeriod, setStatsPeriod] = useState(Settings.statsPeriod);

  function handleStoreVideoPress() {
    setShowStoreVideo(!showStoreVideo);
    Settings.showVideos = showStoreVideo;
  }

  function handleStoreAutoplayPress() {
    setAutoplayStoreVideo(!autoplayStoreVideo);
    Settings.autoPlayVideos = autoplayStoreVideo;
  }

  function handleStatsPeriodPress(period: EStatsPeriod) {
    setStatsPeriod(period);
    Settings.statsPeriod = statsPeriod;
  }

  return (
    <ScrollView style={styles.container}>
      <Column gap={8}>
        <ButtonToggle
          title={'Show videos in store'}
          onPress={handleStoreVideoPress}
          active={showStoreVideo}
        />
        <ButtonToggle
          title={'Auto play videos in store'}
          onPress={handleStoreAutoplayPress}
          active={autoplayStoreVideo}
          pressable={showStoreVideo}
        />
      </Column>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: Color.backgroundPrimary,
  },
});
