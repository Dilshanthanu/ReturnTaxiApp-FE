import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { User } from "lucide-react-native";
import { AppTheme, useAppTheme } from "@/src/theme/ThemeContext";

interface AvatarProps {
  uri?: string | null;
  size?: number;
  style?: ViewStyle;
}

const Avatar: React.FC<AvatarProps> = ({ uri, size = 50, style }) => {
  const theme = useAppTheme();
  const styles = getStyles(theme, size);

  return (
    <View style={[styles.container, style]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={styles.image}
          contentFit="cover"
          transition={200}
          cachePolicy="disk"
        />
      ) : (
        <View style={styles.placeholder}>
          <User size={size * 0.6} color={theme["color-basic-600"]} />
        </View>
      )}
    </View>
  );
};

export default Avatar;

const getStyles = (theme: AppTheme, size: number) =>
  StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size / 2,
      overflow: "hidden",
      backgroundColor: theme["background-basic-color-3"],
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    placeholder: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme["color-basic-200"],
    },
  });
