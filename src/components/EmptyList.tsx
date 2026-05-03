import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { useTheme } from "@ui-kitten/components";
import { Inbox } from "lucide-react-native";
import { AppTheme } from "../theme/ThemeContext";

interface Props {
    text?: string;
    subText?: string;
    icon?: React.ReactNode;
    style?: ViewStyle;
}

const EmptyList: React.FC<Props> = ({
    text = "No items found",
    subText,
    icon,
    style
}) => {
    const theme = useTheme() as AppTheme;
    const styles = getStyles(theme);

    return (
        <View style={[styles.container, style]}>
            <View style={styles.iconContainer}>
                {icon || <Inbox size={40} color={theme["color-basic-600"]} strokeWidth={1.5} />}
            </View>
            <Text style={styles.text}>{text}</Text>
            {subText && <Text style={styles.subText}>{subText}</Text>}
        </View>
    );
};

const getStyles = (theme: AppTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
            minHeight: 150,
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
        },
        iconContainer: {
            marginBottom: 16,
            opacity: 0.8,
            backgroundColor: theme["color-basic-200"],
            padding: 16,
            borderRadius: 40,
            borderWidth: 1,
            borderColor: theme["color-basic-300"],
        },
        text: {
            color: theme["text-basic-color"],
            fontSize: theme["text-paragraph-1-font-size"],
            fontFamily: theme["font-poppins-semibold"],
            textAlign: "center",
            marginBottom: 8,
        },
        subText: {
            color: theme["text-hint-color"],
            fontSize: theme["text-paragraph-2-font-size"],
            fontFamily: theme["font-poppins-regular"],
            textAlign: "center",
            marginTop: 4,
        },
    });

export default EmptyList;
