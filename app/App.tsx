import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createNavigationContainerRef } from '@react-navigation/native';

import GoogleSignin from './src/services/google-login';
import GooglePhotos from './src/services/google-photos';

import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import DashboardScreen from './src/screens/DashboardScreen/DashboardScreen';
import AlbumSelectionScreen from './src/screens/AlbumSelectionScreen';
import SlideshowScreen from './src/screens/SlideshowScreen';

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

const App = () => {
  async function initLogin() {
    GoogleSignin.onLogin(async () => {
      const { accessToken } = await GoogleSignin.getTokens();
      await GooglePhotos.init(accessToken);

      navigationRef.navigate('Dashboard' as never);
    });

    await GoogleSignin.init([
      'https://www.googleapis.com/auth/photoslibrary.readonly',
    ]);

    // const isSignedIn = await GoogleSignin.isSignedIn();
    // if (isSignedIn) {
    //   console.log('User is already signed in.');

    //   navigationRef.navigate('Dashboard' as never);
    // } else {
    //   console.log('User is not signed in.');
    // }
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

/*
import React, { useState } from 'react';
import { View } from 'react-native';
import config from "react-native-config";

import { 
  GoogleSignin, 
  GoogleSigninButton
} from '@react-native-google-signin/google-signin';

const Photos = require('googlephotos-api');

GoogleSignin.configure({
	iosClientId: config.GOOGLE_IOS_CLIENT_ID,
	scopes: ['profile', 'email', Photos.Scopes.READ_ONLY],
});

const GoogleLogin = async () => {
	try {
		await GoogleSignin.hasPlayServices();
		const userInfo = await GoogleSignin.signIn();
		return userInfo;
	} catch (error) {
		console.error('Error in GoogleLogin: ', error);
		throw error;
	}
};

export default function App() {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleGoogleLogin = async () => {
		setLoading(true);
		try {
			const response = await GoogleLogin();
			const { idToken, user } = response;

			console.log(Object.keys(response));
			console.log(user);
			console.log(idToken);

			const tokens = await GoogleSignin.getTokens();
			console.log(tokens);
			const accessToken = tokens.accessToken;

			if (accessToken) {
				console.log('Starting photos');
				const photos = new Photos(accessToken);
				console.log('photos: ', photos);
				const albums = await photos.albums.list();
				console.log('photos: ', albums);
			}
		} catch (apiError: any) {
			console.error(apiError);
			setError(
				apiError?.response?.data?.error?.message || 'Something went wrong'
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View>
			<GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleLogin}
        // disabled={this.state.isSigninInProgress}
      />
		</View>
	);
}

*/

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
