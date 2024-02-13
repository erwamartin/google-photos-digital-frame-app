import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import screenNames from '@screens/names';

import GooglePhotos from '@services/google-photos';
import User from '@services/user';

import DashboardHeader from './component/DashboardHeader';
import SlideshowSettings from './component/SlideshowSettings';

import styles from './styles';

type PropsType = {
  navigation: any,
  route: any
}

function DashboardScreen({ route, navigation }: PropsType) {
  const [isLoadingSelectedAlbum, setIsLoadingSelectedAlbums] = useState(false);
  const [selectedAlbums, setSelectedAlbums] = useState([] as any[]);
  
  function navigateToAlbumSelection() {
    navigation.navigate(screenNames.AlbumSelectionScreen as never);
  }

  async function getSelectedAlbums() {
    setIsLoadingSelectedAlbums(true);

    const selectedAlbums = await User.getAlbums();
    if (!selectedAlbums || selectedAlbums.length === 0) {
      setIsLoadingSelectedAlbums(false);
      navigateToAlbumSelection();
      return;
    }

    const albums = await GooglePhotos.getAlbums(selectedAlbums);
    setSelectedAlbums(albums);
    setIsLoadingSelectedAlbums(false);
  }

  function playSlideshow() {
    navigation.navigate(screenNames.SlideshowScreen as never);
  }

  useEffect(() => {
    getSelectedAlbums();
  }, [route.params?.selectedAlbums]);

  useEffect(() => {
    getSelectedAlbums();
  }, []);

  return (
    <View
      style={styles.container}
    >
      <DashboardHeader navigation={navigation} />
      <SlideshowSettings navigation={navigation} />
    </View>
  );
};

export default DashboardScreen;