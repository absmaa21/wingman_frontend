import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Color, APP_VERSION} from '../../Settings';
import BattlePassCalculatorScreen from './misc/BattlePassCalculatorScreen';
import CollectionScreen from './misc/CollectionScreen';
import SettingsScreen from './misc/SettingsScreen';
import TemporaryScreen from './misc/TemporaryScreen';
import AccountManagerScreen from './misc/AccountManagerScreen';
import { useEffect } from 'react';
import { logInfo } from '../../backend/utils/log-system/log-system';

const Stack = createNativeStackNavigator();

export default function OthersScreen() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator
                initialRouteName={'Main'}
                screenOptions={{
                    headerBackButtonMenuEnabled: true,
                    headerStyle: {backgroundColor: Color.backgroundPrimary},
                    headerShadowVisible: false,
                    headerTintColor: Color.textPrimary,
                    headerTitleAlign: 'center',
                }}>
                <Stack.Screen name={'Main'} component={Main} options={{headerShown: false}} />
                <Stack.Screen name={'Collection'} component={CollectionScreen} />
                <Stack.Screen
                    name={'BattlePassCalculator'}
                    component={BattlePassCalculatorScreen}
                    options={{headerTitle: 'Battle Pass Calculator'}}
                />
                <Stack.Screen name={'StoreAlert'} component={TemporaryScreen} options={{headerTitle: 'Store Alert'}} />
                <Stack.Screen name={'Settings'} component={SettingsScreen} />
                <Stack.Screen name={'Accounts'} component={AccountManagerScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function Main({navigation}: any) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Collection')}>
                <MaterialCommunityIcons name={'bag-personal'} size={96} color={Color.textSecondary} />
                <Text style={styles.header}>Collection</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BattlePassCalculator')}>
                <MaterialCommunityIcons name={'calculator'} size={96} color={Color.textSecondary} />
                <Text style={styles.header}>BP Calculator</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('StoreAlert')}>
                <MaterialCommunityIcons name={'star'} size={96} color={Color.textSecondary} />
                <Text style={styles.header}>Store Alert</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Settings')}>
                <MaterialCommunityIcons name={'cog'} size={96} color={Color.textSecondary} />
                <Text style={styles.header}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Accounts')}>
                <MaterialCommunityIcons name={'account-box'} size={96} color={Color.textSecondary} />
                <Text style={styles.header}>Accounts</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 8,
        gap: 8,
        justifyContent: 'space-between',
        backgroundColor: Color.backgroundPrimary,
    },
    card: {
        flex: 1,
        minWidth: 164,
        width: 'auto',
        height: 170,
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.backgroundSecondary,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Color.textSecondary,
    },
});
