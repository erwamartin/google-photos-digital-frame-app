import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scale as libScale, moderateScale as libModerateScale } from 'react-native-size-matters';

function merge(style1 : any, style2 : any) : ViewStyle {
  return StyleSheet.compose(style1, style2) as ViewStyle;
}

function scale(fontSize: number, factor: number = 1) {
  return factor ? libModerateScale(fontSize, factor) : libScale(fontSize);
}

function fontSize(fontSize: number, factor: number = 0.4) {
  return libModerateScale(fontSize, factor);
}

export {
  fontSize,
  scale,
  merge,
}