import LanguageItem from '@/components/LanguageItem';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { fetchCollections } from '@/utils/actions/collectionActions';
import { changeAppLanguage } from '@/utils/actions/generalSettingsActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

    const handleCheckboxPress = async (itemTitle: string) => {
        if (appLanguage !== itemTitle) {
            try {
                await AsyncStorage.setItem('language', itemTitle);
                dispatch(changeAppLanguage(itemTitle));

                const collectionIds = [
                    'gid://shopify/Collection/439108698324',
                    'gid://shopify/Collection/439109091540',
                    'gid://shopify/Collection/439668539604',
                ];
                dispatch(fetchCollections(collectionIds));

            } catch (error) {
                console.error("Failed to update language:", error);
            }
        }
    };

    // const handleCheckboxPress = async (langCode: string) => {
    //     if (langCode !== selectedLanguage) {
    //         await AsyncStorage.setItem('language', langCode);
    //         setSelectedLanguage(langCode);
    //     }
    // };

    // Load language from AsyncStorage on mount
    // useEffect(() => {
    //     const loadLanguage = async () => {
    //         const lang = await AsyncStorage.getItem('language');
    //         if (lang) setSelectedLanguage(lang);
    //     };
    //     loadLanguage();
    // }, [handleCheckboxPress]);

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title="Language & Region" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={[styles.title, { color: dark ? COLORS.white : COLORS.black }]}>Suggested</Text>
                    <View style={{ marginTop: 12 }}>
                        <LanguageItem
                            checked={appLanguage === 'en'}
                            name="English (US)"
                            onPress={() => handleCheckboxPress('en')}
                        />
                        <LanguageItem
                            checked={appLanguage === 'ar'}
                            name="Arabic"
                            onPress={() => handleCheckboxPress('ar')}
                        />
                    </View>
                    {/* <Text style={[styles.title, { color: dark ? COLORS.white : COLORS.black }]}>Others</Text>
                    <LanguageItem
                        checked={selectedItem === 'Mandarin'}
                        name="Mandarin"
                        onPress={() => handleCheckboxPress('Mandarin')}
                    />
                    <LanguageItem
                        checked={selectedItem === 'Hindi'}
                        name="Hindi"
                        onPress={() => handleCheckboxPress('Hindi')}
                    />
                    <LanguageItem
                        checked={selectedItem === 'Spanish'}
                        name="Spanish"
                        onPress={() => handleCheckboxPress('Spanish')}
                    />
                    <LanguageItem
                        checked={selectedItem === 'French'}
                        name="French"
                        onPress={() => handleCheckboxPress('French')}
                    />
                    <LanguageItem
                        checked={selectedItem === 'Arabic'}
                        name="Arabic"
                        onPress={() => handleCheckboxPress('Arabic')}
                    />
                    <LanguageItem
                        checked={selectedItem === 'Bengali'}
                        name="Bengali"
                        onPress={() => handleCheckboxPress('Bengali')}
                    />
                    <LanguageItem
                        checked={selectedItem === 'Russian'}
                        name="Russian"
                        onPress={() => handleCheckboxPress('Russian')}
                    />
                    <LanguageItem
                        checked={selectedItem === 'Indonesia'}
                        name="Indonesia"
                        onPress={() => handleCheckboxPress('Indonesia')}
                    />
                    <LanguageItem
                        checked={selectedItem === 'Chinese'}
                        name="Chinese"
                        onPress={() => handleCheckboxPress('Chinese')}
                    />
                    <LanguageItem
                        checked={selectedItem === 'Vietnamese'}
                        name="Vietnamese"
                        onPress={() => handleCheckboxPress('Vietnamese')}
                    />
                    <LanguageItem
                        checked={selectedItem === 'Marathi'}
                        name="Marathi"
                        onPress={() => handleCheckboxPress('Marathi')}
                    />
                    <LanguageItem
                        checked={selectedItem === 'Yue Chinese (Cantonese)'}
                        name="Yue Chinese (Cantonese)"
                        onPress={() => handleCheckboxPress('Yue Chinese (Cantonese)')}
                    />
                    <LanguageItem
                        checked={selectedItem === 'Southern Min (Hokkien)'}
                        name="Southern Min (Hokkien)"
                        onPress={() => handleCheckboxPress('Southern Min (Hokkien)')}
                    />
                    <LanguageItem
                        checked={selectedItem === 'Persian (Farsi)'}
                        name="Persian (Farsi)"
                        onPress={() => handleCheckboxPress('Persian (Farsi)')}
                    />
                    <LanguageItem
                        checked={selectedItem === 'Polish'}
                        name="Polish"
                        onPress={() => handleCheckboxPress('Polish')}
                    />
                    <LanguageItem
                        checked={selectedItem === 'Kannada'}
                        name="Kannada"
                        onPress={() => handleCheckboxPress('Kannada')}
                    /> */}
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