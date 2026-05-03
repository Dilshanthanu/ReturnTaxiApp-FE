import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, ActivityIndicator } from "react-native";
import { useTheme } from "@ui-kitten/components";
import { useLoaderContext } from "../contexts/LoaderContext";
import { AppTheme } from "../theme/ThemeContext";

interface Props {
  text: string;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  type?: "PRIMARY" | "SECONDARY";
}

const PrimaryButton: React.FC<Props> = ({ text, onPress, style, disabled = false, type = "PRIMARY" }) => {
  const theme = useTheme() as Record<string, string | number>;
  const { isLoading } = useLoaderContext();
  const dynamicStyles = styles(theme as AppTheme, disabled || isLoading, type);

  return (
    <TouchableOpacity
      activeOpacity={disabled || isLoading ? 1 : 0.9}
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[dynamicStyles.button, style]}
    >
      {isLoading ? (
        <ActivityIndicator color={type === "PRIMARY" ? theme["text-control-color"] as string : theme["color-primary-500"] as string} />
      ) : (
        <Text style={dynamicStyles.text}>{text.toUpperCase()}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = (theme: AppTheme, disabled: boolean, type: "PRIMARY" | "SECONDARY") =>
  StyleSheet.create({
    button: {
      width: "100%",
      alignSelf: "stretch",
      minHeight: 48,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: type === "PRIMARY"
        ? (disabled ? theme["color-primary-disabled"] : theme["color-primary-500"])
        : "transparent",
      borderColor: disabled
        ? theme["color-primary-disabled"]
        : theme["color-primary-500"],
      borderWidth: 1,
      paddingVertical: 12,
    },
    text: {
      color: type === "PRIMARY"
        ? theme["text-control-color"]
        : (disabled ? theme["color-primary-disabled"] : theme["color-primary-500"]),
      fontSize: theme["text-paragraph-1-font-size"],
      fontFamily: theme["font-poppins-semibold"],
      textAlign: "center",
    },
  });

export default PrimaryButton;
