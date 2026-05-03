import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@ui-kitten/components";
import { AppTheme } from "@/src/theme/ThemeContext";

interface TabSelectorProps {
    tabs: string[];
    activeTab: number;
    onTabChange: (index: number) => void;
    fullWidth?: boolean;
}

const TabSelector = ({ tabs, activeTab, onTabChange, fullWidth = false }: TabSelectorProps) => {
    const theme = useTheme() as AppTheme;
    const styles = getStyles(theme, fullWidth);
    const scrollRef = React.useRef<ScrollView>(null);
    const tabOffsets = React.useRef<Record<number, number>>({});

    React.useEffect(() => {
        if (!fullWidth) {
            const offset = tabOffsets.current[activeTab];
            if (offset !== undefined && scrollRef.current) {
                scrollRef.current.scrollTo({ x: offset - 20, animated: true });
            }
        }
    }, [activeTab, fullWidth]);

    const renderTab = (tab: string, index: number) => {
        const isActive = index === activeTab;
        return (
            <TouchableOpacity
                key={index}
                style={[styles.tab, isActive && styles.activeTab]}
                onPress={() => onTabChange(index)}
                onLayout={(event) => {
                    tabOffsets.current[index] = event.nativeEvent.layout.x;
                }}
            >
                <Text
                    style={[styles.tabText, isActive && styles.activeTabText]}
                    numberOfLines={1}
                >
                    {tab}
                </Text>
            </TouchableOpacity>
        );
    };

    if (fullWidth) {
        return (
            <View style={styles.container}>
                <View style={styles.fullWidthContainer}>
                    {tabs.map((tab, index) => renderTab(tab, index))}
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {tabs.map((tab, index) => renderTab(tab, index))}
            </ScrollView>
        </View>
    );
};

export default TabSelector;

const getStyles = (theme: AppTheme, fullWidth: boolean) =>
    StyleSheet.create({
        container: {
            borderBottomWidth: 1,
            borderBottomColor: theme["color-basic-200"],
            backgroundColor: theme["background-basic-color-1"],
            width: '100%'
        },
        scrollContent: {
            flexDirection: "row",
        },
        fullWidthContainer: {
            flexDirection: 'row',
            width: '100%',
        },
        tab: {
            paddingVertical: 14,
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "center",
            flex: fullWidth ? 1 : undefined,
            borderBottomWidth: 3,
            borderBottomColor: "transparent"
        },
        activeTab: {
            borderBottomColor: theme["color-primary-500"],
        },
        tabText: {
            fontFamily: theme["font-poppins-medium"],
            fontSize: theme["text-paragraph-2-font-size"],
            color: theme["text-hint-color"],
        },
        activeTabText: {
            color: theme["color-primary-500"],
        },
    });

