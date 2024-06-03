import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {APP_BUILD, Color, EAppBuild} from '../../Settings';
import {logInfo} from '../../backend/utils/log-system/log-system';
import BottomBarTab from './BottomBarTab';
import {useApi} from '../contexts/apiContext';

export default function BottomBarNavigation({navigation}: any) {
    const api = useApi();

    const [activeTab, setActiveTab] = useState('Home');
    const [profileCardUuid, setProfileCardUuid] = useState<string>(api.getUserApi().getActiveUser()?.cardID ?? '')

    function handlePagePress(tab: string) {
        logInfo('BottomBarNavigation.tsx: Switching to ' + tab);
        navigation.navigate(tab, tab);
        setActiveTab(tab);
    }

    useEffect(() => {
        if (profileCardUuid.length <= 0) {
            const str = APP_BUILD !== EAppBuild.FRONTEND
                ? api.getUserApi().getActiveUser()?.cardID ?? ''
                : '33c1f011-4eca-068c-9751-f68c788b2eee';
            setProfileCardUuid(str)
        }
    })

    return (
        <View style={styles.container}>
            <BottomBarTab
                handlePagePress={handlePagePress}
                tabName="Home"
                iconName="home"
                isActive={activeTab === 'Home'}
            />
            <BottomBarTab
                handlePagePress={handlePagePress}
                tabName="FavouritePage"
                iconName="bag-personal"
                isActive={activeTab === 'FavouritePage'}
            />

            <TouchableOpacity
                style={styles.fabButton}
                onPress={() => handlePagePress('Profile')}>
                <Image
                    source={{
                        uri: `https://media.valorant-api.com/playercards/${profileCardUuid}/displayicon.png`,
                    }}
                    style={{width: 60, height: 60, borderRadius: 64}}
                />
            </TouchableOpacity>

            <BottomBarTab
                handlePagePress={handlePagePress}
                tabName="Store"
                iconName="cart"
                isActive={activeTab === 'Store'}
            />
            <BottomBarTab
                handlePagePress={handlePagePress}
                tabName="Other"
                iconName="apps"
                isActive={activeTab === 'Other'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'rgba(255,255,255,.1)',
        borderTopWidth: 1,
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: Color.backgroundPrimary,
    },
    fabButton: {
        width: 64,
        height: 64,
        borderRadius: 64,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        marginBottom: 26,
        backgroundColor: Color.accent,
    },
});
