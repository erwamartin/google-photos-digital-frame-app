import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import GoogleSignin, { GoogleSigninButton } from '../../services/google-login';

type PropsType = {
  navigation: any
}

function HomeScreen({ navigation }: PropsType) {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  function onSuccess(userInfo: any) {
    console.log('User Info: ', userInfo);
    setIsSigninInProgress(false);
    navigateToDashbaord();
  }

  function onError(error: any) {
    console.log('Error: ', error);
    setIsSigninInProgress(false);
    Alert.alert('Error', error.message);
  }

  function navigateToDashbaord() {
    navigation.navigate('Dashboard');
  }

  function signIn() {
    setIsSigninInProgress(true);
    GoogleSignin.signIn()
      .then(onSuccess)
      .catch(onError);
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Photo Frame
      </Text>

      <Text
        style={{
          fontSize: 16,
          marginVertical: 20,
        }}
      >
        Sign in with Google to access your photos.
      </Text>

			<GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={isSigninInProgress}
      />
		</View>
  );
};

export default HomeScreen;