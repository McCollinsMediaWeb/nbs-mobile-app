import Header from '@/components/Header';
import Input from '@/components/Input';
import OrSeparator from '@/components/OrSeparator';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { GoogleSignin, isErrorWithCode } from '@react-native-google-signin/google-signin';
import Checkbox from 'expo-checkbox';
import { useNavigation } from 'expo-router';
import i18next from 'i18next';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonFilled from '../components/ButtonFilled';
import SocialButton from '../components/SocialButton';
import { COLORS, icons, SIZES } from '../constants';
import { useTheme } from '../theme/ThemeProvider';
import { validateInput } from '../utils/actions/formActions';
import { signupCustomer } from '../utils/actions/userActions';
import { reducer } from '../utils/reducers/formReducers';

const isTestMode = true;

const initialState = {
    inputValues: {
        firstName: isTestMode ? 'Muhammed' : '',
        lastName: isTestMode ? 'Sahad' : '',
        email: isTestMode ? 'example@gmail.com' : '',
        password: isTestMode ? '**********' : '',
    },
    inputValidities: {
        firstName: false,
        lastName: false,
        email: false,
        password: false
    },
    formIsValid: false,
}

type Nav = {
    navigate: (value: string) => void
}

const Signup = () => {
    const { navigate } = useNavigation<Nav>();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    const appLanguage = useAppSelector(state => state.generalSettings.language);
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isChecked, setChecked] = useState(false);
    const { colors, dark } = useTheme();
    // const { t } = useTranslation();
    const { t } = i18next;

    const inputChangedHandler = useCallback(
        (inputId: string, inputValue: string) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({
                inputId,
                validationResult: result,
                inputValue,
            })
        },
        [dispatchFormState]);

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])

    useEffect(() => {
        if (user.accessToken) {
            navigate("(tabs)");
        }
    }, [user.accessToken]);

    const handleSignup = () => {
        const isFormValid = Object.values(formState.inputValidities).every(v => v === undefined);
        if (!isFormValid) {
            Alert.alert('Invalid Input', 'Please fill all fields correctly.');
            return;
        }

        const { email, password, firstName, lastName } = formState.inputValues;

        dispatch(signupCustomer(email, password, firstName, lastName));
    };


    // implementing apple authentication
    const appleAuthHandler = () => {
        console.log("Apple Authentication")
    };

    // implementing facebook authentication
    const facebookAuthHandler = () => {
        console.log("Facebook Authentication")
    };

    const googleAuthHandler = async () => {
        try {
            await GoogleSignin.hasPlayServices();

            await GoogleSignin.signOut();

            const userInfo = await GoogleSignin.signIn();

            const email = userInfo?.data?.user?.email ?? '';
            const firstName = userInfo?.data?.user?.givenName ?? '';
            const lastName = userInfo?.data?.user?.familyName ?? '';
            const googleId = userInfo?.data?.user?.id ?? '';

            // Generate deterministic password
            const generateFixedPassword = (id: string, email: string): string => {
                const idSuffix = id.slice(-5);
                const emailPrefix = email.split('@')[0].slice(0, 4);
                return `GGL-${emailPrefix}${idSuffix}@2024`;
            };

            const password = generateFixedPassword(googleId, email);

            const customerData = {
                email,
                firstName,
                lastName,
                password,
            };

            if (!email || !password) {
                return;
            }

            dispatch(signupCustomer(email, password, firstName, lastName));

        } catch (err) {
            if (isErrorWithCode(err)) {
                console.log("Google Sign-up error code:", err.code);
            } else {
                console.log("Non-Google sign-up error:", err);
            }
            return null;
        }
    };


    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title="" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>{t('signup.title')}</Text>
                        <Text style={[styles.title, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>{t('signup.title2')}</Text>
                    </View>
                    <Input
                        id="firstName"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['firstName']}
                        placeholder={t('signup.firstName')}
                        placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                        icon={icons.user}
                        keyboardType="default"
                    />
                    <Input
                        id="lastName"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['lastName']}
                        placeholder={t('signup.lastName')}
                        placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                        icon={icons.user}
                        keyboardType="default"
                    />
                    <Input
                        id="email"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['email']}
                        placeholder={t('signup.email')}
                        placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                        icon={icons.email}
                        keyboardType="email-address"
                    />
                    <Input
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['password']}
                        autoCapitalize="none"
                        id="password"
                        placeholder={t('signup.password')}
                        placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                        icon={icons.padlock}
                        secureTextEntry={true}
                        style={{
                            textAlign: appLanguage === 'ar' ? 'right' : 'left',
                            writingDirection: appLanguage === 'ar' ? 'rtl' : 'ltr'
                        }}
                    />
                    <View style={styles.checkBoxContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Checkbox
                                style={styles.checkbox}
                                value={isChecked}
                                color={isChecked ? COLORS.primary : dark ? COLORS.white : "gray"}
                                onValueChange={setChecked}
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.privacy, {
                                    color: dark ? COLORS.white : COLORS.black
                                }]}>{t('signup.checkbox')}</Text>
                            </View>
                        </View>
                    </View>
                    <ButtonFilled
                        title={t('signup.submit')}
                        onPress={handleSignup}
                        style={styles.button}
                        isLoading={user.loading}
                    />
                    <View>
                        <OrSeparator text={t('signup.continuewith')} />
                        <View style={styles.socialBtnContainer}>
                            {/* <SocialButton
                                icon={icons.appleLogo}
                                onPress={appleAuthHandler}
                                tintColor={dark ? COLORS.white : COLORS.black}
                            /> */}
                            {/* <SocialButton
                                icon={icons.facebook}
                                onPress={facebookAuthHandler}
                            /> */}
                            <SocialButton
                                icon={icons.google}
                                onPress={googleAuthHandler}
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <Text style={[styles.bottomLeft, {
                        color: dark ? COLORS.white : COLORS.black
                    }]}>{t('signup.alreadyHaveAccount')}</Text>
                    <TouchableOpacity
                        onPress={() => navigate("login")}>
                        <Text style={[styles.bottomRight, {
                            color: dark ? COLORS.white : COLORS.primary
                        }]}>{" "}{t('signup.signIn')}</Text>
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
    titleContainer: {
        marginVertical: 32
    },
    title: {
        fontSize: 48,
        fontFamily: "bold",
        color: "#212121",
    },
    checkBoxContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 18,
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
    }
})

export default Signup