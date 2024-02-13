import { StyleSheet } from 'react-native';
import { styleHelpers, styles, colors, fonts } from '@styles';

export default StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: styleHelpers.scale(26),
  },
  titleText: {
    marginBottom: styleHelpers.scale(20),
    fontSize: styleHelpers.fontSize(18),
    fontWeight: 'bold',
    textAlign: 'left',
  },

  // Settings
  timingSettingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: styleHelpers.scale(12),
    paddingVertical: styleHelpers.scale(16),
    backgroundColor: colors.white,
    borderRadius: styleHelpers.scale(18),
  },
  timerIcon: {
    width: styleHelpers.scale(40),
    height: styleHelpers.scale(40),
  },

  settingsTextContainer: {
    flex: 1,
    paddingLeft: styleHelpers.scale(20),
  },
  text: {
    fontSize: styleHelpers.fontSize(12),
    color: colors.tinSoldier,
  },
  timingText: {
    paddingBottom: styleHelpers.scale(6),
    fontSize: styleHelpers.fontSize(14),
    fontWeight: 'bold',
    color: colors.black,
  },

  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timingValueText: {
    fontSize: styleHelpers.fontSize(14),
    fontWeight: 'bold',
    color: colors.black,
  },
  dropDownIcon: {
    width: styleHelpers.scale(24),
    height: styleHelpers.scale(24),
  }
});