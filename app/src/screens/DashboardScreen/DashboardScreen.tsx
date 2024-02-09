import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Pressable, Text, View, useWindowDimensions } from 'react-native';
// @ts-ignore (BlastedImage is not typed yet)
import BlastedImage from 'react-native-blasted-image';

import screenNames from '@screens/names';

import MemoryStorage from '@services/memory-storage';
import GooglePhotos from '@services/google-photos';

type PropsType = {
  navigation: any,
  route: any
}

function DashboardScreen({ route, navigation }: PropsType) {
  const [isLoadingSelectedAlbum, setIsLoadingSelectedAlbums] = useState(false);
  const [selectedAlbumPreviewImages, setSelectedAlbumPreviewImages] = useState([] as any[]);

  const { width: screenWidth } = useWindowDimensions();

  const previewImageWidth = screenWidth * 0.3 > 500 ? 500 : screenWidth * 0.3;
  
  function navigateToAlbumSelection() {
    navigation.navigate(screenNames.AlbumSelectionScreen as never);
  }

  function navigateToOnboarding() {
    navigation.navigate(screenNames.OnboardingScreen as never);
  }

  async function getSelectedAlbums() {
    setIsLoadingSelectedAlbums(true);

    const selectedAlbums = await MemoryStorage.get('selectedAlbums') as string[];
    if (!selectedAlbums || selectedAlbums.length === 0) {
      setIsLoadingSelectedAlbums(false);
      navigateToOnboarding();
      return;
    }

    const albums = await GooglePhotos.getAlbums(selectedAlbums);

    const photos = [];
    for (const album of albums) {
      if (!album.id) {
        continue;
      }
      const albumPhotos = await GooglePhotos.getAlbumPhotos(album.id, 13);
      photos.push(...albumPhotos);
    }
    
    setSelectedAlbumPreviewImages(photos.map((photo: any) => photo.baseUrl + '=w' + previewImageWidth * 4 + '-h' + previewImageWidth * 4));

    console.log('Selected albums: ', selectedAlbumPreviewImages);

    setIsLoadingSelectedAlbums(false);
  }

  function playSlideshow() {
    navigation.navigate(screenNames.SlideshowScreen as never);
  }

  useEffect(() => {
    getSelectedAlbums();
  }, []);

  const { selectedAlbumId } = (route.params || {});
  useEffect(() => {
    if (selectedAlbumId) {
      getSelectedAlbums();
    }
  }, [selectedAlbumId]);

  // Preview image computations
  function computeImageSize(index: number) {
    // Example: 5 images
    // 80% 90% 100% 90% 80%
    const middleIndex = Math.floor(selectedAlbumPreviewImages.length / 2);
    const offset = Math.abs(index - middleIndex);
    const width = previewImageWidth * (1 - (offset * 0.1));
    return width;
  }

  function computeImageLeftPosition(index: number) {
    // The images are centered in the middle of the screen
    // There is an overlap of 20% between each image
    // The middle image is centered horizontally
    // The images before the middle image are on the left of the middle image
    // The images after the middle image are on the right of the middle image

    // Example: the middle image position is Dimensions.get('window').width / 2 - computeImageSize() / 2

    const middleIndex = Math.floor(selectedAlbumPreviewImages.length / 2);
    const offset = index - middleIndex;
    const leftPosition = screenWidth / 2 - computeImageSize(index) / 2 + (offset * (previewImageWidth * 0.3));
    return leftPosition;
  }

  function computeImageTopPosition(index: number) {
    // Based on the image size all images should be centered vertically
    const imageSize = computeImageSize(index);
    const topPosition = (previewImageWidth * 1.2 / 2) - (imageSize / 2);
    return topPosition;
    return 0;
  }

  function computeImageZIndex(index: number) {
    // The middle image is on top of the other images
    // The images on the side are behind the middle image
    // The images on the side are behind the images on the other side
    const middleIndex = Math.floor(selectedAlbumPreviewImages.length / 2);
    const offset = Math.abs(index - middleIndex);
    const zIndex = selectedAlbumPreviewImages.length - offset;
    return zIndex;
  }

  if (isLoadingSelectedAlbum) {
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
        justifyContent: 'center',
      }}
    >

      <View>
        {selectedAlbumPreviewImages.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              width: screenWidth,
              height: previewImageWidth * 1.1,
            }}
          >
            {selectedAlbumPreviewImages.map((imageUrl, index) => (
              <BlastedImage
                key={index}
                source={{ uri: imageUrl }}
                style={{
                  position: 'absolute',
                  width: computeImageSize(index),
                  height: computeImageSize(index),
                  top: computeImageTopPosition(index),
                  left: computeImageLeftPosition(index),
                  zIndex: computeImageZIndex(index),
                }}
              />
            ))}
          </View>
        )}
      </View>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginTop: 0,
        }}
      >
        {/* <Text
          style={{
            position: 'absolute',
            top: -40,
            zIndex: 2,
            padding: 10,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#00000',
            backgroundColor: '#ffffff',
            opacity: 0.4,

            
          }}
        >
          {(selectedAlbum as any).title}
        </Text> */}

        <Pressable 
          onPress={playSlideshow}
          style={{
            marginTop: 40,
            padding: 20,
            borderRadius: 10,
            backgroundColor: '#eeeeee',
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: '#333333',
            }}
          >
            Start Slideshow
          </Text>
        </Pressable>
      </View>

      <Button title='Change Album' onPress={navigateToAlbumSelection} />
    </View>
  );
};

export default DashboardScreen;