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

  albumListContainer: {
    flex: 1,
  },
  listContainer: {
    width: '100%',
  },

  saveButtonContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingTop: styleHelpers.scale(15, 0.2),
    paddingHorizontal: styleHelpers.scale(25),
    paddingBottom: styleHelpers.scale(25, 0.2),
    backgroundColor: colors.white,
  },
  saveButton: {
    width: '100%',
    paddingVertical: styleHelpers.scale(16, 0.2),
    borderRadius: 50,
    backgroundColor: colors.waikiki,
  },
  saveButtonText: {
    width: '100%',
    textAlign: 'center',
    fontSize: styleHelpers.fontSize(16),
    fontWeight: '600',
    color: colors.white,
  },
});