import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { useTheme } from "@ui-kitten/components";
import { Plus, SendHorizontal } from "lucide-react-native";
import { AppTheme } from "@/src/theme/ThemeContext";

type Props = TextInputProps & {
  onSend?: () => void;
  onAddPress?: () => void;
  disabled?: boolean;
};

export default function MessageInput({
  value,
  onChangeText,
  onSend,
  onAddPress,
  placeholder,
  disabled,
  ...inputProps
}: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={[styles.container, disabled && { opacity: 0.5 }]}>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.plusBtn}
          onPress={onAddPress}
          disabled={disabled}
        >
          <Plus
            size={22}
            color={theme["background-basic-color-1"]}
            strokeWidth={2.5}
          />
        </TouchableOpacity>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme["color-basic-500"]}
          style={styles.input}
          multiline
          editable={!disabled}
          {...inputProps}
        />

        <TouchableOpacity onPress={onSend} disabled={disabled || !value?.trim()}>
          <SendHorizontal
            size={22}
            color={
              disabled || !value?.trim()
                ? theme["color-basic-400"]
                : theme["color-primary-500"]
            }
            strokeWidth={2.5}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      paddingVertical: 16,
      borderTopWidth: 1,
      borderColor: theme["color-basic-300"],
      marginHorizontal: 20,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme["color-basic-100"],
      padding: 10,
      borderRadius: 50,
    },
    plusBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme["color-secondary-500"],
      alignItems: "center",
      justifyContent: "center",
      marginRight: 8,
    },
    input: {
      flex: 1,
      minHeight: 42,
      maxHeight: 120,
      borderRadius: 21,
      backgroundColor: theme["color-basic-100"],
      paddingHorizontal: 14,
      paddingVertical: 8,
      marginRight: 8,
      fontSize: theme["text-paragraph-2-font-size"],
      color: theme["text-basic-color"],
    },
  });
