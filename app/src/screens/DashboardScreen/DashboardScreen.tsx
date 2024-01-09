import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';

import MemoryStorage from '../../services/memory-storage';
import GooglePhotos from '../../services/google-photos';

type PropsType = {
  navigation: any,
  route: any
}

function DashboardScreen({ route, navigation }: PropsType) {
  const [isLoadingSelectedAlbum, setIsLoadingSelectedAlbum] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  function navigateToAlbumSelection() {
    navigation.navigate('AlbumSelection' as never);
  }

  async function getSelectedAlbum() {
    setIsLoadingSelectedAlbum(true);
    setSelectedAlbum(null);

    const id = await MemoryStorage.get('selectedAlbumId');
    if (!id || id === '') {
      setIsLoadingSelectedAlbum(false);
      return;
    }

    const album = await GooglePhotos.getAlbum(id);
    console.log('Selected album: ', album);
    setSelectedAlbum(album as any || null);
    setIsLoadingSelectedAlbum(false);
  }

  function playSlideshow() {
    navigation.navigate('Slideshow' as never);
  }

  useEffect(() => {
    getSelectedAlbum();
  }, []);

  const { selectedAlbumId } = (route.params || {});
  useEffect(() => {
    if (selectedAlbumId) {
      getSelectedAlbum();
    }
  }, [selectedAlbumId]);

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
          fontSize: 50,
          fontWeight: 'bold',
          marginBottom: 20
        }}
        >
        Welcome to Photo Frame
      </Text>

      {isLoadingSelectedAlbum && (
        <ActivityIndicator />
      )}

      {!isLoadingSelectedAlbum && selectedAlbum === null && (
        <>
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Please select an album to display photos from.
          </Text>
          <Button title='Select Album' onPress={navigateToAlbumSelection} />
        </>
      )}

      {!isLoadingSelectedAlbum && selectedAlbum !== null && (
        <>
          <Text
            style={{
              fontSize: 16,
              marginVertical: 20,
            }}
          >
            Selected Album: {(selectedAlbum as any).title}
          </Text>
          <Button title='Change Album' onPress={navigateToAlbumSelection} />
        </>
      )}

      {!isLoadingSelectedAlbum && selectedAlbum !== null && (
        <Button title='Play Slideshow' onPress={playSlideshow} />
      )}
    </View>
  );
};

export default DashboardScreen;