import React, { useState } from 'react';
import { Alert, Dimensions, Image, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import GoogleSignin, { GoogleSigninButton } from '../../services/google-login';

type PropsType = {
  navigation: any
}

function HomeScreen({ navigation }: PropsType) {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  function onSuccess(userInfo: any) {
    console.log('User Info: ', userInfo);
    setIsSigninInProgress(false);
  }

  function onError(error: any) {
    console.log('Error: ', error);
    setIsSigninInProgress(false);
    Alert.alert('Error', error.message);
  }

  function signIn() {
    setIsSigninInProgress(true);
    GoogleSignin.signIn()
      .then(onSuccess)
      .catch(onError);
  }

  const photoIconImageWidth = Dimensions.get('window').width * 0.6;
  const googleLoginImageWidth = Dimensions.get('window').width * 0.6;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 100,
      }}
    >
      <Image 
        source={require('../../../assets/home/phone-icon.png')}
        resizeMode="contain"
        style={{
          width: photoIconImageWidth,
        }}
      />

      <Text
        style={{
          fontSize: 50,
          fontWeight: 'bold',
        }}
      >
        Welcome to
      </Text>

      <Text
        style={{
          fontSize: 50,
          fontWeight: 'bold',
        }}
      >
       Photo Frame
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
        Sign in with Google so you can view your photos as a slideshow.
      </Text>

      <TouchableOpacity
        onPress={signIn}
        disabled={isSigninInProgress}
        style={{
          flex: 1,
          alignItems: 'center',
          width: 400,
        }}
      >
        <Image
          source={require('../../../assets/home/google-button.png')}
          resizeMode="contain"
          style={{
            width: googleLoginImageWidth > 300 ? 300 : googleLoginImageWidth,
            marginBottom: 20,
          }}
        />
      </TouchableOpacity>
		</View>
  );
};

export default HomeScreen;