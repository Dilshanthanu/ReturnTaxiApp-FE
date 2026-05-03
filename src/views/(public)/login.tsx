import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Chrome as GoogleIcon,
  Apple as AppleIcon,
} from "lucide-react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/theme/ThemeContext";
import { useTranslation } from "react-i18next";

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { theme: currentTheme } = useAppTheme();
  const theme = Colors[currentTheme];

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // For now navigate to explore
    router.replace("/(public)/explore");
  };

  const handleAppleLogin = () => {};
  const handleGoogleLogin = () => {};

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar style={currentTheme === "dark" ? "light" : "dark"} />

      {/* Decorative Blobs */}
      <View
        style={[
          styles.bgBlob,
          {
            backgroundColor: theme.primary,
            opacity: currentTheme === "dark" ? 0.1 : 0.05,
          },
        ]}
      />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Header Section */}
            <View style={styles.header}>
              <View
                style={[
                  styles.logoPlaceholder,
                  { backgroundColor: theme.primary },
                ]}
              >
                <View style={styles.logoInner} />
              </View>
              <ThemedText type="title" style={styles.welcomeTitle}>
                {t("login.welcome")}
              </ThemedText>
              <ThemedText
                style={[styles.subtitle, { color: theme.textSecondary }]}
              >
                {t("login.subtitle")}
              </ThemedText>
            </View>

            {/* Form Section */}
            <View style={styles.form}>
              {/* Phone Number Input */}
              <View style={styles.inputGroup}>
                <ThemedText style={[styles.inputLabel, { color: theme.text }]}>
                  {t("login.phone_label")}
                </ThemedText>
                <View
                  style={[
                    styles.inputWrapper,
                    {
                      backgroundColor: theme.surface,
                      borderColor: theme.secondaryLight + "40",
                    },
                  ]}
                >
                  <Phone
                    size={20}
                    color={theme.textSecondary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: theme.text }]}
                    placeholder={t("login.phone_placeholder")}
                    placeholderTextColor={theme.textSecondary + "80"}
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <ThemedText
                    style={[styles.inputLabel, { color: theme.text }]}
                  >
                    {t("login.password_label")}
                  </ThemedText>
                  <TouchableOpacity>
                    <ThemedText
                      style={[styles.forgotText, { color: theme.primary }]}
                    >
                      {t("login.forgot")}
                    </ThemedText>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.inputWrapper,
                    {
                      backgroundColor: theme.surface,
                      borderColor: theme.secondaryLight + "40",
                    },
                  ]}
                >
                  <Lock
                    size={20}
                    color={theme.textSecondary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: theme.text }]}
                    placeholder={t("login.password_placeholder")}
                    placeholderTextColor={theme.textSecondary + "80"}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color={theme.textSecondary} />
                    ) : (
                      <Eye size={20} color={theme.textSecondary} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleLogin}
                activeOpacity={0.9}
                style={styles.loginBtnWrapper}
              >
                <LinearGradient
                  colors={[theme.primary, theme.primaryDark]}
                  style={styles.loginButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <ThemedText style={styles.buttonText}>
                    {t("login.login_btn")}
                  </ThemedText>
                  <ArrowRight size={20} color="#FFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Registration Prompt */}
            <View style={styles.footer}>
              <ThemedText
                style={[styles.footerText, { color: theme.textSecondary }]}
              >
                {t("login.no_account")}{" "}
              </ThemedText>
              <TouchableOpacity
                onPress={() => router.push("/(public)/(signup)/signup")}
              >
                <ThemedText
                  style={[styles.signUpText, { color: theme.primary }]}
                >
                  {t("login.sign_up")}
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgBlob: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    transform: [{ rotate: "45deg" }],
  },
  logoInner: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  form: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  forgotText: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },
  loginBtnWrapper: {
    marginTop: 12,
  },
  loginButton: {
    flexDirection: "row",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 12,
    fontWeight: "800",
  },
  socialRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 40,
  },
  socialBtn: {
    flex: 1,
    flexDirection: "row",
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  socialBtnText: {
    fontSize: 16,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 15,
  },
  signUpText: {
    fontSize: 15,
    fontWeight: "700",
  },
});
