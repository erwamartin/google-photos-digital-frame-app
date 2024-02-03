import { StyleSheet } from 'react-native';
import { styleHelpers, colors, fonts } from '../../../../styles';

export default StyleSheet.create({
  container: {
    marginBottom: styleHelpers.scale(25, 0.2),
  },

  albumName: {
    fontFamily: fonts.latoBold.family,
    fontSize: styleHelpers.fontSize(16),
    fontWeight: '500',
    color: colors.cursedBlack,
  },
  albumPhotoCount: {
    fontFamily: fonts.lato.family,
    fontSize: styleHelpers.fontSize(14),
    color: colors.heatherGrey,
  },

  imageContainer: {
    marginBottom: styleHelpers.scale(20, 0.2),
  },

  image: {
    borderRadius: styleHelpers.scale(16),
  },

  selectedImageOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: colors.white,
    opacity: 0.9,
    borderRadius: styleHelpers.scale(16),
  }
});