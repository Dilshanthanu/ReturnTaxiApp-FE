import { fonts, fontSizes } from "./fonts";

export const getFontTheme = (isSinhala: boolean) => {
  const scale = isSinhala ? -2 : 0;
  return {
    "font-family-primary": fonts.inter.regular,
    "font-family-secondary": fonts.poppins.bold,

    "font-inter-regular": fonts.inter.regular,
    "font-inter-medium": fonts.inter.medium,
    "font-inter-semibold": fonts.inter.semiBold,
    "font-inter-bold": fonts.inter.bold,
    "font-poppins-regular": fonts.poppins.regular,
    "font-poppins-bold": fonts.poppins.bold,
    "font-poppins-semibold": fonts.poppins.semiBold,
    "font-poppins-medium": fonts.poppins.medium,

    "text-header-font-size": fontSizes.xxxl + scale,
    "text-heading-1-font-size": fontSizes.xxl + scale,
    "text-heading-2-font-size": fontSizes.xl + scale,
    "text-heading-3-font-size": fontSizes.lg + scale, //20
    "text-paragraph-1-font-size": fontSizes.md + scale, //16
    "text-paragraph-2-font-size": fontSizes.sm + scale, //14
    "text-caption-1-font-size": fontSizes.xs + scale, //12
    "text-caption-2-font-size": fontSizes.xxs + scale, //10
    "text-overline-font-size": fontSizes.tiny + scale, //8
  };
};

export const fontTheme = getFontTheme(false);
