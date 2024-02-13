import { StyleSheet } from 'react-native';
import * as styleHelpers from './helpers';
import colors from './colors';

export default StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    width: '100%',
    paddingLeft: styleHelpers.scale(20),
    paddingRight: styleHelpers.scale(20),
    paddingBottom: styleHelpers.scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.whiteSmoke,
  },
});