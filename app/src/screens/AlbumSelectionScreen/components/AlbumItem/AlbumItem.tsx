import React from 'react';
import { Image, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
// @ts-ignore (BlastedImage is not typed yet)
import BlastedImage from 'react-native-blasted-image';
import GooglePhotos from '../../../../services/google-photos';

import { styleHelpers } from '../../../../styles';

import styles from './styles';

type AlbumItemPropsType = {
  item: any,
  index: number,
  toggleSelectedAlbum: (id: string) => void,
  isSelected: boolean,
  numColumns: number,
}

function AlbumItem({ item, index, isSelected, toggleSelectedAlbum, numColumns }: AlbumItemPropsType) {
  const { width: screenWidth } = useWindowDimensions();
  const paddingWidth = styleHelpers.scale(10, 0.2);
  const columnWidth = (screenWidth / numColumns) - (paddingWidth * (2 + (numColumns - 1)));

  return (
    <TouchableOpacity
      onPress={() => {
        toggleSelectedAlbum(item.id);
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
        <View
          style={styles.imageContainer}
        >
          <BlastedImage
            source={{ uri: GooglePhotos.getPhotoUrl(item.coverPhotoBaseUrl, columnWidth, columnWidth) }}
            style={styleHelpers.merge(styles.image, {
              width: columnWidth,
              height: columnWidth,
            })}
          />
          {isSelected && (
            <View
              style={styles.selectedImageOverlay}
            >
              <Image
                source={require('../../../../../assets/icons/checkbox-icon.png')}
                resizeMode='contain'
                style={{
                  width: columnWidth / 3,
                  height: columnWidth / 3,
                }}
              />
            </View>
          )}
        </View>
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