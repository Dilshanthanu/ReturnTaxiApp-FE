import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Plus } from "lucide-react-native";
import { useAppTheme , AppTheme } from "@/src/theme/ThemeContext";

interface FabInterface extends TouchableOpacityProps {
  type: "FB" | "Plus";
}

const Fab = (props: FabInterface) => {
  const theme = useAppTheme();
  return (
    <TouchableOpacity style={styles(theme).fab} onPress={props.onPress}>
      <Plus size={32} color={theme["text-control-color"]} />
    </TouchableOpacity>
  );
};

export default Fab;

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    fab: {
      position: "absolute",
      bottom: 110,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme["color-primary-500"],
      alignItems: "center",
      justifyContent: "center",
      elevation: 8,
      shadowColor: theme["color-basic-200"],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      zIndex: 100,
    },
  });
