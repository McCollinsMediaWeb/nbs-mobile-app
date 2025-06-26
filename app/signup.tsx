import Header from '@/components/Header';
import Input from '@/components/Input';
import OrSeparator from '@/components/OrSeparator';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import Checkbox from 'expo-checkbox';
import { useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonFilled from '../components/ButtonFilled';
import SocialButton from '../components/SocialButton';
import { COLORS, SIZES, icons } from '../constants';
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
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isChecked, setChecked] = useState(false);
    const { colors, dark } = useTheme();

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

    // Implementing google authentication
    const googleAuthHandler = () => {
        console.log("Google Authentication")
    };

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title="" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>Create your</Text>
                        <Text style={[styles.title, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>Account</Text>
                    </View>
                    <Input
                        id="firstName"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['firstName']}
                        placeholder="First Name"
                        placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                        icon={icons.user}
                        keyboardType="default"
                    />
                    <Input
                        id="lastName"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['lastName']}
                        placeholder="Last Name"
                        placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                        icon={icons.user}
                        keyboardType="default"
                    />
                    <Input
                        id="email"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['email']}
                        placeholder="Email"
                        placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                        icon={icons.email}
                        keyboardType="email-address"
                    />
                    <Input
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['password']}
                        autoCapitalize="none"
                        id="password"
                        placeholder="Password"
                        placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                        icon={icons.padlock}
                        secureTextEntry={true}
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
                                }]}>By continuing you accept our Privacy Policy</Text>
                            </View>
                        </View>
                    </View>
                    <ButtonFilled
                        title="Sign Up"
                        onPress={handleSignup}
                        style={styles.button}
                    />
                    <View>
                        <OrSeparator text="or continue with" />
                        <View style={styles.socialBtnContainer}>
                            <SocialButton
                                icon={icons.appleLogo}
                                onPress={appleAuthHandler}
                                tintColor={dark ? COLORS.white : COLORS.black}
                            />
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
                    }]}>Already have an account ?</Text>
                    <TouchableOpacity
                        onPress={() => navigate("login")}>
                        <Text style={[styles.bottomRight, {
                            color: dark ? COLORS.white : COLORS.primary
                        }]}>{" "}Sign In</Text>
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