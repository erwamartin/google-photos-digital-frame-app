import { StyleSheet } from 'react-native';
import { styleHelpers, styles, colors, fonts } from '../../styles';

export default StyleSheet.create({
  container: styleHelpers.merge(styles.container, {
    width: '100%',
    justifyContent: 'flex-start',
    paddingLeft: 0,
    paddingRight: 0,
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

  listContainer: {
    width: '100%',
  }
});