import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';

import * as screens from '../../screens';

import GooglePhotos from '../../services/google-photos';
import MemoryStorage from '../../services/memory-storage';

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
    navigation.navigate(screens.DashboardScreen.name as never, { selectedAlbumId: id });
  }

  useEffect(() => {
    getGooglePhotosAlbums(true);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          paddingTop: 20,
          paddingBottom: 20
        }}
        >
        Select an album
      </Text>

      {isFetching && (
        <ActivityIndicator />
      )}

      {!isFetching && albums.length === 0 && (
        <Text>No albums found.</Text>
      )}

      {!isFetching && albums.length > 0 && (
        <FlatList
          data={albums}
          renderItem={({ item }: { item: any }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  saveSelectedAlbum(item.id);
                }}
                style={{
                  width: '100%',
                  padding: 20,
                  borderTopWidth: 1,
                  borderTopColor: '#dddddd'
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
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
  );
};

export default AlbumSelectionScreen;

export const name = 'AlbumSelectionScreen';