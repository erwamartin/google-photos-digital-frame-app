import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Dimensions, Image, Pressable, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import BlastedImage from 'react-native-blasted-image';

import MemoryStorage from '../../services/memory-storage';
import GooglePhotos from '../../services/google-photos';

type PropsType = {
  navigation: any,
  route: any
}

function DashboardScreen({ route, navigation }: PropsType) {
  const [isLoadingSelectedAlbum, setIsLoadingSelectedAlbum] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedAlbumPreviewImages, setSelectedAlbumPreviewImages] = useState([] as any[]);

  const previewImageWidth = Dimensions.get('window').width * 0.3 > 500 ? 500 : Dimensions.get('window').width * 0.3;
  
  function navigateToAlbumSelection() {
    navigation.navigate('AlbumSelection' as never);
  }

  function navigateToOnboarding() {
    navigation.navigate('Onboarding' as never);
  }

  async function getSelectedAlbum() {
    setIsLoadingSelectedAlbum(true);
    setSelectedAlbum(null);

    const id = await MemoryStorage.get('selectedAlbumId');
    if (!id || id === '') {
      setIsLoadingSelectedAlbum(false);
      navigateToOnboarding();
      return;
    }

    const album = await GooglePhotos.getAlbum(id);
    console.log('Selected album: ', album);
    setSelectedAlbum(album as any || null);
    
    const photos = await GooglePhotos.getAlbumPhotos(id, 13);
    setSelectedAlbumPreviewImages(photos.map((photo: any) => photo.baseUrl + '=w' + previewImageWidth * 4 + '-h' + previewImageWidth * 4));

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
    const leftPosition = Dimensions.get('window').width / 2 - computeImageSize(index) / 2 + (offset * (previewImageWidth * 0.3));
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
        // alignItems: 'center',
        justifyContent: 'center',
      }}
    >

      <View>
        {selectedAlbumPreviewImages.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
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