import { useAppDispatch } from '@/hooks/useAppDispatch';
import { forgotPassword } from '@/utils/actions/userActions';
import { useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonFilled from '../components/ButtonFilled';
import Header from '../components/Header';
import Input from '../components/Input';
import { COLORS, SIZES, icons, images } from '../constants';
import { useTheme } from '../theme/ThemeProvider';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducers';

const isTestMode = false;

const initialState = {
    inputValues: {
        email: isTestMode ? 'example@gmail.com' : '',
    },
    inputValidities: {
        email: false
    },
    formIsValid: false,
}

type Nav = {
    navigate: (value: string) => void
}

const ForgotPasswordEmail = () => {
    const { navigate } = useNavigation<Nav>();
    const dispatch = useAppDispatch();
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isChecked, setChecked] = useState(false);
    const { colors, dark } = useTheme();
    const { t } = useTranslation();

    const inputChangedHandler = useCallback(
        (inputId: string, inputValue: string) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({
                inputId,
                validationResult: result,
                inputValue
            })
        }, [dispatchFormState])

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])

    const handleForgotPassword = async () => {
        const isFormValid = Object.values(formState.inputValidities).every(v => v === undefined);
        if (!isFormValid) {
            Alert.alert('Invalid Input', 'Please fill all fields correctly.');
            return;
        }

        const { email } = formState.inputValues;

        setLoading(true);
        await forgotPassword(email);
        setLoading(false);
        navigate("login")
    };

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title={t('forgotpassword.title')} />
                <ScrollView style={{ marginVertical: 54 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={images.nbsLogo}
                            resizeMode='contain'
                            style={[styles.logo, {
                                tintColor: dark ? COLORS.white : COLORS.black
                            }]}
                        />
                    </View>
                    <Text style={[styles.title, {
                        color: dark ? COLORS.white : COLORS.black
                    }]}>{t('forgotpassword.subTitle')}</Text>
                    <Input
                        id="email"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['email']}
                        placeholder={t('forgotpassword.email')}
                        placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                        icon={icons.email}
                        keyboardType="email-address"
                    />
                    {/* <View style={styles.checkBoxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            color={isChecked ? COLORS.primary : dark ? COLORS.white : "gray"}
                            onValueChange={setChecked}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.privacy, {
                                color: dark ? COLORS.white : COLORS.black
                            }]}>Remenber me</Text>
                        </View>
                    </View> */}
                    <ButtonFilled
                        title={t('forgotpassword.submit')}
                        // onPress={() => navigate("otpverification")}
                        onPress={handleForgotPassword}
                        style={styles.button}
                        isLoading={loading}
                    />
                    <TouchableOpacity
                        onPress={() => navigate("login")}>
                        <Text style={[styles.forgotPasswordBtnText, {
                            color: dark ? COLORS.white : COLORS.primary
                        }]}>{t('forgotpassword.rememberPassword')}</Text>
                    </TouchableOpacity>
                    <View>
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <Text style={[styles.bottomLeft, {
                        color: dark ? COLORS.white : COLORS.black
                    }]}>{t('forgotpassword.dontHaveAccount')}</Text>
                    <TouchableOpacity
                        onPress={() => navigate("signup")}>
                        <Text style={[styles.bottomRight, {
                            color: dark ? COLORS.white : COLORS.primary
                        }]}>{"  "}{t('forgotpassword.signUp')}</Text>
                    </TouchableOpacity>
                </View>
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
        padding: 16,
        backgroundColor: COLORS.white
    },
    logo: {
        width: 100,
        height: 100,
        tintColor: COLORS.primary
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 32
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 26,
        fontFamily: "semiBold",
        color: COLORS.black,
        textAlign: "center",
        marginBottom: 22
    },
    checkBoxContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center", // <--- Add this line
        marginVertical: 18,
        width: "100%",
    },
    checkbox: {
        marginRight: 8,
        height: 16,
        width: 16,
        borderRadius: 4,
        borderColor: COLORS.primary,
        borderWidth: 2,
    },
    privacy: {
        fontSize: 12,
        fontFamily: "regular",
        color: COLORS.black,
    },
    socialTitle: {
        fontSize: 19.25,
        fontFamily: "medium",
        color: COLORS.black,
        textAlign: "center",
        marginVertical: 26
    },
    socialBtnContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    bottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 18,
        position: "absolute",
        bottom: 12,
        right: 0,
        left: 0,
    },
    bottomLeft: {
        fontSize: 14,
        fontFamily: "regular",
        color: "black"
    },
    bottomRight: {
        fontSize: 16,
        fontFamily: "medium",
        color: COLORS.primary
    },
    button: {
        marginVertical: 6,
        width: SIZES.width - 32,
        borderRadius: 30
    },
    forgotPasswordBtnText: {
        fontSize: 16,
        fontFamily: "semiBold",
        color: COLORS.primary,
        textAlign: "center",
        marginTop: 12
    }
})

export default ForgotPasswordEmail