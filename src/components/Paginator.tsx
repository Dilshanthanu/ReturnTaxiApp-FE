import React, { useEffect, useRef } from 'react';
import {
    View,
    Animated,
    StyleProp,
    ViewStyle,
    StyleSheet,
} from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { SlidesInterface } from '@app-types/public/Welcome';
import { AppTheme } from '../theme/ThemeContext';

interface PaginatorProps {
    slides: SlidesInterface[];
    currentSlide: number;
    customStyles?: StyleProp<ViewStyle>;
}

const Paginator: React.FC<PaginatorProps> = ({
    slides,
    currentSlide,
    customStyles,
}) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const theme = useTheme() as AppTheme;
    const styles = paginatorStyles(theme);

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: currentSlide,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [currentSlide, animatedValue]);

    return (
        <View
            style={[styles.container, customStyles]}
        >
            <View style={styles.dotsContainer}>
                {slides.map((_, i: number) => {
                    const width = animatedValue.interpolate({
                        inputRange: [i - 1, i, i + 1],
                        outputRange: [8, 30, 8],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            testID="paginator-dot"
                            style={[
                                styles.dot,
                                { width },
                                currentSlide === i && styles.activeDot
                            ]}
                            key={i.toString()}
                        />
                    );
                })}
            </View>
        </View>
    );
};

export default Paginator;

const paginatorStyles = (theme: AppTheme) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
        },
        flexOne: { flex: 1 },
        fullContainer: {
            justifyContent: 'space-between',
            width: '90%',
            margin: 10,
        },
        dotsContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 2,
        },
        dot: {
            height: 8,
            borderRadius: 5,
            backgroundColor: theme['color-basic-400'],
            marginHorizontal: 6,
        },
        activeDot: {
            backgroundColor: theme['color-primary-500'],
        },
    });
