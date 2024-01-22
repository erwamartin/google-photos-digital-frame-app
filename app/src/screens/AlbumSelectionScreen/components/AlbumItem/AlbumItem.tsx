import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import BlastedImage from 'react-native-blasted-image';
import GooglePhotos from '../../../../services/google-photos';

import { styleHelpers } from '../../../../styles';

import styles from './styles';

type AlbumItemPropsType = {
  item: any,
  index: number,
  saveSelectedAlbum: (id: string) => void,
  numColumns: number,
}

function AlbumItem({ item, index, saveSelectedAlbum, numColumns }: AlbumItemPropsType) {
  const { width: screenWidth } = useWindowDimensions();
  const paddingWidth = styleHelpers.scale(10, 0.2);
  const columnWidth = (screenWidth / numColumns) - (paddingWidth * (2 + (numColumns - 1)));

  return (
    <TouchableOpacity
      onPress={() => {
        saveSelectedAlbum(item.id);
      }}
      style={styles.container}
    >
      <View
        style={{
          width: columnWidth,
          marginLeft: paddingWidth,
          marginRight: paddingWidth,
        }}
      >
        <BlastedImage
          source={{ uri: GooglePhotos.getPhotoUrl(item.coverPhotoBaseUrl, columnWidth, columnWidth) }}
          style={styleHelpers.merge(styles.image, {
            width: columnWidth,
            height: columnWidth,
          })}
        />
        <Text
          style={styles.albumName}
        >
          {item.title}
        </Text>
        <Text
          style={styles.albumPhotoCount}
        >
          {`${item.mediaItemsCount} photo${item.mediaItemsCount > 1 ? 's' : ''}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default AlbumItem;