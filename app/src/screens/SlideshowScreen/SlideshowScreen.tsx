import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StatusBar, Text, TouchableWithoutFeedback, View, useWindowDimensions } from 'react-native';

import screenNames from '../../screens/names';

import MemoryStorage from '../../services/memory-storage';
import GooglePhotos from '../../services/google-photos';

type PropsType = {
  navigation: any
}

function SlideshowScreen({ navigation }: PropsType) {
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  async function getPhotos() {
    setIsLoadingPhotos(true);
    const albums = await MemoryStorage.get('selectedAlbums') || [];
    const photos = await GooglePhotos.getAlbumPhotosByIds(albums);
    setPhotos(photos as any || []);
    setIsLoadingPhotos(false);
  }

  function navigateToDashboard() {
    navigation.navigate(screenNames.DashboardScreen as never);
  }

  useEffect(() => {
    getPhotos();
  }, []);

  // Slideshow timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentPhotoIndex === photos.length - 1) {
        setCurrentPhotoIndex(0);
      } else {
        setCurrentPhotoIndex(currentPhotoIndex + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPhotoIndex, photos]);

  // Image details
  const { width, height } = useWindowDimensions();
  const imageWidth = width;
  const imageHeight = height;
  const imageUrl = photos[currentPhotoIndex] ? (photos[currentPhotoIndex] as any).baseUrl + '=w' + (imageWidth * 4) + '-h' + (imageHeight * 4) : null;

  return (
    <>
      <StatusBar hidden />
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isLoadingPhotos && (
          <ActivityIndicator />
        )}

        {!isLoadingPhotos && photos.length === 0 && (
          <View>
            <Text>No photos found.</Text>
          </View>
        )}

        {!isLoadingPhotos && imageUrl && (
          <TouchableWithoutFeedback 
            onPress={navigateToDashboard}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              style={{
                width: imageWidth,
                height: imageHeight,
              }}
              source={{ uri: imageUrl }}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
    </>
  );
};

export default SlideshowScreen;