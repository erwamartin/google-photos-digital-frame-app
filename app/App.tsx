import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createNavigationContainerRef } from '@react-navigation/native';

import GoogleSignin from './src/services/google-login';
import GooglePhotos from './src/services/google-photos';

import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import OnboardingScreen from './src/screens/OnboardingScreen/OnboardingScreen';
import DashboardScreen from './src/screens/DashboardScreen/DashboardScreen';
import AlbumSelectionScreen from './src/screens/AlbumSelectionScreen';
import SlideshowScreen from './src/screens/SlideshowScreen';

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

const App = () => {
  async function initLogin() {
    GoogleSignin.onLogin(async () => {
      try {
        const { accessToken } = await GoogleSignin.getTokens();
        await GooglePhotos.init(accessToken);

        // navigationRef.navigate('Onboarding' as never);
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
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
          />
          <Stack.Screen 
            name="Dashboard" 
            component={DashboardScreen}
          />
          <Stack.Screen
            name="AlbumSelection"
            component={AlbumSelectionScreen}
          />
          <Stack.Screen
            name="Slideshow"
            component={SlideshowScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;