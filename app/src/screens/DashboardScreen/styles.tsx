import { StyleSheet } from 'react-native';
import { styleHelpers, styles, colors, fonts } from '@styles';

export default StyleSheet.create({
  container: styleHelpers.merge(styles.container, {
    justifyContent: 'flex-start',
  }),
});