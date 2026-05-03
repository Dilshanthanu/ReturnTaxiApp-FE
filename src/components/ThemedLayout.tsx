import React from "react";
import { StyleSheet, View } from "react-native";
import { LayoutProps, useTheme } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../theme/ThemeContext";

interface ThemedLayoutProps extends LayoutProps {
  children: React.ReactNode;
}

const ThemedLayout: React.FC<ThemedLayoutProps> = ({ children, style }) => {
  const { theme } = useAppTheme();
  const uiKittenTheme = useTheme();

  return (
    <View style={[styles.container, style]}>
      {theme === "dark" ? (
        <LinearGradient
          colors={["#0F1112", "#152E40"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: uiKittenTheme["background-basic-color-1"] },
          ]}
        />
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ThemedLayout;
