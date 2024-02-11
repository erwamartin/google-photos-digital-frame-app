import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import GoogleSignIn from '@services/google-login';
import GooglePhotos from '@services/google-photos';
import User from '@services/user';

import screens from '@screens';
import screenNames from '@screens/names';

import { googleScopes } from '@config/google';

import colors from '@styles/colors';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigationRef = useNavigationContainerRef();
  
  async function initializeLogin() {
    if (!navigationRef.current) {
      return;
    }

    if (isInitialized) {
      return;
    }
    setIsInitialized(true);

    GoogleSignIn.onLogin(async () => {
      try {
        const { accessToken } = await GoogleSignIn.getTokens();
        await GooglePhotos.init(accessToken);

        if (await User.hasSelectedAlbums()) {
          navigationRef.navigate(screenNames.DashboardScreen as never);
          return;
        }

        navigationRef.navigate(screenNames.AlbumSelectionScreen as never);
      } catch (error) {
        console.log('Error in App.initLogin: ', error);
      }
    });

    await GoogleSignIn.init(googleScopes);
  }

  function onNavigationReady() {
    setIsNavigationReady(true);
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
    initializeLogin();
  }, [navigationRef.current, isNavigationReady]);

  return (
    <SafeAreaProvider>
      <NavigationContainer 
        ref={navigationRef} 
        onReady={onNavigationReady}
      >
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