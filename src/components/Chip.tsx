import React, { ReactElement } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "@ui-kitten/components";
import { X } from "lucide-react-native";
import { AppTheme } from "../theme/ThemeContext";

type Status = "primary" | "basic" | "success" | "info" | "warning" | "danger";
type Variant = "filled" | "outlined";
type Size = "small" | "medium" | "large";

interface ChipProps {
  label: string;
  icon?: ReactElement;
  onDelete?: () => void;
  onPress?: () => void;
  selected?: boolean;
  disabled?: boolean;
  status?: Status;
  variant?: Variant;
  size?: Size;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Chip: React.FC<ChipProps> = ({
  label,
  icon,
  onDelete,
  onPress,
  selected = false,
  disabled = false,
  status = "basic",
  variant = "filled",
  size = "medium",
  style,
  textStyle,
}) => {
  const theme = useTheme();
  // If selected, force primary filled style unless explicitly overridden via style logic?
  // Usually "selected" chips use primary color. Let's incorporate that logic.
  const effectiveStatus = selected ? "primary" : status;
  const effectiveVariant = selected ? "filled" : variant;

  const dynamicStyles = getStyles(
    theme,
    effectiveStatus,
    effectiveVariant,
    size,
    disabled,
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || !onPress}
      activeOpacity={0.7}
    >
      <View style={[dynamicStyles.container, style]}>
        {icon && <View style={dynamicStyles.iconContainer}>{icon}</View>}
        <Text style={[dynamicStyles.text, textStyle]}>{label}</Text>
        {onDelete && !disabled && (
          <TouchableOpacity
            onPress={onDelete}
            style={dynamicStyles.deleteButton}
            testID="chip-delete-button"
          >
            <X
              size={size === "small" ? 12 : 16}
              color={dynamicStyles.text.color}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (
  theme: AppTheme,
  status: Status,
  variant: Variant,
  size: Size,
  disabled: boolean,
) => {
  const backgroundColor =
    variant === "filled"
      ? disabled
        ? theme[`color-${status}-disabled`] || theme["color-basic-disabled"]
        : theme[`color-${status}-700`]
      : "transparent";

  const borderColor = disabled
    ? theme[`color-${status}-disabled`] || theme["color-basic-disabled"]
    : theme[`color-${status}-500`];

  const textColor =
    variant === "filled"
      ? theme["text-control-color"]
      : disabled
        ? theme[`color-${status}-disabled`] || theme["text-disabled-color"]
        : theme[`color-${status}-500`];

  const paddingVertical = size === "small" ? 4 : size === "large" ? 10 : 7;
  const paddingHorizontal = size === "small" ? 8 : size === "large" ? 16 : 12;
  const fontSize = size === "small" ? 12 : size === "large" ? 16 : 14;

  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10, // Pill shape
      borderWidth: variant === "outlined" ? 1 : 0,
      backgroundColor,
      borderColor,
      paddingVertical,
      paddingHorizontal,
      opacity: disabled ? 0.6 : 1,
      alignSelf: "flex-start", // Prevent implementation from stretching full width by default
    },
    text: {
      color: textColor,
      fontSize,
      fontFamily: theme["font-poppins-medium"], // Assuming this font exists based on other components
      textAlign: "center",
    },
    iconContainer: {
      marginRight: 6,
    },
    deleteButton: {
      marginLeft: 6,
    },
  });
};

export default Chip;
