import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SIZES, COLORS, icons } from '../constants';
import { useTheme } from '../theme/ThemeProvider';
import { useNavigation } from 'expo-router';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const navigation = useNavigation();
    const { colors, dark } = useTheme();

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: dark ? COLORS.dark1 : COLORS.white },
            ]}
        >
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={[
                        styles.backIcon,
                        { tintColor: colors.text },
                    ]}
                />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.text }]}>
                {title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        width: SIZES.width - 32,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        width: 24,
        height: 24,
        marginRight: 16,
    },
    title: {
        fontSize: 22,
        fontFamily: 'bold',
        color: COLORS.black,
    },
});

export default Header;