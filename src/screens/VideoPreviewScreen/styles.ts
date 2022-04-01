import {StyleSheet} from 'react-native';
import {palette, scale} from '../../theme';

const sliderContainerHeight = scale(1.6);

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    height: '100%',
  },
  sliderContainer: {
    height: sliderContainerHeight,
    position: 'absolute',
    bottom: scale(2),
    right: scale(0.4),
    left: scale(0.4),
    borderRadius: scale(0.2),
  },
  thumbContainer: {
    height: sliderContainerHeight * 1.2,
    padding: scale(0.1),
    width: scale(1.4),
    borderColor: palette.white(),
    borderWidth: scale(0.04),
    borderRadius: scale(0.3),
    backgroundColor: palette.black(),
    shadowColor: palette.black(),
    shadowOffset: {width: -scale(0.1), height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  thumbVideo: {
    borderRadius: scale(0.2),
  },
  trackStyle: {
    backgroundColor: 'transparent',
  },
  trackContainer: {
    flexDirection: 'row',
    width: scale(9.2),
    overflow: 'hidden',
    borderRadius: scale(0.2),
  },
  previewItmBg: {
    height: sliderContainerHeight,
    flex: 1,
  },
});

export default styles;
