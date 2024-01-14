import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { styleHelpers } from '../../../../styles';

import styles from './styles';

type AlbumItemPropsType = {
  item: any,
  saveSelectedAlbum: (id: string) => void,
  numColumns: number,
}

function AlbumItem({ item, saveSelectedAlbum, numColumns }: AlbumItemPropsType) {
  return (
    <TouchableOpacity
      onPress={() => {
        saveSelectedAlbum(item.id);
      }}
      style={styleHelpers.merge(styles.container, {
        width: 100 / numColumns + '%',
      })}
    >
      <Text
        style={styles.albumName}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
}

export default AlbumItem;