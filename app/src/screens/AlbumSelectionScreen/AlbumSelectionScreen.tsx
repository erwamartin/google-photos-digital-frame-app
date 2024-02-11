import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

import screenNames from '@screens/names';

import GooglePhotos from '@services/google-photos';

import AlbumItem from './components/AlbumItem';

import { styleHelpers } from '@styles';
import styles from './styles';
import User from 'services/user';

type PropsType = {
  navigation: any
}

function AlbumSelectionScreen({ navigation }: PropsType) {
  const { width: screenWidth } = useWindowDimensions();
  
  const [albums, setAlbums] = useState([] as any[]);
  const [selectedAlbums, setSelectedAlbums] = useState([] as string[]);
  const [isFetching, setIsFetching] = useState(false);

  async function getGooglePhotosAlbums(isFirstRequest: boolean = false) {
    if (isFetching) {
      return;
    }

    if (isFirstRequest) {
      setIsFetching(true);
    }
    
    const apiAlbums = await GooglePhotos.getAllAlbums(20, !isFirstRequest) as any;
    setAlbums(apiAlbums);
    setIsFetching(false);
  }

  function toggleSelectedAlbum(id: string) {
    if (selectedAlbums.includes(id)) {
      setSelectedAlbums(selectedAlbums.filter((albumId) => albumId !== id));
    } else {
      setSelectedAlbums([...selectedAlbums, id]);
    }
  }

  async function saveSelection() {
    await User.setAlbums(selectedAlbums);
    navigation.navigate(screenNames.DashboardScreen as never, { selectedAlbums: selectedAlbums });
  }

  const columnCount = useMemo(() => {
    switch (true) {
      case screenWidth < 300:
        return 1;
      case screenWidth < 600:
        return 2;
      case screenWidth < 900:
        return 3;
      case screenWidth < 1200:
        return 4;
      default:
        return 5;
    }
  }, [screenWidth]);

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

      <View
        style={styles.albumListContainer}
      >
        {isFetching && (
          <ActivityIndicator />
        )}

        {!isFetching && albums.length === 0 && (
          <Text>No albums found.</Text>
        )}

        {!isFetching && albums.length > 0 && (
          <FlatList
            key={columnCount}
            numColumns={columnCount}
            data={albums}
            renderItem={({ item, index }: { item: any, index: number }) => {
              return (
                <AlbumItem
                  item={item}
                  index={index}
                  toggleSelectedAlbum={toggleSelectedAlbum}
                  isSelected={selectedAlbums.includes(item.id)}
                  numColumns={columnCount}
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
            
            style={styles.listContainer}
          />
        )}
      </View>

      <View
        style={styles.saveButtonContainer}
      >
        <TouchableOpacity
          onPress={saveSelection}
          style={styleHelpers.merge(styles.saveButton, {
            opacity: selectedAlbums.length === 0 ? 0.5 : 1,
          })}
          disabled={selectedAlbums.length === 0}
        >
          <Text
            style={styles.saveButtonText}
          >
            Confirm selection
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AlbumSelectionScreen;