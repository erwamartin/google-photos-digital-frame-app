import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createNavigationContainerRef } from '@react-navigation/native';

import GoogleSignin from './src/services/google-login';
import GooglePhotos from './src/services/google-photos';

import * as screens from './src/screens';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import OnboardingScreen from './src/screens/OnboardingScreen/OnboardingScreen';
import DashboardScreen from './src/screens/DashboardScreen/DashboardScreen';
import SlideshowScreen from './src/screens/SlideshowScreen';

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

const App = () => {
  async function initLogin() {
    GoogleSignin.onLogin(async () => {
      try {
        const { accessToken } = await GoogleSignin.getTokens();
        await GooglePhotos.init(accessToken);

        navigationRef.navigate(screens.AlbumSelectionScreen.name as never);
      } catch (error) {
        console.log('Error in App.initLogin: ', error);
      }
    });

    await GoogleSignin.init([
      'https://www.googleapis.com/auth/photoslibrary.readonly',
    ]);
  }

  useEffect(() => {
    initLogin();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name={screens.HomeScreen.name}
            component={screens.HomeScreen}
          />
          <Stack.Screen
            name={screens.OnboardingScreen.name}
            component={screens.OnboardingScreen}
          />
          <Stack.Screen 
            name={screens.DashboardScreen.name}
            component={screens.DashboardScreen}
          />
          <Stack.Screen
            name={screens.AlbumSelectionScreen.name}
            component={screens.AlbumSelectionScreen}
          />
          <Stack.Screen
            name={screens.SlideshowScreen.name}
            component={screens.SlideshowScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;