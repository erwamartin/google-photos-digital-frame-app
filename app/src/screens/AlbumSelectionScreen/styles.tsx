import { StyleSheet } from 'react-native';
import { styleHelpers, styles, colors, fonts } from '../../styles';

export default StyleSheet.create({
  container: styleHelpers.merge(styles.container, {
    justifyContent: 'flex-start',
    paddingLeft: styleHelpers.scale(10),
    paddingRight: styleHelpers.scale(10),
  }),

  headerContainer: {
    paddingTop: styleHelpers.scale(14),
    paddingBottom: styleHelpers.scale(14),
  },

  title: {
    fontFamily: fonts.interMedium.family,
    fontSize: styleHelpers.fontSize(16),
    color: colors.black,
  },
});