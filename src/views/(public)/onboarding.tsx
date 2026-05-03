import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ViewToken,
  Platform,
} from "react-native";
import {
  ChevronRight,
  ShieldCheck,
  MapPin,
  Calculator,
  Sun,
  Moon,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/theme/ThemeContext";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { theme: currentTheme, toggleTheme } = useAppTheme();

  const DATA = [
    {
      id: "1",
      title: t("onboarding.slide1_title"),
      description: t("onboarding.slide1_desc"),
      iconName: "ShieldCheck",
    },
    {
      id: "2",
      title: t("onboarding.slide2_title"),
      description: t("onboarding.slide2_desc"),
      iconName: "MapPin",
    },
    {
      id: "3",
      title: t("onboarding.slide3_title"),
      description: t("onboarding.slide3_desc"),
      iconName: "Calculator",
    },
  ];

  const theme = Colors[currentTheme];
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useSharedValue(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    },
  ).current;

  const handleNext = () => {
    if (currentIndex < DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace("/login");
    }
  };

  const handleSkip = () => {
    router.replace("/login");
  };

  const renderItem = ({ item }: { item: (typeof DATA)[0] }) => {
    const IconComponent =
      item.iconName === "ShieldCheck"
        ? ShieldCheck
        : item.iconName === "MapPin"
          ? MapPin
          : Calculator;

    return (
      <View style={styles.slide}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: theme.primaryLight, opacity: 0.9 },
          ]}
        >
          <View style={styles.iconCircle} />
          <IconComponent
            size={width * 0.4}
            color={theme.primaryDark}
            strokeWidth={1.5}
          />
        </View>
        <View style={styles.textContainer}>
          <ThemedText
            type="title"
            style={[styles.title, { color: theme.secondary }]}
          >
            {item.title}
          </ThemedText>
          <ThemedText
            style={[styles.description, { color: theme.textSecondary }]}
          >
            {item.description}
          </ThemedText>
        </View>
      </View>
    );
  };

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar style={currentTheme === "dark" ? "light" : "dark"} />

      {/* Dynamic Background Elements */}
      <View
        style={[
          styles.bgBlob,
          {
            backgroundColor: theme.primaryLight,
            opacity: currentTheme === "dark" ? 0.2 : 0.6,
          },
        ]}
      />
      <View
        style={[
          styles.bgBlob2,
          {
            backgroundColor: theme.primaryLight,
            opacity: currentTheme === "dark" ? 0.1 : 0.8,
          },
        ]}
      />

      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        {/* Header Controls */}
        <View style={styles.headerRow}>
          {/* Theme Toggle */}
          <View style={styles.headerGroup}>
            <TouchableOpacity
              style={[
                styles.themeToggleButton,
                { backgroundColor: theme.surface },
              ]}
              onPress={toggleTheme}
              activeOpacity={0.7}
            >
              {currentTheme === "light" ? (
                <Moon size={20} color={theme.primaryDark} />
              ) : (
                <Sun size={20} color={theme.primary} />
              )}
            </TouchableOpacity>
          </View>

          {/* Skip Button */}
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <ThemedText
              style={[styles.skipText, { color: theme.textSecondary }]}
            >
              {t("onboarding.skip")}
            </ThemedText>
          </TouchableOpacity>
        </View>

        <FlatList
          ref={flatListRef}
          data={DATA}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            scrollX.value = event.nativeEvent.contentOffset.x;
          }}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.footer}>
          {/* Indicators */}
          <View style={styles.indicatorContainer}>
            {DATA.map((_, index) => {
              const animatedStyle = useAnimatedStyle(() => {
                const inputRange = [
                  (index - 1) * width,
                  index * width,
                  (index + 1) * width,
                ];
                const dotWidth = interpolate(
                  scrollX.value,
                  inputRange,
                  [10, 24, 10],
                  Extrapolate.CLAMP,
                );
                const opacity = interpolate(
                  scrollX.value,
                  inputRange,
                  [0.4, 1, 0.4],
                  Extrapolate.CLAMP,
                );

                return {
                  width: dotWidth,
                  opacity,
                  backgroundColor: theme.primary,
                };
              });

              return (
                <Animated.View
                  key={index}
                  style={[styles.indicator, animatedStyle]}
                />
              );
            })}
          </View>

          {/* Action Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleNext} activeOpacity={0.9}>
              <LinearGradient
                colors={[theme.primary, theme.primaryDark]}
                style={styles.nextButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <ThemedText style={styles.buttonText}>
                  {currentIndex === DATA.length - 1
                    ? t("onboarding.start")
                    : t("onboarding.next")}
                </ThemedText>
                <ChevronRight size={20} color="#FFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
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
    top: -100,
    right: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  bgBlob2: {
    position: "absolute",
    bottom: 100,
    left: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  safeArea: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 10 : 0,
  },
  headerGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  themeToggleButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  skipButton: {
    paddingVertical: 12,
  },
  skipText: {
    fontSize: 16,
    fontWeight: "600",
  },
  slide: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  iconContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    overflow: "hidden",
    position: "relative",
  },
  iconCircle: {
    position: "absolute",
    width: "120%",
    height: "120%",
    borderRadius: 1000,
    backgroundColor: "#FFF",
    opacity: 0.3,
    top: "20%",
    right: "-10%",
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 40,
    marginBottom: 16,
  },
  description: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 26,
    paddingHorizontal: 10,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  indicator: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  buttonContainer: {
    width: "100%",
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 20,
    gap: 8,
    shadowColor: "#FFC107",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
