/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const primaryGreen = '#2e7d32';
const lightGreen = '#66bb6a';
const cream = '#f1f5e9';

export const Colors = {
  light: {
    text: '#0b1f1a',
    textSecondary: '#4b6b5a',
    background: '#f1f5e9',
    tint: primaryGreen,
    icon: '#4b6b5a',
    tabIconDefault: '#4b6b5a',
    tabIconSelected: primaryGreen,
    card: '#e6f0e9',
    border: '#c8d5c0',
    buttonPrimary: primaryGreen,
    buttonSecondary: '#6b8f71',
    buttonText: '#f1f5e9',
  },
  dark: {
    text: cream,
    textSecondary: '#c8d5c0',
    background: '#0b1f1a',
    tint: lightGreen,
    icon: '#9fb7aa',
    tabIconDefault: '#9fb7aa',
    tabIconSelected: lightGreen,
    card: '#132f2a',
    border: '#1f3d36',
    buttonPrimary: '#2e7d32',
    buttonSecondary: '#355e4b',
    buttonText: '#f1f5e9',
  },
};


export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
