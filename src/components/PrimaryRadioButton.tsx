import React, { forwardRef } from 'react'
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { useTheme } from '@ui-kitten/components';
import { LucideIcon } from 'lucide-react-native';
import { AppTheme } from '../theme/ThemeContext'

interface Props {
    title: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    icon?: LucideIcon;
    onPress?: () => void;
}

const PrimaryRadioButton = forwardRef<View, Props>(({ title, checked, onChange, disabled, style, icon: Icon, onPress }, ref) => {
    const theme = useTheme() as AppTheme;
    const styles = primaryRadioButtonStyles(theme, disabled, checked);

    const handlePress = () => {
        if (!disabled) {
            onChange(!checked);
            onPress?.();
        }
    };

    return (
        <TouchableOpacity
            ref={ref}
            style={[styles.container, style]}
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={disabled}
        >
            {Icon && <Icon
                size={20}
                color={disabled ? theme["text-disabled-color"] : checked ? theme["color-primary-500"] : theme["color-basic-500"]}
                style={styles.icon}
            />}
            <Text style={styles.text}>{title}</Text>
            <View style={styles.radioContainer}>
                <View style={styles.radioOuterCircle}>
                    {checked && <View style={styles.radioInnerCircle} />}
                </View>
            </View>
        </TouchableOpacity>
    )
})

PrimaryRadioButton.displayName = 'PrimaryRadioButton';

export default PrimaryRadioButton

const primaryRadioButtonStyles = (theme: AppTheme, disabled?: boolean, checked?: boolean) =>
    StyleSheet.create({
        container: {
            width: "100%",
            minHeight: 48,
            borderRadius: 8,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            // paddingVertical: 12,
            backgroundColor: disabled
                ? theme["color-basic-200"] // Assuming a disabled color
                : theme["feature-home-search-bar-background-color"], // Or another suitable background
            borderWidth: 1,
            borderColor: disabled
                ? theme["color-basic-400"]
                : checked
                    ? theme["color-primary-500"]
                    : theme["color-basic-400"],
            marginBottom: 12, // Add some spacing between buttons if stacked
        },
        radioContainer: {
            marginRight: 12,
        },
        radioOuterCircle: {
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: disabled
                ? theme["color-basic-400"]
                : checked
                    ? theme["color-primary-500"]
                    : theme["color-basic-600"],
            justifyContent: 'center',
            alignItems: 'center',
        },
        radioInnerCircle: {
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: disabled
                ? theme["color-basic-400"]
                : theme["color-primary-500"],
        },
        text: {
            height: '100%',
            textAlignVertical: 'center',
            color: disabled
                ? theme["text-disabled-color"]
                : checked
                    ? theme["color-primary-500"]
                    : theme["color-basic-500"],
            fontSize: theme["text-paragraph-1-font-size"],
            fontFamily: theme["font-poppins-regular"],
            flex: 1,
        },
        icon: {
            marginRight: 12,
        }
    });
