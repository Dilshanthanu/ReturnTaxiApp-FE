import { StyleSheet } from "react-native";
import { AppTheme } from "@/src/theme/ThemeContext";

export const swipableCardStyles = (theme: AppTheme) =>
  StyleSheet.create({
    cardContainer: {
      backgroundColor: theme["background-basic-color-1"],
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 2,
      // Shadow for iOS
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      // Elevation for Android
      elevation: 3,
    },
    rightAction: {
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: "transparent",
      flex: 1,
      justifyContent: "flex-end",
    },
    actionButton: {
      width: 80,
      height: "80%",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      borderRadius: 12,
      marginLeft: 8,
    },
    viewButton: {
      backgroundColor: theme["color-primary-500"],
    },
    editButton: {
      backgroundColor: theme["color-warning-500"],
    },
    deleteButton: {
      backgroundColor: theme["color-danger-500"],
    },
    actionText: {
      color: "white",
      fontSize: 12,
      fontFamily: theme["font-poppins-medium"],
      marginTop: 4,
      textAlign: "center",
    },
  });
