import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme } from "@ui-kitten/components";
import { MapPin } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { AppTheme } from "../theme/ThemeContext";

interface Props {
    onPress: () => void;
    style?: ViewStyle;
}

const EmptyLocation: React.FC<Props> = ({
    onPress,
    style
}) => {
    const theme = useTheme() as AppTheme;
    const styles = getStyles(theme);
    const { t } = useTranslation();

    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.iconContainer}>
                <MapPin size={40} color={theme["color-basic-600"]} strokeWidth={1.5} />
            </View>
            <Text style={styles.text}>{t("select_location")}</Text>
            <Text style={styles.subText}>{t("tap_to_select_location")}</Text>
        </TouchableOpacity>
    );
};

const getStyles = (theme: AppTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
            minHeight: 150,
            maxHeight: 200,
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
            borderWidth: 1,
            borderColor: theme["color-basic-400"],
            borderRadius: 10,
            borderStyle: "dashed",
            backgroundColor: theme["background-basic-color-2"],
            marginVertical: 12,
        },
        iconContainer: {
            marginBottom: 16,
            opacity: 0.8,
            backgroundColor: theme["color-basic-300"],
            padding: 16,
            borderRadius: 40,
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

export default EmptyLocation;
