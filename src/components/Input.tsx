import React, { useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import { Input, InputProps, useTheme } from "@ui-kitten/components";
import { AppTheme } from "../theme/ThemeContext";

interface Props extends Omit<InputProps, "onPress"> {
  required?: boolean;
  errorMessage?: string;
  onPress?: () => void;
}

const InputField: React.FC<Props> = ({
  required = false,
  errorMessage,
  onPress,
  editable,
  ...rest
}) => {
  const theme = useTheme() as AppTheme;
  const [focused, setFocused] = useState<boolean>(false);
  const dynamicStyles = styles(
    theme,
    rest.disabled ?? false,
    focused,
    !!errorMessage,
  );

  const isEditable = editable !== undefined ? editable : !onPress && !rest.disabled;

  const content = (
    <Input
      status={errorMessage ? "danger" : "primary"}
      size="large"
      disabled={rest.disabled}
      editable={isEditable}
      style={dynamicStyles.input}
      textStyle={[
        dynamicStyles.text,
        rest.multiline && { height: 120, textAlignVertical: "top" },
      ]}
      placeholderTextColor={theme["color-basic-400"] as string}
      onFocus={() => {
        if (!onPress) setFocused(true);
      }}
      onBlur={() => setFocused(false)}
      pointerEvents={onPress ? "none" : "auto"}
      caretHidden={!!onPress || isEditable === false}
      focusable={!onPress && isEditable !== false}
      showSoftInputOnFocus={!onPress && isEditable !== false}
      {...rest}
      label={undefined}
    />
  );

  return (
    <View style={{ width: "100%" }}>
      {rest.label && (
        <Text style={dynamicStyles.label}>
          {rest.label}
          {required && (
            <Text style={{ color: theme["color-danger-500"] }}> *</Text>
          )}
        </Text>
      )}
      <View style={{ width: "100%" }}>
        {content}
        {onPress && (
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
              onPress();
            }}
            style={({ pressed }) => [
              StyleSheet.absoluteFill,
              {
                backgroundColor: pressed ? "rgba(0,0,0,0.05)" : "transparent",
                borderRadius: 4,
                zIndex: 10,
              },
            ]}
          />
        )}
      </View>
      {errorMessage && <Text style={dynamicStyles.error}>{errorMessage}</Text>}
    </View>
  );
};

const styles = (
  theme: AppTheme,
  disabled: boolean,
  focused: boolean,
  error: boolean,
) =>
  StyleSheet.create({
    label: {
      marginBottom: 8,
      fontSize: 14,
      fontFamily: theme["font-poppins-medium"],
      color: theme["color-basic-600"],
    },
    input: {
      width: "100%",
      minHeight: 48,
      paddingVertical: 0,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: disabled
        ? theme["text-disabled-color"]
        : error
          ? theme["color-danger-300"]
          : focused
            ? theme["color-primary-500"]
            : theme["input-border-color"],
      backgroundColor: disabled
        ? theme["input-background-disabled-color"]
        : theme["input-background-color"],
    },
    text: {
      fontSize: theme["text-paragraph-1-font-size"],
      fontFamily: theme["font-poppins-regular"],
      color: disabled
        ? theme["text-disabled-color"]
        : theme["text-basic-color"],
    },
    error: {
      color: theme["color-danger-600"],
      fontSize: 12,
      fontFamily: theme["font-poppins-regular"],
      marginTop: 4,
      marginLeft: 2,
    },
  });

export default InputField;
