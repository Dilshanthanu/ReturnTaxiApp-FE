import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Gender } from "@/src/enums/User";
import { userStore } from "@/src/store/UserStore";
import { AppTheme } from "@/src/theme/ThemeContext";
import { getFullName } from "@/src/utils/userUtils";

const WelcomeHeader = observer(() => {
  const { t } = useTranslation();
  const theme = useTheme() as AppTheme;
  const router = useRouter();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  const getSalutation = () => {
    switch (userStore.gender) {
      case Gender.MALE:
        return "Mr.";
      case Gender.FEMALE:
        return t("ms", "Ms.");
      default:
        return "";
    }
  };

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.welcomeText}>{t("hello", "Welcome")}!</Text>
        <Text style={styles.userNameText}>
          {getSalutation()}{" "}
          {getFullName(userStore.firstName, userStore.lastName, "User")}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.notificationBtn}
        onPress={() => router.push("/(auth)/notifications")}
      >
        <Bell color={theme["color-primary-500"]} size={28} />
      </TouchableOpacity>
    </View>
  );
});

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 25,
      paddingTop: 10,
      paddingBottom: 25,
    },
    welcomeText: {
      fontSize: theme["text-heading-1-font-size"],
      fontFamily: theme["font-poppins-bold"],
      color: theme["text-basic-color"],
    },
    userNameText: {
      fontSize: theme["text-heading-2-font-size"],
      fontFamily: theme["font-poppins-semibold"],
      color: theme["color-primary-500"],
      marginTop: 2,
    },
    notificationBtn: {
      padding: 5,
    },
  });

export default WelcomeHeader;
