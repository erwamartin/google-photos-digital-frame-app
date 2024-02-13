import { StyleSheet } from 'react-native';
import { styleHelpers } from '@styles';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: styleHelpers.scale(24),
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  // Text
  text: {
    fontSize: styleHelpers.fontSize(14),
  },
  welcomeText: {},
  nameText: {
    fontWeight: 'bold',
  },

  // Icons
  signoutIcon: {
    width: styleHelpers.scale(24),
    height: styleHelpers.scale(24),
  }
});