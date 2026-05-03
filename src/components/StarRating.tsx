import React from "react";
import { StyleSheet, View, ViewStyle, TouchableOpacity } from "react-native";
import { Star, StarHalf } from "lucide-react-native";
import { useAppTheme } from "@/src/theme/ThemeContext";

interface StarRatingProps {
    rating: number;
    maxRating?: number;
    size?: number;
    activeColor?: string;
    inactiveColor?: string;
    inactiveFill?: string;
    containerStyle?: ViewStyle;
    starStyle?: ViewStyle;
    allowHalfStars?: boolean;
    onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
    rating,
    maxRating = 5,
    size = 14,
    activeColor,
    inactiveColor,
    inactiveFill,
    containerStyle,
    starStyle,
    allowHalfStars = true,
    onRatingChange,
}) => {
    const theme = useAppTheme();

    const finalActiveColor = activeColor || theme["color-warning-500"];
    const finalInactiveColor = inactiveColor || theme["color-basic-400"];
    const finalInactiveFill = inactiveFill || theme["background-basic-color-1"];

    return (
        <View style={[styles.container, containerStyle]}>
            {Array.from({ length: maxRating }).map((_, index) => {
                const starNumber = index + 1;
                
                const StarIcon = () => {
                    if (allowHalfStars && rating >= starNumber - 0.5 && rating < starNumber) {
                        return (
                            <StarHalf
                                size={size}
                                color={finalActiveColor}
                                fill={finalActiveColor}
                                style={[styles.star, starStyle]}
                            />
                        );
                    }

                    const isFilled = starNumber <= Math.floor(rating) || (starNumber <= Math.round(rating) && !allowHalfStars);

                    return (
                        <Star
                            size={size}
                            color={isFilled ? finalActiveColor : finalInactiveColor}
                            fill={isFilled ? finalActiveColor : finalInactiveFill}
                            style={[styles.star, starStyle]}
                        />
                    );
                };

                if (onRatingChange) {
                    return (
                        <TouchableOpacity key={index} onPress={() => onRatingChange(starNumber)}>
                            <StarIcon />
                        </TouchableOpacity>
                    );
                }

                return <StarIcon key={index} />;
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    star: {
        marginHorizontal: 1,
    },
});

export default StarRating;
