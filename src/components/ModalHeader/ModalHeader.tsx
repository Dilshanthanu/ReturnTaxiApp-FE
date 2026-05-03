import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { AppTheme, useThemeSettings } from "@/src/theme/ThemeContext";
import { ModalHeaderProps } from "@/src/types/common/components";
import { modalHeaderStyles } from "./styles/ModalHeader.styles";

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  subTitle,
  handleClosePress,
  handleClearPress,
  leftLabel,
  rightLabel,
  headerStyle,
  buttonTextStyle,
  titleStyle,
}) => {
  const { t } = useTranslation();
  const theme = useTheme() as AppTheme;
  const { themeName } = useThemeSettings();
  const styles = modalHeaderStyles(theme, themeName);

  return (
    <View style={[styles.header, headerStyle]}>
      <View style={styles.leftBtnContainer}>
        {handleClosePress && (
          <Pressable
            onPress={handleClosePress}
            style={styles.sideButton}
            hitSlop={40}
          >
            <Text
              style={[styles.cancelText, buttonTextStyle]}
              allowFontScaling={false}
            >
              {leftLabel || t("close")}
            </Text>
          </Pressable>
        )}
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.headerText, titleStyle]} allowFontScaling={false}>
          {title}
        </Text>
        {subTitle && (
          <Text style={[styles.subHeader, titleStyle]} allowFontScaling={false}>
            {subTitle}
          </Text>
        )}
      </View>

      <View style={styles.rightBtnContainer}>
        {handleClearPress && (
          <Pressable
            style={styles.sideButton}
            onPress={handleClearPress}
            hitSlop={25}
          >
            <Text
              style={[styles.clearText, buttonTextStyle]}
              allowFontScaling={false}
            >
              {rightLabel || t("save")}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default ModalHeader;
