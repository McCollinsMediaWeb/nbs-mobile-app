import { normalizeFont } from '@/utils/normalizeFont';
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { COLORS, SIZES } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

interface ButtonFilledProps {
    onPress: () => void;
    title: string;
    style?: ViewStyle;
    isLoading?: boolean;
}

const ButtonFilled: React.FC<ButtonFilledProps> = ({ onPress, title, style, isLoading = false }) => {
    const { dark } = useTheme();
    return (
        <TouchableOpacity
            style={[
                styles.filledButton,
                style,
                // { backgroundColor: dark ? COLORS.white : COLORS.primary },
                { backgroundColor: COLORS.primaryRed },
            ]}
            onPress={onPress}
        >
            {isLoading ? (
                <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
                <Text style={[styles.buttonText, { color: dark ? COLORS.black : COLORS.white }]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    filledButton: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        // borderColor: COLORS.primary,
        borderColor: COLORS.primaryRed,
        borderWidth: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        // backgroundColor: COLORS.primary,
        backgroundColor: COLORS.primaryRed,
    } as ViewStyle,
    buttonText: {
        fontSize: normalizeFont(18),
        fontFamily: "semiBold",
    } as TextStyle,
});

export default ButtonFilled;
