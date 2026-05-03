import { StyleSheet } from "react-native";
import { AppTheme } from "@/src/theme/ThemeContext";

export const modalHeaderStyles = (theme: AppTheme, themeName: string) =>
  StyleSheet.create({
    header: {
      minHeight: 53,
      maxHeight: 80,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor:
        themeName === "light"
          ? theme["background-basic-color-1"]
          : theme["background-basic-color-2"],
      padding: 10,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
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
    cancelText: {
      color: theme["color-danger-700"],
      fontFamily: theme["font-poppins-regular"],
      fontSize: theme["text-caption-1-font-size"],
    },
    textContainer: { flex: 3 },
    headerText: {
      textAlign: "center",
      fontFamily: theme["font-poppins-semibold"],
      fontSize: theme["text-heading-3-font-size"],
      color: theme["text-basic-color"],
    },
    subHeader: {
      textAlign: "center",
      textAlignVertical: "center",
      fontFamily: theme["font-poppins-regular"],
      fontSize: theme["text-caption-1-font-size"],
      color: theme["text-hint-color"],
    },
    clearText: {
      color: theme["color-primary-600"],
      fontFamily: theme["font-poppins-regular"],
      fontSize: theme["text-caption-1-font-size"],
    },
    leftBtnContainer: {
      flex: 1,
      height: "100%",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    sideButton: {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    rightBtnContainer: {
      flex: 1,
      height: "100%",
      justifyContent: "center",
      alignItems: "flex-end",
    },
    btnContainer: {
      flex: 1,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  });
