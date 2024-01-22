import { StyleSheet } from 'react-native';
import * as styleHelpers from './helpers';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingLeft: styleHelpers.scale(20),
    paddingRight: styleHelpers.scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});