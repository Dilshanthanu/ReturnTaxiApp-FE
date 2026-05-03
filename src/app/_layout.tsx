import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppThemeProvider } from "@/theme/ThemeContext";
import "@/localization/i18n";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <LoaderProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(public)" />
            <Stack.Screen
              name="modal"
              options={{
                presentation: "modal",
                headerShown: true,
                title: "Modal",
              }}
            />
          </Stack>
          <StatusBar style="auto" />
        </LoaderProvider>
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}
