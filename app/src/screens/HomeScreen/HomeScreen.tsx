import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

import GoogleSignin from '@services/google-login';

import { styleHelpers } from '@styles';
import styles from './styles';

type PropsType = {
  navigation: any
}

function HomeScreen({ navigation }: PropsType) {
  const [isSignInProgress, setIsSignInProgress] = useState(false);

  function onSuccess(userInfo: any) {
    setIsSignInProgress(false);
  }

  function onError(error: any) {
    console.error('Error while signing in: ', error);
    setIsSignInProgress(false);
    Alert.alert('Error', error.message);
  }

  function signIn() {
    setIsSignInProgress(true);
    GoogleSignin.signIn()
      .then(onSuccess)
      .catch(onError);
  }

  const { width: deviceWidth } = useWindowDimensions();

  let photoIconImageWidth = deviceWidth - styleHelpers.scale(40);
  photoIconImageWidth = photoIconImageWidth > 500 ? 500 : photoIconImageWidth;
  const photoIconImageHeight = photoIconImageWidth * (1324 / 1267);

  return (
    <View
      style={styles.container}
    >
      <Image 
        source={require('@assets/home/top-image.png')}
        resizeMode='contain'
        style={{
          width: photoIconImageWidth,
          height: photoIconImageHeight,
          marginBottom: styleHelpers.scale(30, 0.2),
        }}
      />

      <Text
        style={styles.title}
      >
        Digital display by 
      </Text>

      {deviceWidth < 400 ?
        (
          <>
            <View style={styles.titleHighlightedContainer}>
              <Text
                style={styles.titleHighlighted}
              >
                using Google
              </Text>
            </View>
            <View style={styles.titleHighlightedContainer}>
              <Text
                style={styles.titleHighlighted}
              >
                Photos
              </Text>
            </View>
          </>
        ) :
        (
          <View style={styles.titleHighlightedContainer}>
            <Text
              style={styles.titleHighlighted}
            >
              using Google Photos
            </Text>
          </View>
        )
      }
      
      <Text
        style={styles.subtitle}
      >
        Connect to a Google Photos albums to display pictures.
      </Text>

      <TouchableOpacity
        onPress={signIn}
        disabled={isSignInProgress}
        style={styles.googleLoginButton}
      >
        <Image
          source={require('@assets/home/google-button.png')}
          resizeMode='contain'
          style={styles.googleLoginButtonImage}
        />
      </TouchableOpacity>
		</View>
  );
};

export default HomeScreen;