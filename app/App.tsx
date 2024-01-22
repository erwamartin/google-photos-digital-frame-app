import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createNavigationContainerRef } from '@react-navigation/native';

import GoogleSignin from './src/services/google-login';
import GooglePhotos from './src/services/google-photos';

import screens from './src/screens';
import screenNames from './src/screens/names';

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

const App = () => {
  async function initLogin() {
    console.log('ERWAN: initLogin');
    GoogleSignin.onLogin(async () => {
      try {
        const { accessToken } = await GoogleSignin.getTokens();
        await GooglePhotos.init(accessToken);

        navigationRef.navigate(screenNames.AlbumSelectionScreen as never);
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
            name={screenNames.HomeScreen}
            component={screens.HomeScreen}
          />
          <Stack.Screen
            name={screenNames.OnboardingScreen}
            component={screens.OnboardingScreen}
          />
          <Stack.Screen 
            name={screenNames.DashboardScreen}
            component={screens.DashboardScreen}
          />
          <Stack.Screen
            name={screenNames.AlbumSelectionScreen}
            component={screens.AlbumSelectionScreen}
          />
          <Stack.Screen
            name={screenNames.SlideshowScreen}
            component={screens.SlideshowScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;