import { StyleSheet } from 'react-native';
import { styleHelpers, colors, fonts } from '../../../../styles';

export default StyleSheet.create({
  container: {
    paddingBottom: styleHelpers.scale(25),
    paddingLeft: styleHelpers.scale(10),
    paddingRight: styleHelpers.scale(10),
  },

  albumName: {
    fontFamily: fonts.latoBold.family,
    fontSize: styleHelpers.fontSize(14),
    color: colors.cursedBlack,
  }
});