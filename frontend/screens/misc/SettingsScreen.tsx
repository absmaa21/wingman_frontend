import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import {Color, EStatsPeriod, Settings} from '../../../Settings';

export default function SettingsScreen() {
    const [showStoreVideo, setShowStoreVideo] = useState(Settings.showVideos);
    const [autoplayStoreVideo, setAutoplayStoreVideo] = useState(Settings.autoPlayVideos);
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
            <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.button, showStoreVideo && styles.buttonActive]}
                onPress={handleStoreVideoPress}>
                <View style={[styles.sideBox, {left: 24}, showStoreVideo && styles.sideBoxActive]} />
                <Text style={styles.buttonText}>Show videos in store</Text>
                <View style={[styles.sideBox, {right: 24}, showStoreVideo && styles.sideBoxActive]} />
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.5}
                style={[
                    styles.button,
                    autoplayStoreVideo && showStoreVideo && styles.buttonActive,
                    !showStoreVideo && {opacity: 0.3},
                ]}
                onPress={handleStoreAutoplayPress}>
                <View
                    style={[styles.sideBox2, {left: 24}, autoplayStoreVideo && showStoreVideo && styles.sideBoxActive]}
                />
                <Text style={styles.buttonText}>Autoplay videos in store</Text>
                <View
                    style={[styles.sideBox2, {right: 24}, autoplayStoreVideo && showStoreVideo && styles.sideBoxActive]}
                />
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.5}
                style={[
                    styles.button,
                    autoplayStoreVideo && showStoreVideo && styles.buttonActive,
                    !showStoreVideo && {opacity: 0.3},
                ]}
                onPress={handleStoreAutoplayPress}>
                <View
                    style={[styles.sideBox, {left: 24}, autoplayStoreVideo && showStoreVideo && styles.sideBoxActive]}
                />
                <Text style={styles.buttonText}>Autoplay videos in store</Text>
                <View
                    style={[styles.sideBox, {right: 24}, autoplayStoreVideo && showStoreVideo && styles.sideBoxActive]}
                />
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: Color.backgroundPrimary,
    },
    button: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        paddingHorizontal: 32,
        gap: 4,
        borderWidth: 3,
        borderColor: Color.backgroundSecondary,
        borderRadius: 12,
        marginBottom: 8,
        overflow: 'hidden',
    },
    buttonActive: {
        borderColor: Color.accent,
    },
    sideBox: {
        position: 'absolute',
        width: '10%',
        height: '1000%',
        backgroundColor: Color.backgroundSecondary,
        transform: [{rotate: '30deg'}],
    },
    sideBox2: {
        position: 'absolute',
        width: '10%',
        height: '1000%',
        backgroundColor: Color.backgroundSecondary,
        transform: [{rotate: '-30deg'}],
    },
    sideBoxActive: {
        backgroundColor: Color.accent,
    },
    buttonText: {
        fontSize: 16,
        color: Color.textSecondary,
    },
});
