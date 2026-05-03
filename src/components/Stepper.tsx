import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@ui-kitten/components";
import { AppTheme } from "../theme/ThemeContext";

interface Props {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

const Stepper: React.FC<Props> = ({ currentStep, totalSteps, stepLabels }) => {
  const theme = useTheme() as AppTheme;
  const styles = makeStyles(theme);

  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isCompleted = step <= currentStep - 1;
        const isActive = step === currentStep;
        const isLastStep = index === totalSteps - 1;

        return (
          <React.Fragment key={step}>
            <View style={styles.stepContainer}>
              <View
                style={[
                  styles.circle,
                  (isActive || isCompleted) && styles.activeCircle,
                ]}
              >
                {isCompleted ? (
                  <Ionicons
                    name="checkmark-outline"
                    size={20}
                    color={theme["text-control-color"]}
                  />
                ) : (
                  <Text
                    style={[
                      styles.text,
                      (isActive || isCompleted) && styles.activeText,
                    ]}
                  >
                    {step}
                  </Text>
                )}
              </View>
              {stepLabels && stepLabels[index] && (
                <Text
                  style={[
                    styles.label,
                    (isActive || isCompleted) && styles.activeLabel,
                  ]}
                >
                  {stepLabels[index]}
                </Text>
              )}
            </View>
            {!isLastStep && (
              <View style={[styles.line, isCompleted && styles.activeLine]} />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      width: "100%",
    },
    stepContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    circle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme["color-success-disabled"],
      alignItems: "center",
      justifyContent: "center",
    },
    activeCircle: {
      backgroundColor: theme["color-success-500"],
    },
    text: {
      fontSize: 14,
      fontWeight: "600",
      color: theme["text-control-color"],
    },
    activeText: {
      color: "white",
    },
    line: {
      flex: 1,
      height: 2,
      backgroundColor: theme["color-basic-300"],
    },
    activeLine: {
      backgroundColor: theme["color-success-700"],
    },
    label: {
      fontFamily: theme["font-poppins-regular"],
      fontSize: theme["text-caption-1-font-size"],
      color: theme["color-basic-500"],
      marginTop: 8,
      position: "absolute",
      top: 36,
      width: 100,
      textAlign: "center",
    },
    activeLabel: {
      color: theme["color-success-500"],
      fontFamily: theme["font-poppins-medium"],
    },
  });

export default Stepper;
