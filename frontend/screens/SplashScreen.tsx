import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { logInfo } from "../../backend/utils/log-system/log-system";
import { useApi } from "../contexts/apiContext";
import { useValorantClient } from "../contexts/valorantClientContext";
import Animated, { useSharedValue, withRepeat, withSequence, withDelay, withTiming, useAnimatedStyle } from "react-native-reanimated";
import { APP_BUILD, Color, EAppBuild } from "../../Settings";
import ValorantApi from "../../backend/valorant-api/api";
import ValorantClient from "../../backend/api/clients/valorant-client";
import { ApiResultType } from "../../backend/valorant-api/api-result";
import CookieManager from "@react-native-cookies/cookies";
import { IUser } from "../../backend/api/types/user";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
    logInfo('SplashScreen.tsx: opened splash screen');
    const navigation = useNavigation()
    const api = useApi();
    const client = useValorantClient();

    const opacity = useSharedValue(1);

    const startAnimation = () => {
        opacity.value = withRepeat(
            withSequence(withDelay(500, withTiming(0.5, {duration: 1000})), withTiming(1, {duration: 1000})),
            -1,
        );
    };

    useEffect(() => {
        startAnimation();
        fetchData(api, client, navigation);
    }, [api, client, navigation, opacity]);

    const animatedStyle = useAnimatedStyle(() => {
        return {opacity: opacity.value}
    })

    return (
        <View style={styles.container}>
            <Animated.Image
                style={[styles.image, animatedStyle]}
                source={require('../../assets/icon.png')}
                resizeMode={'contain'}
            />
        </View>
    );
}

async function fetchData(api: ValorantApi, client: ValorantClient, navigation: any) {
    if (APP_BUILD === EAppBuild.FRONTEND) {
        navigation.navigate('Main');
        return;
    }

    let activeUser: IUser | null = null;

    logInfo('SplashScreen.tsx: clearing all cookies');
    await CookieManager.clearAll();

    logInfo('SplashScreen.tsx: initialize api');
    const apiResult = await api.init();
    if (apiResult.type !== ApiResultType.SUCCESS) {
        logInfo('SplashScreen.tsx: Api Error');
    }

    logInfo('SplashScreen.tsx: initialize valorant client');
    client.init(api.getGameContentApi().getGameContent());

    logInfo('SplashScreen.tsx: getting active user');
    activeUser = api.getUserApi().getActiveUser();

    if (activeUser) {
        navigation.navigate('Main');
        return;
        logInfo('SplashScreen.tsx: Found active user');
        logInfo('SplashScreen.tsx: Reauthenticate active user');
        const authResult = await api.getUserApi().reAuthenticateUser(activeUser!);
        navigation.navigate(authResult.type === ApiResultType.SUCCESS ? 'Main' : 'Login');
    } else {
        logInfo('SplashScreen.tsx: No active user found');
        navigation.navigate('Login');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.backgroundPrimary,
    },
    image: {
        width: 128,
        height: 128,
    },
});
