import React, { memo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "@ui-kitten/components";
import { LucideIcon } from "lucide-react-native";
import { AppTheme } from "@/src/theme/ThemeContext";

interface CardHeaderProps {
    title: string;
    subTitle?: string;
    icon: LucideIcon;
    color: string;
    iconSize?: number;
}

const CardHeader: React.FC<CardHeaderProps> = ({
    title,
    subTitle,
    icon: Icon,
    color,
    iconSize = 18,
}) => {
    const theme = useTheme() as AppTheme;
    const styles = getStyles(theme);

    return (
        <View style={styles.cardHeader}>
            <Icon size={iconSize} color={color} />
            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{title}</Text>
                {subTitle && <Text style={styles.cardSubTitle}>{subTitle}</Text>}
            </View>
        </View>
    );
};

export default memo(CardHeader);

const getStyles = (theme: AppTheme) =>
    StyleSheet.create({
        cardHeader: {
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 10,
        },
        textContainer: {
            flexDirection: "column",
            alignItems: "flex-start",
        },
        cardTitle: {
            fontSize: theme["text-paragraph-2-font-size"],
            fontFamily: theme["font-poppins-medium"],
            color: theme["color-basic-600"],
            marginLeft: 8,
        },
        cardSubTitle: {
            fontSize: theme["text-caption-2-font-size"],
            fontFamily: theme["font-poppins-regular"],
            color: theme["color-basic-400"],
            marginLeft: 8,
        },
    });
