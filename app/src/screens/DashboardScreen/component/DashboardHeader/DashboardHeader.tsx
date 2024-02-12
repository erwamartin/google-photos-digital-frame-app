import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import screenNames from '@screens/names';

import User from '@services/user';

import styles from './styles';
import { styleHelpers } from 'styles';

type PropsType = {
  navigation: any,
}

function DashboardHeader({ navigation }: PropsType) {
  const [firstName, setFirstName] = useState<string | null>(null);

  function signOut() {
    User.signOut();
    navigation.navigate(screenNames.HomeScreen as never);
  }

  async function getUserName() {
    const userInfo = await User.getUser();
    setFirstName(userInfo?.user.givenName || null);
  }

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <View
      style={styles.container}
    >
      <View
        style={styles.leftContainer}
      >
        <Text style={styleHelpers.merge(styles.text, styles.welcomeText)}>Welcome home,</Text>
        <Text style={styleHelpers.merge(styles.text, styles.nameText)}>{firstName}</Text>
      </View>
      <View
        style={styles.rightContainer}
      >
        <Pressable
          onPress={signOut}
        >
          <Image
            source={require('@assets/icons/signout-icon.png')}
            resizeMode='contain'
            style={styles.signoutIcon}
          />
        </Pressable>
      </View>
      
    </View>
  );
};

export default DashboardHeader;