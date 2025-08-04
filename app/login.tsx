import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { loginCustomer } from '@/utils/actions/userActions';
import {
    GoogleSignin,
    isErrorWithCode
} from '@react-native-google-signin/google-signin';
import Checkbox from 'expo-checkbox';
import { useNavigation } from 'expo-router';
import i18next from 'i18next';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonFilled from '../components/ButtonFilled';
import Header from '../components/Header';
import Input from '../components/Input';
import OrSeparator from '../components/OrSeparator';
import SocialButton from '../components/SocialButton';
import { COLORS, SIZES, icons } from '../constants';
import { useTheme } from '../theme/ThemeProvider';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducers';

// GoogleSignin.configure({
//     webClientId: "718209129465-7msnbbuimc59gsntph4o9drd9n7ikikm.apps.googleusercontent.com",
//     iosClientId: "718209129465-kl54tsra6p0glvmi6ofg3u6dq53ptpsg.apps.googleusercontent.com",
//     scopes: ["profile", "email"],
// });

const isTestMode = false;

const initialState = {
    inputValues: {
        email: isTestMode ? 'example@gmail.com' : '',
        password: isTestMode ? '**********' : '',
    },
    inputValidities: {
        email: false,
        password: false
    },
    formIsValid: false,
}

type Nav = {
    navigate: (value: string) => void
}

const Login = () => {
    const { navigate } = useNavigation<Nav>();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    const appLanguage = useAppSelector(state => state.generalSettings.language);
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const [error, setError] = useState(null);
    const [googleData, setGoogleData] = useState<any>(null);
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
        }, [dispatchFormState]);

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error]);

    useEffect(() => {
        if (user.accessToken) {
            navigate("(tabs)");
        }
    }, [user.accessToken]);

    const handleSignin = () => {
        const isFormValid = Object.values(formState.inputValidities).every(v => v === undefined);
        if (!isFormValid) {
            Alert.alert('Invalid Input', 'Please fill all fields correctly.');
            return;
        }

        const { email, password } = formState.inputValues;

        dispatch(loginCustomer(email, password));
    };

    // Implementing apple authentication
    const appleAuthHandler = () => {
        console.log("Apple Authentication")
    };

    // Implementing facebook authentication
    const facebookAuthHandler = () => {
        console.log("Facebook Authentication")
    };


    const googleAuthHandler = async () => {
        try {
            await GoogleSignin.hasPlayServices();

            await GoogleSignin.signOut();

            const userInfo = await GoogleSignin.signIn();

            const email = userInfo?.data?.user?.email ?? '';
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
                password
            };

            if (!email || !password) {
                return;
            }

            console.log("Customer Data for Shopify:", customerData);

            dispatch(loginCustomer(email, password));

        } catch (err) {
            if (isErrorWithCode(err)) {
                console.log("Google Sign-In error code:", err.code);
            } else {
                console.log("Non-Google sign-in error:", err);
            }
            return null;
        }
    };

    return (
        <SafeAreaView style={[styles.area, {
            backgroundColor: colors.background
        }]}>
            <View style={[styles.container, {
                backgroundColor: colors.background
            }]}>
                <Header title="" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>{t('login.title')}</Text>
                        <Text style={[styles.title, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>{t('login.title2')}</Text>
                    </View>
                    <Input
                        id="email"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['email']}
                        placeholder={t('login.email')}
                        placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                        icon={icons.email}
                        keyboardType="email-address"
                    />
                    <Input
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['password']}
                        autoCapitalize="none"
                        id="password"
                        placeholder={t('login.password')}
                        placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                        icon={icons.padlock}
                        secureTextEntry={true}
                        style={{
                            textAlign: appLanguage === 'ar' ? 'right' : 'left',
                            writingDirection: appLanguage === 'ar' ? 'rtl' : 'ltr'
                        }}
                    />
                    <View style={styles.checkBoxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            color={isChecked ? COLORS.primary : dark ? COLORS.white : "gray"}
                            onValueChange={setChecked}
                        />
                        <Text style={[styles.privacy, {
                            color: dark ? COLORS.white : COLORS.black
                        }]}>{t('login.checkbox')}</Text>
                    </View>
                    <ButtonFilled
                        title={t('login.submit')}
                        // onPress={() => navigate("(tabs)")}
                        onPress={handleSignin}
                        style={styles.button}
                        isLoading={user?.loading}
                    />
                    <TouchableOpacity
                        onPress={() => navigate("forgotpasswordemail")}>
                        <Text style={[styles.forgotPasswordBtnText, {
                            color: dark ? COLORS.white : COLORS.primary
                        }]}>{t('login.forgotpassword')}</Text>
                    </TouchableOpacity>
                    <View>
                        <OrSeparator text={t('login.continuewith')} />
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
                    }]}>{t('login.dontHaveAccount')}</Text>
                    <TouchableOpacity
                        onPress={() => navigate("signup")}>
                        <Text style={[styles.bottomRight, {
                            color: dark ? COLORS.white : COLORS.primary
                        }]}>{"  "}{t('login.signUp')}</Text>
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

export default Login