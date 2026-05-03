import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Info } from "lucide-react-native";
import { AppTheme, useAppTheme } from "../theme/ThemeContext";

const Warning = ({ text }: { text: string }) => {
  const theme = useAppTheme();

  const isDarkMode =
    theme["background-basic-color-1"] === "#222B45" ||
    theme["background-basic-color-1"] === "#1A2138";

  // Use a darker shade of warning for light mode so it contrasts with light backgrounds
  const textColor = isDarkMode
    ? theme["color-warning"]
    : theme["color-warning-700"] || "#B37700";

  const styles = getStyles(theme, textColor);

  return (
    <View style={styles.warningContainer}>
      <Info size={20} color={textColor} />
      <Text style={styles.warningText}>{text}</Text>
    </View>
  );
};

export default memo(Warning);

const getStyles = (theme: AppTheme, textColor: string) =>
  StyleSheet.create({
    warningContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme["color-warning-50"],
      padding: 12,
      borderRadius: 8,
      marginTop: 10,
    },
    warningText: {
      color: textColor,
      fontFamily: theme["font-inter-medium"],
      fontSize: theme["text-caption-1-font-size"],
      marginLeft: 8,
      flex: 1,
    },
  });
