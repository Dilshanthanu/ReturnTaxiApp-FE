import React, { memo } from "react";
import { StyleSheet, View, ViewStyle, TouchableOpacity } from "react-native";
import { Text, useTheme } from "@ui-kitten/components";
import { X } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import {
  Dropdown as ElementDropdown,
  MultiSelect,
} from "react-native-element-dropdown";
import { AppTheme } from "../theme/ThemeContext";
import { DropdownOptions } from "../types/common/components";

type SharedProps = Partial<
  Omit<
    React.ComponentProps<typeof ElementDropdown> &
      React.ComponentProps<typeof MultiSelect>,
    "data" | "onChange" | "value" | "labelField" | "valueField"
  >
>;

interface DropdownProps extends SharedProps {
  label?: string;
  data: DropdownOptions[];
  placeholder?: string;
  onSelect: (value: string | number | (string | number)[]) => void;
  required?: boolean;
  disabled?: boolean;
  customDropdownStyles?: ViewStyle;
  errorMessage?: string;
  value?: string | number | (string | number)[];
  multiSelect?: boolean;
  style?: ViewStyle;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  data,
  placeholder,
  required = false,
  disabled = false,
  value,
  onSelect,
  customDropdownStyles,
  errorMessage,
  multiSelect = false,
  style,
  ...rest
}) => {
  const theme = useTheme() as AppTheme;
  const dynamicStyles = styles(theme, disabled, !!errorMessage);
  const { t } = useTranslation();
  const handleSingleSelect = (item: DropdownOptions) => {
    onSelect(item.value);
  };

  const handleMultiSelect = (item: string[]) => {
    onSelect(item);
  };

  const renderSelectedItem = (
    item: DropdownOptions,
    unSelect?: (item: DropdownOptions) => void,
  ) => (
    <View style={dynamicStyles.selectedItem}>
      <Text style={dynamicStyles.selectedItemText}>{item.label}</Text>
      <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
        <X size={16} color={theme["color-primary-500"]} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={dynamicStyles.container}>
      {label && (
        <Text style={dynamicStyles.label}>
          {label}
          {required && (
            <Text style={{ color: theme["color-danger-500"] }}> *</Text>
          )}
        </Text>
      )}

      {multiSelect ? (
        <MultiSelect
          {...rest}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={placeholder || ""}
          value={(value as any) || []}
          onChange={handleMultiSelect}
          style={[dynamicStyles.dropdown, customDropdownStyles, style]}
          selectedStyle={dynamicStyles.selectedStyle}
          placeholderStyle={dynamicStyles.placeholderStyle}
          selectedTextStyle={dynamicStyles.selectedTextStyle}
          itemTextStyle={dynamicStyles.itemTextStyle}
          containerStyle={dynamicStyles.dropdownContainer}
          renderSelectedItem={renderSelectedItem}
          activeColor={theme["color-primary-100"]}
          disable={disabled}
          searchPlaceholder={t("search")}
          inputSearchStyle={dynamicStyles.inputSearchStyle}
        />
      ) : (
        <ElementDropdown
          {...rest}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={placeholder || ""}
          value={value as string | number}
          onChange={handleSingleSelect}
          style={[dynamicStyles.dropdown, customDropdownStyles, style]}
          selectedTextStyle={dynamicStyles.selectedTextStyle}
          placeholderStyle={dynamicStyles.placeholderStyle}
          itemTextStyle={dynamicStyles.itemTextStyle}
          containerStyle={dynamicStyles.dropdownContainer}
          activeColor={theme["color-primary-100"]}
          disable={disabled}
          searchPlaceholder={t("search")}
          inputSearchStyle={dynamicStyles.inputSearchStyle}
        />
      )}

      {errorMessage && <Text style={dynamicStyles.error}>{errorMessage}</Text>}
    </View>
  );
};

const styles = (theme: AppTheme, disabled: boolean, error: boolean) =>
  StyleSheet.create({
    container: {
      width: "100%",
      marginVertical: 2,
    },
    label: {
      marginBottom: 8,
      fontSize: 14,
      fontFamily: theme["font-poppins-medium"],
      color: theme["color-basic-600"],
    },
    dropdown: {
      minHeight: 48,
      backgroundColor: disabled
        ? theme["input-background-disabled-color"]
        : theme["input-background-color"],
      borderColor: disabled
        ? theme["text-disabled-color"]
        : error
          ? theme["color-danger-300"]
          : theme["input-border-color"],
      borderWidth: 1,
      borderRadius: 4,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    dropdownContainer: {
      backgroundColor: theme["input-background-color"],
      borderColor: theme["input-border-color"],
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
    placeholderStyle: {
      fontSize: theme["text-paragraph-1-font-size"],
      color: disabled ? theme["text-disabled-color"] : theme["color-basic-400"],
      fontFamily: theme["font-poppins-regular"],
    },
    selectedTextStyle: {
      fontSize: theme["text-paragraph-1-font-size"],
      color: disabled
        ? theme["text-disabled-color"]
        : theme["text-basic-color"],
      fontFamily: theme["font-poppins-regular"],
    },
    itemTextStyle: {
      fontSize: theme["text-paragraph-1-font-size"],
      color: theme["text-basic-color"],
      fontFamily: theme["font-poppins-regular"],
    },
    selectedStyle: {
      borderRadius: 8,
      backgroundColor: theme["color-primary-100"],
      borderColor: theme["color-primary-200"],
      borderWidth: 1,
    },
    selectedItem: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      backgroundColor: theme["background-basic-color-2"],
      borderWidth: 1,
      borderColor: theme["color-primary-200"],
      marginTop: 8,
      marginRight: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    selectedItemText: {
      marginRight: 8,
      fontSize: 14,
      color: theme["color-primary-500"],
      fontFamily: theme["font-poppins-medium"],
    },
    inputSearchStyle: {
      height: 48,
      fontSize: theme["text-paragraph-1-font-size"],
      color: theme["text-basic-color"],
      fontFamily: theme["font-poppins-regular"],
      backgroundColor: theme["background-basic-color-1"],
      borderColor: theme["input-border-color"],
      borderRadius: 4,
    },
    error: {
      color: theme["color-danger-600"],
      fontSize: 12,
      fontFamily: theme["font-poppins-regular"],
      marginTop: 4,
      marginLeft: 2,
    },
  });

export default memo(Dropdown);
