import React from 'react';
import {StatusBar} from 'react-native';
import {initLogSystem, logInfo} from './backend/utils/log-system/log-system';
import {APP_BUILD, Color, EAppBuild} from './Settings';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './frontend/screens/SplashScreen';
import RsoScreen from './frontend/screens/RsoScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomBarNavigation from './frontend/components/BottomBarNavigation';
import HomeScreen from './frontend/screens/HomeScreen';
import ProfileScreen from './frontend/screens/ProfileScreen';
import StoreScreen from './frontend/screens/StoreScreen';
import OthersScreen from './frontend/screens/OthersScreen';
import CollectionScreen from './frontend/screens/misc/CollectionScreen';
import {ApiProvider} from './frontend/contexts/apiContext';
import {ValorantClientProvider} from './frontend/contexts/valorantClientContext';
import ValorantApi from './backend/valorant-api/api';
import ValorantClient from './backend/api/clients/valorant-client';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Main() {
  return (
    <Tab.Navigator tabBar={props => <BottomBarNavigation {...props} />}>
      <Tab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={'FavouritePage'}
        component={CollectionScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={'Store'}
        component={StoreScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={'Other'}
        component={OthersScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

export default function App(): React.JSX.Element {
  initLogSystem(false, APP_BUILD === EAppBuild.PUBLIC).then(() =>
    logInfo('App.tsx: Log System started'),
  );
  StatusBar.setBackgroundColor(Color.backgroundPrimary);
  changeNavigationBarColor(Color.backgroundPrimary);

  return (
    <ApiProvider api={new ValorantApi()}>
      <ValorantClientProvider client={new ValorantClient()}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Splash'}>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={RsoScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Main"
              component={Main}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </ValorantClientProvider>
    </ApiProvider>
  );
}
