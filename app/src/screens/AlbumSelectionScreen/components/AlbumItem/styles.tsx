import { StyleSheet } from 'react-native';
import { styleHelpers, colors, fonts } from '../../../../styles';

export default StyleSheet.create({
  container: {
    paddingBottom: styleHelpers.scale(25),
  },

  albumName: {
    fontFamily: fonts.latoBold.family,
    fontSize: styleHelpers.fontSize(16),
    color: colors.cursedBlack,
  },
  albumPhotoCount: {
    fontFamily: fonts.lato.family,
    fontSize: styleHelpers.fontSize(14),
    color: colors.heatherGrey,
  },

  image: {
    borderRadius: styleHelpers.scale(16),
    marginBottom: styleHelpers.scale(20, 0.2),
  },
});