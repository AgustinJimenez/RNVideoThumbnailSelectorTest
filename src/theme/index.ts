import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export const scale = (number = 1) => (number / 10) * width;

const rgba = (r: number, g: number, b: number, o: number = 1) =>
  `rgba(${r},${g},${b},${o})`;

export const palette = {
  black: (o?: number) => rgba(0, 0, 0, o),
  white: (o?: number) => rgba(255, 255, 255, o),
};

export const genericStyles = StyleSheet.create({
  bgBlack: {backgroundColor: palette.black()},
});
