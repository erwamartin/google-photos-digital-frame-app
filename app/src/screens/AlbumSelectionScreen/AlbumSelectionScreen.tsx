import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';

import screenNames from '../../screens/names';

import GooglePhotos from '../../services/google-photos';
import MemoryStorage from '../../services/memory-storage';

import AlbumItem from './components/AlbumItem';

import styles from './styles';

type PropsType = {
  navigation: any
}

function AlbumSelectionScreen({ navigation }: PropsType) {
  const [albums, setAlbums] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  async function getGooglePhotosAlbums(isFirstRequest: boolean = false) {
    if (isFetching) {
      return;
    }

    if (isFirstRequest) {
      setIsFetching(true);
    }
    
    const apiAlbums = await GooglePhotos.getAlbums(20, !isFirstRequest) as any;
    setAlbums(apiAlbums);
    setIsFetching(false);
  }

  async function saveSelectedAlbum(id: string) {
    console.log('Selected album: ', id);
    await MemoryStorage.set('selectedAlbumId', id);
    navigation.navigate(screenNames.DashboardScreen as never, { selectedAlbumId: id });
  }

  console.log(screenNames.DashboardScreen);

  useEffect(() => {
    getGooglePhotosAlbums(true);
  }, []);

  return (
    <View
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Text
          style={styles.title}
          >
          Choose an album
        </Text>
      </View>

      <View>
        {isFetching && (
          <ActivityIndicator />
        )}

        {!isFetching && albums.length === 0 && (
          <Text>No albums found.</Text>
        )}

        {!isFetching && albums.length > 0 && (
          <FlatList
            numColumns={2}
            data={albums}
            renderItem={({ item }: { item: any }) => {
              return (
                <AlbumItem
                  item={item}
                  saveSelectedAlbum={saveSelectedAlbum}
                  numColumns={2}
                />
            )}}
            keyExtractor={(item) => item.id}
            onRefresh={() => {
              getGooglePhotosAlbums(true);
            }}
            refreshing={isFetching}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              getGooglePhotosAlbums();
            }}
            
            style={{
              width: '100%'
            }}
          />
        )}
      </View>
    </View>
  );
};

export default AlbumSelectionScreen;