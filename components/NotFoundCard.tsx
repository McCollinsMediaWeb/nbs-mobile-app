import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS, illustrations } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

interface NotFoundCardProps {
    title?: string;
    subtitle?: string;
}

const NotFoundCard: React.FC<NotFoundCardProps> = ({
    title = 'Not Found',
    subtitle = 'Sorry, the keyword you entered cannot be found, please check again or search with another keyword.',
}) => {
    const { dark } = useTheme();

    return (
        <View style={styles.container}>
            <Image
                source={dark ? illustrations.notFoundDark : illustrations.notFound}
                resizeMode='contain'
                style={styles.illustration}
            />
            <Text
                style={[
                    styles.title,
                    { color: dark ? COLORS.white : COLORS.black },
                ]}
            >
                {title}
            </Text>
            <Text
                style={[
                    styles.subtitle,
                    { color: dark ? COLORS.white : COLORS.black },
                ]}
            >
                {subtitle}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    illustration: {
        width: 340,
        height: 250,
        marginVertical: 32,
    },
    title: {
        fontSize: 24,
        fontFamily: 'bold',
        color: COLORS.black,
        marginVertical: 16,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'regular',
        color: COLORS.grayscale700,
        textAlign: 'center',
    },
});

export default NotFoundCard;
