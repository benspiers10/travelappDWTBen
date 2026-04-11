import { Platform } from 'react-native';

const primaryGreen = '#2e7d32';
const lightGreen = '#66bb6a';
const cream = '#f1f5e9';

export const Colors = {
  light: {
    text: '#163126',
    textSecondary: '#4f6b5d',
    background: '#e8f2ea',
    tint: primaryGreen,
    icon: '#4f6b5d',
    tabIconDefault: '#4f6b5d',
    tabIconSelected: primaryGreen,
    card: '#f4f8f1',
    border: '#bfd1c2',
    buttonPrimary: primaryGreen,
    buttonSecondary: '#6f8f77',
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
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
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