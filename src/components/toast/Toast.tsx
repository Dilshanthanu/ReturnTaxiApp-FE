import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@ui-kitten/components";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  X,
} from "lucide-react-native";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
  const theme = useTheme();

  const isDarkMode =
    theme["background-basic-color-1"] === "#222B45" ||
    theme["background-basic-color-1"] === "#1A2138"; // Standard Eva dark mode backgrounds

  const config = {
    success: {
      icon: CheckCircle2,
      border: theme["color-success-500"],
      bg: "rgba(0, 214, 143, 0.15)",
    },
    error: {
      icon: XCircle,
      border: theme["color-danger-500"],
      bg: "rgba(255, 61, 113, 0.15)",
    },
    warning: {
      icon: AlertCircle,
      border: theme["color-warning-500"] || theme["color-warning"],
      bg: "rgba(255, 170, 0, 0.15)",
    },
    info: {
      icon: Info,
      border: theme["color-info-500"],
      bg: "rgba(0, 149, 255, 0.15)",
    },
  }[type];

  const StatusIcon = config.icon;

  return (
    <Animated.View
      entering={SlideInRight.duration(400)}
      exiting={SlideOutLeft.duration(400)}
      style={[
        styles.container,
        {
          borderColor: config.border,
          backgroundColor: isDarkMode
            ? config.bg
            : theme["background-basic-color-1"],
        },
      ]}
    >
      <View style={styles.left}>
        <StatusIcon size={24} color={config.border} style={styles.icon} />

        <Text
          style={[
            styles.text,
            {
              color: theme["text-basic-color"],
              fontFamily: theme["font-poppins-medium"] as string,
              fontSize: Number(theme["text-paragraph-2-font-size"]),
            },
          ]}
        >
          {message}
        </Text>
      </View>

      <TouchableOpacity onPress={onClose}>
        <X size={20} color={config.border} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 60,
    left: 16,
    right: 16,
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 9999,
    elevation: 6,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  close: {
    width: 20,
    height: 20,
  },
  text: {
    flexShrink: 1,
  },
});
