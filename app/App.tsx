import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createNavigationContainerRef } from '@react-navigation/native';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import GoogleSignIn from './src/services/google-login';
import GooglePhotos from './src/services/google-photos';

import screens from './src/screens';
import screenNames from './src/screens/names';
import { View } from 'react-native';
import colors from './src/styles/colors';

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

const App = () => {
  async function initLogin() {
    console.log('initLogin');
    GoogleSignIn.onLogin(async () => {
      try {
        const { accessToken } = await GoogleSignIn.getTokens();
        await GooglePhotos.init(accessToken);

        navigationRef.navigate(screenNames.AlbumSelectionScreen as never);
      } catch (error) {
        console.log('Error in App.initLogin: ', error);
      }
    });

    await GoogleSignIn.init([
      'https://www.googleapis.com/auth/photoslibrary.readonly',
    ]);
  }

  function wrapScreenWithSafeArea(Screen: any, { skipBottomPadding = false } = {}) {
    return ({ navigation, route }: { navigation: any, route: any }) => {
      const insets = useSafeAreaInsets();
      return (
        <View
          style={{
            flex: 1,
            // Paddings to handle safe area
            paddingTop: insets.top,
            paddingBottom: skipBottomPadding ? 0 : insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            backgroundColor: colors.white,
          }}
        >
          <Screen
            navigation={navigation}
            route={route}
          />
        </View>
      );
    };
  }

  useEffect(() => {
    initLogin();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name={screenNames.HomeScreen}
            component={wrapScreenWithSafeArea(screens.HomeScreen)}
          />
          <Stack.Screen
            name={screenNames.OnboardingScreen}
            component={wrapScreenWithSafeArea(screens.OnboardingScreen)}
          />
          <Stack.Screen 
            name={screenNames.DashboardScreen}
            component={wrapScreenWithSafeArea(screens.DashboardScreen)}
          />
          <Stack.Screen
            name={screenNames.AlbumSelectionScreen}
            component={wrapScreenWithSafeArea(screens.AlbumSelectionScreen, { skipBottomPadding: true })}
          />
          <Stack.Screen
            name={screenNames.SlideshowScreen}
            component={screens.SlideshowScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;