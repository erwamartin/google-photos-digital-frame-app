import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import GooglePhotos from "../../services/google-photos";


function AlbumSelectionScreen() {
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

  useEffect(() => {
    getGooglePhotosAlbums(true);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          paddingTop: 20,
          paddingBottom: 20
        }}
        >
        Album Selection Screen
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
                  
                }}
                style={{
                  width: '100%',
                  padding: 20,
                  borderTopWidth: 1,
                  borderTopColor: '#dddddd'
                }}
              >
                <Text>{item.title}</Text>
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