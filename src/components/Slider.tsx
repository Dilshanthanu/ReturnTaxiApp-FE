import React, { useState, useEffect } from 'react';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { Star } from 'lucide-react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { useAppTheme } from '../theme/ThemeContext';

interface SliderProps {
    rating?: number;
    onRatingChange?: (rating: number) => void;
    count?: number;
    size?: number;
}

const Slider: React.FC<SliderProps> = ({
    rating = 0,
    onRatingChange,
    count = 5,
    size = 32,
}) => {
    const theme = useAppTheme();
    const [currentRating, setCurrentRating] = useState(rating);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setCurrentRating(rating);
    }, [rating]);

    const handleLayout = (event: LayoutChangeEvent) => {
        setWidth(event.nativeEvent.layout.width);
    };

    const updateRating = (x: number) => {
        if (width === 0) return;

        const starWidth = width / count;
        let newRating = Math.ceil(x / starWidth);

        if (newRating < 0) newRating = 0;
        if (newRating > count) newRating = count;

        if (newRating !== currentRating) {
            setCurrentRating(newRating);
            if (onRatingChange) {
                onRatingChange(newRating);
            }
        }
    };

    const pan = Gesture.Pan()
        .onStart((e) => {
            runOnJS(updateRating)(e.x);
        })
        .onUpdate((e) => {
            runOnJS(updateRating)(e.x);
        })
        .runOnJS(true); // Ensure it runs on JS thread if avoiding runOnJS wrappers, but explicit wrappers are safer/clearer. 
    // actually .runOnJS(true) makes the whole handler run on JS.

    const tap = Gesture.Tap()
        .onEnd((e) => {
            runOnJS(updateRating)(e.x);
        })
        .runOnJS(true);

    const composed = Gesture.Simultaneous(pan, tap);

    return (
        <GestureDetector gesture={composed}>
            <View
                style={styles.container}
                onLayout={handleLayout}
            >
                {Array.from({ length: count }).map((_, index) => {
                    const isFilled = index < currentRating;
                    return (
                        <View key={index} style={styles.starContainer} pointerEvents="none">
                            <Star
                                size={size}
                                color={theme['color-warning-500']}
                                fill={isFilled ? theme['color-warning-500'] : 'transparent'}
                                strokeWidth={2}
                            />
                        </View>
                    );
                })}
            </View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'transparent',
    },
    starContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Slider;
