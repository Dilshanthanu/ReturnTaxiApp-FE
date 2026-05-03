import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "@ui-kitten/components";
import { ArrowLeft, EllipsisVertical } from "lucide-react-native";
import { AppTheme } from "../theme/ThemeContext";

interface Props {
  title: string;
  onBackPress?: () => void;
  onRightPress?: () => void;
}

const PrimaryHeader: React.FC<Props> = ({
  title,
  onBackPress,
  onRightPress,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      {/* Left Slot */}
      <View style={styles.sideSlot}>
        {onBackPress && (
          <Pressable onPress={onBackPress} style={styles.backButton}>
            <ArrowLeft
              size={22}
              color={theme["color-basic-700"]}
              strokeWidth={2.5}
            />
          </Pressable>
        )}
      </View>

      {/* Center Slot */}
      <View style={styles.centerSlot}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {/* Right Slot */}
      <View style={styles.sideSlot}>
        {onRightPress && (
          <Pressable style={styles.rightButton} onPress={onRightPress}>
            <EllipsisVertical
              size={20}
              color={theme["color-basic-700"]}
              strokeWidth={2.5}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default PrimaryHeader;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      minHeight: 56,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme["color-basic-200"],
      backgroundColor: theme["background-basic-color-1"],
    },
    sideSlot: {
      width: 48,
      alignItems: "center",
      justifyContent: "center",
    },
    centerSlot: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    backButton: {
      padding: 4,
    },
    rightButton: {
      padding: 4,
    },
    title: {
      fontSize: theme["text-heading-3-font-size"],
      fontFamily: theme["font-family-secondary"],
      color: theme["color-basic-700"],
      textAlign: "center",
    },
  });
