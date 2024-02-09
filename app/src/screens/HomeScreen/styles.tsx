import { StyleSheet } from 'react-native';
import { styleHelpers, styles, colors, fonts } from '@styles';

export default StyleSheet.create({
  container: styleHelpers.merge(styles.container, {}),

  title: {
    alignSelf: 'flex-start',
    lineHeight: styleHelpers.fontSize(45),
    fontFamily: fonts.interMedium.family,
    fontSize: styleHelpers.fontSize(32),
    color: colors.subNautical,
  },
  titleHighlightedContainer: {
    alignSelf: 'flex-start',
    paddingLeft: styleHelpers.scale(10),
    paddingRight: styleHelpers.scale(10),
    marginTop: styleHelpers.scale(5),
    backgroundColor: colors.waikiki,
    borderRadius: styleHelpers.scale(5),
  },
  titleHighlighted: {
    lineHeight: styleHelpers.fontSize(45),
    fontFamily: fonts.interMedium.family,
    fontSize: styleHelpers.fontSize(32),
    color: colors.white,
  },

  subtitle: {
    alignSelf: 'flex-start',
    marginTop: styleHelpers.scale(28),
    fontFamily: fonts.inter.family,
    fontSize: styleHelpers.fontSize(14),
    color: colors.tempest,
  },

  googleLoginButton: {
    alignItems: 'center',
    width: styleHelpers.scale(400),
    marginTop: styleHelpers.scale(30, 0.2),
  },
  googleLoginButtonImage: {
    width: styleHelpers.scale(260, 0.3),
    height: styleHelpers.scale(50, 0.3),
  },
});