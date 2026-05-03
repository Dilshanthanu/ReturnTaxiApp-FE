import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Toggle, ToggleProps, useTheme } from "@ui-kitten/components";
import { AppTheme } from "@theme/ThemeContext";

interface Props extends ToggleProps {
    label?: string;
}

const Switch: React.FC<Props> = ({ label, ...props }) => {
    const theme = useTheme() as AppTheme;
    const styles = switchStyles(theme);

    return (
        <View style={styles.container}>
            <Toggle
                status="basic"
                {...props}
                style={styles.toggle}
            />
            {label && (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => props.onChange && props.onChange(!props.checked)}
                >
                    <Text style={styles.label}>
                        {label}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Switch;

const switchStyles = (theme: AppTheme) => StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    toggle: {
        // Customize toggle styles if needed
    },
    label: {
        color: theme['color-basic-600'],
        fontFamily: theme['font-poppins-regular'],
        fontSize: theme['text-paragraph-2-font-size'],
        marginLeft: 14,
    }
});
