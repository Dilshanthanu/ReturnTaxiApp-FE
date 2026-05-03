import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@ui-kitten/components";
import { ChevronLeft } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { AppTheme } from "@/src/theme/ThemeContext";

interface SignupBackButtonProps {
  onPress?: () => void;
}

const SignupBackButton: React.FC<SignupBackButtonProps> = ({ onPress }) => {
  const { t } = useTranslation();
  const theme = useTheme() as AppTheme;
  const styles = backButtonStyles(theme);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <ChevronLeft color={theme["color-basic-500"]} width={24} height={24} />
      <Text style={styles.text}>{t("back")}</Text>
    </TouchableOpacity>
  );
};

export default SignupBackButton;

const backButtonStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      minHeight: 50,
      gap: 10,
    },
    text: {
      fontFamily: theme["font-poppins-semibold"],
      fontSize: theme["text-paragraph-1-font-size"],
      color: theme["color-basic-500"],
    },
  });
