import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "@ui-kitten/components";
import { Camera, Image as ImageIcon, Plus } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { AppTheme } from "../theme/ThemeContext";

interface MediaPickerButtonsProps {
  onCameraPress: () => void;
  onGalleryPress: () => void;
  iconSize?: number;
  plusBadgeSize?: number;
  fontSize?: number;
  containerStyle?: ViewStyle;
}

const MediaPickerButtons: React.FC<MediaPickerButtonsProps> = ({
  onCameraPress,
  onGalleryPress,
  iconSize = 32,
  plusBadgeSize = 10,
  fontSize = 14,
  containerStyle,
}) => {
  const theme = useTheme() as AppTheme;
  const { t } = useTranslation();
  const styles = getStyles(theme, iconSize, plusBadgeSize, fontSize);

  return (
    <View style={[styles.pickerButtonGroup, containerStyle]}>
      <TouchableOpacity
        style={styles.actionCard}
        onPress={onCameraPress}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapper}>
          <Camera
            color={theme["color-basic-500"]}
            size={iconSize}
            strokeWidth={1.5}
          />
          <View style={styles.plusBadge}>
            <Plus color="white" size={plusBadgeSize} strokeWidth={3} />
          </View>
        </View>
        <Text style={styles.cardLabel}>{t("camera")}</Text>
      </TouchableOpacity>

      <View style={styles.verticalDivider} />

      <TouchableOpacity
        style={styles.actionCard}
        onPress={onGalleryPress}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapper}>
          <ImageIcon
            color={theme["color-basic-500"]}
            size={iconSize}
            strokeWidth={1.5}
          />
          <View style={styles.plusBadge}>
            <Plus color="white" size={plusBadgeSize} strokeWidth={3} />
          </View>
        </View>
        <Text style={styles.cardLabel}>{t("gallery")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MediaPickerButtons;

const getStyles = (
  theme: AppTheme,
  iconSize: number,
  plusBadgeSize: number,
  fontSize: number,
) =>
  StyleSheet.create({
    pickerButtonGroup: {
      flexDirection: "row",
      backgroundColor: theme["input-background-color"],
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme["color-basic-300"],
      paddingVertical: 10,
      alignItems: "center",
      justifyContent: "space-around",
    },
    actionCard: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 8,
    },
    iconWrapper: {
      position: "relative",
      marginBottom: 8,
    },
    plusBadge: {
      position: "absolute",
      bottom: -2,
      right: -2,
      backgroundColor: theme["color-success-500"],
      width: plusBadgeSize + 6,
      height: plusBadgeSize + 6,
      borderRadius: (plusBadgeSize + 6) / 2,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1.5,
      borderColor: "white",
    },
    cardLabel: {
      fontSize: fontSize,
      fontFamily: theme["font-poppins-medium"],
      color: theme["color-basic-600"],
    },
    verticalDivider: {
      width: 1,
      height: "60%",
      backgroundColor: theme["color-basic-200"],
    },
  });
