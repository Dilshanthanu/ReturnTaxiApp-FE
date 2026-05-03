/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    primary: "#FFC107",
    primaryDark: "#E0A800",
    primaryLight: "#FFF3CD",
    secondary: "#1F2937",
    secondaryLight: "#374151",
    text: "#111827",
    textSecondary: "#6B7280",
    background: "#F9FAFB",
    surface: "#FFFFFF",
    tint: "#FFC107",
    icon: "#1F2937",
    tabIconDefault: "#9CA3AF",
    tabIconSelected: "#FFC107",
  },
  dark: {
    primary: "#FFD54F",
    primaryDark: "#FBC02D",
    primaryLight: "#5C4A00",
    secondary: "#E5E7EB",
    secondaryLight: "#9CA3AF",
    text: "#F9FAFB",
    textSecondary: "#CBD5E1",
    background: "#0F172A",
    surface: "#1E293B",
    tint: "#FFD54F",
    icon: "#E5E7EB",
    tabIconDefault: "#64748B",
    tabIconSelected: "#FFD54F",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
