import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 450; // 375 is base width (e.g. iPhone 11)

export const normalizeFont = (size: any) =>
    Math.round(PixelRatio.roundToNearestPixel(size * scale));