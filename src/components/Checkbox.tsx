import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CheckBox, CheckBoxProps, useTheme } from "@ui-kitten/components";
import { AppTheme } from "@theme/ThemeContext";

interface Props extends CheckBoxProps {
    label: string;
}

const Checkbox: React.FC<Props> = ({ label, ...props }) => {
    const theme = useTheme() as AppTheme;
    const styles = checkboxStyles(theme);

    return (
        <View style={styles.container}>
            <CheckBox
                {...props}
                style={styles.checkbox}
            />
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => props.onChange && props.onChange(!props.checked, false)}
            >
                <Text style={styles.label}>
                    {label}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Checkbox;

const checkboxStyles = (theme: AppTheme) => StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        // Customize checkbox styles if needed
    },
    label: {
        color: theme['color-basic-600'],
        fontFamily: theme['font-poppins-regular'],
        fontSize: theme['text-paragraph-2-font-size'],
        marginLeft: 14,
    }
});
