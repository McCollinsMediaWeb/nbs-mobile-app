import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { changeAppLanguage } from '@/utils/actions/generalSettingsActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { I18nManager, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import RNRestart from 'react-native-restart';
import { icons } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

type Nav = {
    navigate: (value: string) => void
}

type LanguageModalProps = {
    languageModalVisible: boolean;
    setLanguageModalVisible: (visible: boolean) => void;
};

const LanguageModal = ({ languageModalVisible, setLanguageModalVisible }: LanguageModalProps) => {
    const dispatch = useAppDispatch();
    const appLanguage = useAppSelector(state => state.generalSettings.language);
    const { colors } = useTheme();

    const handleChangeLanguage = async (itemTitle: string) => {
        if (appLanguage !== itemTitle) {
            try {
                const isRTL = itemTitle === 'ar';
                if (I18nManager.isRTL !== isRTL) {
                    I18nManager.allowRTL(isRTL);
                    I18nManager.forceRTL(isRTL);
                }
                await AsyncStorage.setItem('language', itemTitle);
                dispatch(changeAppLanguage(itemTitle));
                setTimeout(() => {
                    RNRestart.restart();
                }, 300);
            } catch (error) {
                console.error("Failed to update language:", error);
            }
        }
    };


    return (
        <Modal
            transparent
            animationType="fade"
            visible={languageModalVisible}
            onRequestClose={() => setLanguageModalVisible(false)}
        >
            <TouchableOpacity
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                activeOpacity={1}
                onPressOut={() => setLanguageModalVisible(false)}
            >
                <View
                    style={{
                        width: 220,
                        backgroundColor: colors.background,
                        borderRadius: 10,
                        padding: 20,
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handleChangeLanguage('en')}
                        style={{
                            paddingVertical: 10,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: '100%'
                        }}
                    >
                        <Text style={{ color: colors.text, fontSize: 16 }}>English</Text>
                        {appLanguage === "en" && (
                            <Image
                                source={icons.done} // make sure you have a `language` icon in your `icons`
                                style={{ width: 20, height: 20, tintColor: "green" }}
                            />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleChangeLanguage('ar')}
                        style={{
                            paddingVertical: 10,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: '100%'
                        }}
                    >
                        <Text style={{ color: colors.text, fontSize: 16 }}>العربية</Text>
                        {appLanguage === "ar" && (
                            <Image
                                source={icons.done} // make sure you have a `language` icon in your `icons`
                                style={{ width: 20, height: 20, tintColor: "green" }}
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    )
};

export default LanguageModal