import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useAppTheme } from '@/src/theme/ThemeContext';
import { swipableCardStyles } from './styles/swipableCard.styles';

interface SwipeableCardProps {
    children: React.ReactNode;
    containerStyle?: ViewStyle | ViewStyle[];
    renderRightActions: () => ReactNode;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
    children,
    containerStyle,
    renderRightActions,
}) => {
    const theme = useAppTheme();
    const styles = swipableCardStyles(theme);

    return (
        <Swipeable
            renderRightActions={renderRightActions}
            friction={2}
            enableTrackpadTwoFingerGesture
            rightThreshold={40}
        >
            <View style={[styles.cardContainer, containerStyle]}>{children}</View>
        </Swipeable>
    );
};

export default SwipeableCard;
