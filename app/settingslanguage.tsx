import LanguageItem from '@/components/LanguageItem';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { changeAppLanguage } from '@/utils/actions/generalSettingsActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import React from 'react';
import { I18nManager, StyleSheet, Text, View } from 'react-native';
import RNRestart from 'react-native-restart';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import Header from '../components/Header';
import { COLORS } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

// Select your prefered language
const SettingsLanguage = () => {
    const dispatch = useAppDispatch();
    const appLanguage = useAppSelector(state => state.generalSettings.language);
    const { colors, dark } = useTheme();
    // const { t } = useTranslation();
    const { t } = i18next;

    const handleCheckboxPress = async (itemTitle: string) => {
        if (appLanguage !== itemTitle) {
            try {

                const isRTL = itemTitle === 'ar';

                if (I18nManager.isRTL !== isRTL) {
                    I18nManager.allowRTL(isRTL);
                    I18nManager.forceRTL(isRTL);
                }

                await AsyncStorage.setItem('language', itemTitle);
                await i18next.changeLanguage(itemTitle);
                dispatch(changeAppLanguage(itemTitle));
                setTimeout(() => {
                    console.log("Restarting app to apply language change...");
                    RNRestart.restart();
                }, 500);

            } catch (error) {
                console.error("Failed to update language:", error);
            }
        }
    };

    // const handleCheckboxPress = async (itemTitle: string) => {
    //     if (appLanguage !== itemTitle) {
    //         try {
    //             const isRTL = itemTitle === 'ar';

    //             if (I18nManager.isRTL !== isRTL) {
    //                 I18nManager.allowRTL(isRTL);
    //                 I18nManager.forceRTL(isRTL);
    //             }

    //             await AsyncStorage.setItem('language', itemTitle);
    //             await i18next.changeLanguage(itemTitle);
    //             dispatch(changeAppLanguage(itemTitle));

    //             setTimeout(() => {
    //                 RNRestart.restart();
    //             }, 300);
    //         } catch (error) {
    //             console.error('Failed to update language:', error);
    //         }
    //     }
    // };


    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title={t('profile.setting4.title')} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={[styles.title, { color: dark ? COLORS.white : COLORS.black }]}>{t('profile.setting4.subTitle')}</Text>
                    <View style={{ marginTop: 12 }}>
                        <LanguageItem
                            checked={appLanguage === 'en'}
                            name="English (US)"
                            onPress={() => handleCheckboxPress('en')}
                        />
                        <LanguageItem
                            checked={appLanguage === 'ar'}
                            name="العربية"
                            onPress={() => handleCheckboxPress('ar')}
                        />
                        <LanguageItem
                            checked={appLanguage === 'fr'}
                            name="Français"
                            onPress={() => handleCheckboxPress('fr')}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16
    },
    title: {
        fontSize: 20,
        fontFamily: "bold",
        color: COLORS.black,
        marginVertical: 16
    }
})

export default SettingsLanguage