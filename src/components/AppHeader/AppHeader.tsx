import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "@ui-kitten/components";
import { ArrowLeft } from "lucide-react-native";
import { AppTheme, useThemeSettings } from "@/src/theme/ThemeContext";

interface AppHeaderProps {
  title: string;
  subTitle?: string;
  onBackPress?: () => void;
  centered?: boolean;
  headerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  renderRight?: () => React.ReactNode;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subTitle,
  onBackPress,
  centered = false,
  headerStyle,
  titleStyle,
  renderRight,
}) => {
  const theme = useTheme() as AppTheme;
  const { themeName } = useThemeSettings();
  const styles = getStyles(theme, themeName);

  return (
    <View style={[styles.header, headerStyle]}>
      {centered ? (
        <>
          <View style={styles.leftAction}>
            {onBackPress && (
              <TouchableOpacity
                onPress={onBackPress}
                style={styles.backButton}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              >
                <ArrowLeft color={theme["text-basic-color"]} size={24} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.centerContainer}>
            <View style={styles.textContainer}>
              <Text
                style={[styles.headerText, titleStyle, { textAlign: "center" }]}
                allowFontScaling={false}
                numberOfLines={1}
              >
                {title}
              </Text>
              {subTitle && (
                <Text
                  style={[
                    styles.subHeaderText,
                    titleStyle,
                    { textAlign: "center" },
                  ]}
                  allowFontScaling={false}
                >
                  {subTitle}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.rightAction}>{renderRight && renderRight()}</View>
        </>
      ) : (
        <>
          <View style={styles.leftContainer}>
            {onBackPress && (
              <TouchableOpacity
                onPress={onBackPress}
                style={styles.backButton}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              >
                <ArrowLeft color={theme["text-basic-color"]} size={24} />
              </TouchableOpacity>
            )}

            <View style={styles.textContainer}>
              <Text
                style={[styles.headerText, titleStyle]}
                allowFontScaling={false}
                numberOfLines={1}
              >
                {title}
              </Text>
              {subTitle && (
                <Text
                  style={[styles.subHeaderText, titleStyle]}
                  allowFontScaling={false}
                >
                  {subTitle}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.rightAction}>{renderRight && renderRight()}</View>
        </>
      )}
    </View>
  );
};

export default AppHeader;

const getStyles = (theme: AppTheme, themeName: string) =>
  StyleSheet.create({
    header: {
      minHeight: 60,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      zIndex: 10,
      backgroundColor:
        themeName === "light"
          ? theme["background-basic-color-1"]
          : theme["background-basic-color-2"],
      paddingHorizontal: 16,
      ...(themeName === "light"
        ? {
          shadowColor: theme["drop-shadow"],
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3,
        }
        : {
          borderBottomWidth: 1,
          borderBottomColor: theme["color-basic-300"],
        }),
    },
    leftContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      flex: 1,
    },
    leftAction: {
      width: 40,
      alignItems: "flex-start",
      justifyContent: "center",
    },
    rightAction: {
      minWidth: 40,
      alignItems: "flex-end",
      justifyContent: "center",
    },
    textContainer: {
      flexDirection: "column",
    },
    centerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    headerText: {
      fontFamily: theme["font-poppins-semibold"],
      fontSize: theme["text-heading-3-font-size"],
      color: theme["text-basic-color"],
    },
    subHeaderText: {
      fontFamily: theme["font-poppins-regular"],
      fontSize: theme["text-caption-1-font-size"],
      color: theme["text-hint-color"],
    },
    backButton: {
      padding: 8,
      marginLeft: -8,
    },
  });
