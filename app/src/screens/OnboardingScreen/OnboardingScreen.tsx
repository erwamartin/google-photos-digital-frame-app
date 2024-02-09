import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Pressable, Text, View } from 'react-native';

import screenNames from '@screens/names';

import MemoryStorage from '@services/memory-storage';

type PropsType = {
  navigation: any,
  route: any
}

function OnboardingScreen({ route, navigation }: PropsType) {
  const [displayOnboarding, setDisplayOnboarding] = useState(false);

  function navigateToDashboard() {
    navigation.navigate(screenNames.DashboardScreen as never);
  }

  function navigateToAlbumSelection() {
    navigation.navigate(screenNames.AlbumSelectionScreen as never);
  }

  async function getSelectedAlbum() {
    const id = await MemoryStorage.get('selectedAlbumId');
    if (id && id !== '') {
      navigateToDashboard();
      return;
    }

    setDisplayOnboarding(true);
  }

  useEffect(() => {
    getSelectedAlbum();
  }, []);

  const topIconImageWidth = Dimensions.get('window').width * 0.4;

  if (!displayOnboarding) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
      }}
    >
      <Image 
        source={require('@assets/onboarding/select-photos-icon.png')}
        resizeMode='contain'
        style={{
          width: topIconImageWidth,
          height: topIconImageWidth,
          marginBottom: 60,
        }}
      />

      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
        }}
      >
        Let's get started!
      </Text>

      <Text
        style={{
          maxWidth: 400,
          marginTop: 20,
          textAlign: 'center',
          fontSize: 20,
          color: '#333333',
        }}
      >
        Select which album you want to display photos from.
      </Text>

      <Pressable 
        onPress={navigateToAlbumSelection}
        style={{
          marginTop: 40,
          padding: 20,
          borderRadius: 10,
          backgroundColor: '#eeeeee',
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: '#333333',
          }}
        >
          Select Album
        </Text>
		  </Pressable>
    </View>
  );
};

export default OnboardingScreen;