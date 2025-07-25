import { useAppSelector } from '@/hooks/useAppSelector';
import { normalizeFont } from '@/utils/normalizeFont';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, icons, SIZES } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

type SettingsItemProps = {
    icon: ImageSourcePropType;
    name: string;
    onPress: () => void;
    hasArrowRight?: boolean;
};

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, name, onPress, hasArrowRight = true }) => {
    const { dark } = useTheme();
    const appLanguage = useAppSelector(state => state.generalSettings.language);

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.leftContainer}>
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={[
                        styles.icon,
                        { tintColor: dark ? COLORS.white : COLORS.greyscale900 },
                    ]}
                />
                <Text
                    style={[
                        styles.name,
                        { color: dark ? COLORS.white : COLORS.greyscale900 },
                    ]}
                >
                    {name}
                </Text>
            </View>
            {hasArrowRight && (
                <Image
                    // source={icons.arrowRight}
                    source={appLanguage === "ar" ? icons.arrowLeft2 : icons.arrowRight}
                    resizeMode="contain"
                    style={[
                        styles.arrowRight,
                        { tintColor: dark ? COLORS.white : COLORS.greyscale900 },
                    ]}
                />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: SIZES.width - 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 17,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        height: 24,
        width: 24,
        tintColor: COLORS.greyscale900,
    },
    name: {
        fontSize: normalizeFont(18),
        fontFamily: 'semiBold',
        color: COLORS.greyscale900,
        marginLeft: 12,
    },
    arrowRight: {
        width: 24,
        height: 24,
        tintColor: COLORS.greyscale900,
    },
});

export default SettingsItem;