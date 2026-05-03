import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

interface LoaderProps {
  visible?: boolean;
}

export const Loader = ({ visible = true }: LoaderProps) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        source={require("@assets/animations/Loader.json")}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  animation: {
    width: 140,
    height: 140,
  },
});

